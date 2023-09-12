import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import FacebookProvider from 'next-auth/providers/facebook'
import userService from 'services/user'
import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"

const GOOGLE_AUTHORIZATION_URL =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    prompt: "consent",
    access_type: "offline",
    response_type: "code",
  })

async function findProvider(token: any) {
  
  const { name , email, provider, access_token } = token

  try {
      const dataProvider = {
        username: name,
        email,
        password: Math.random().toString(36).slice(-8),
        image: token?.picture,
        provider,
        id_provider: token?.sub,
        by_provider: true
      }
      
      const userExists = await userService.findProvider(token)

      if (userExists) {
        if (!userExists.provider || !userExists.id_provider)
          await userService.update(userExists?.id, dataProvider, access_token)
      } else {
        await userService.create(dataProvider)
          .then( () => {
              userService.sendEmail(dataProvider)
          }).catch((err: any) => {
            console.log(err)
          })
      }
    } catch (error: any) {
        console.log(error.message)
    }
}

async function refreshAccessToken(token: any) {
  
  const provider = token.provider ? token.provider : 'local'

  switch (provider) {
    case 'local': {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token: token.newRefreshToken !== token.refreshToken ? token.refreshToken : token.newRefreshToken })
          
        })
        
        const refreshToken = await response.json()

        if (refreshToken?.refresh_token) {
          return {
            ...token,
            accessToken: refreshToken?.access_token,
            accessTokenExpires: Date.now() + refreshToken?.expires_in * 1000,
            refreshToken: refreshToken?.refresh_token ?? token?.refreshToken, // Fall back to old refresh token
            newRefreshToken: refreshToken?.refresh_token ?? refreshToken?.refresh_token
          }
        } else {
          return {
            ...token,
            accessToken: refreshToken?.access_token,
            accessTokenExpires: refreshToken?.expires_in,
            refreshToken: token.refreshToken, // Fall back to old refresh token
          }
        }
        
      } catch (error) {
        console.log(error)

        return {
          ...token,
          error: "RefreshAccessTokenError",
        }
      }   
    }
    
    case 'google': {
      try {
        const url =
          "https://oauth2.googleapis.com/token?" +
          new URLSearchParams({
            client_id: '80208103401-2is5sf9cdimhq4ghphnn75aa4p1b4p20.apps.googleusercontent.com',
            client_secret: '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',
            grant_type: "refresh_token",
            refresh_token: token.refreshToken,
          })

        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          method: "POST",
        })

        const refreshedTokens = await response.json()

        if (!response.ok) {
          throw refreshedTokens
        }

        return {
          ...token,
          accessToken: refreshedTokens.access_token,
          accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
          refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
        }
      } catch (error) {
        console.log(error)

        return {
          ...token,
          error: "RefreshAccessTokenError",
        }
      }
    }
    
    default: {
      return token;
    }
    
  }
}

export const authOptions: NextAuthOptions = {
    // https://next-auth.js.org/configuration/providers
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || 'undefined',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'undefined',
        authorization: GOOGLE_AUTHORIZATION_URL
      }),
      FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID || 'undefined',
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET || 'undefined'
      }),
      GithubProvider({
        clientId: process.env.GITHUB_CLIENT_ID || 'undefined',
        clientSecret: process.env.GITHUB_CLIENT_SECRET || 'undefined'
      }),
        CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email: { label: "Email", type: "text", placeholder: "email@bomanejo.online" },
            password: {  label: "Password", type: "password" }
          },
            async authorize(credentials, req) {
            try {
              const res: any = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                  method: 'POST',
                  body: JSON.stringify(credentials),
                  headers: { "Content-Type": "application/json" }
              })
              
              const user = res.json().then((data: any) => {
                const response = {
                  local: true,
                  ...data.user
                }
                return response
              
                
              })
              // If no error and we have user data, return it
              if (res.ok && user) {
                return user
              } 
                  
              return null
            } catch (error: any) {
              const errorMessage = error.response.data.message
              throw new Error(`${errorMessage} &email=${credentials?.email}`)
            }
          
          }
      })
    ],
    // The secret should be set to a reasonably long random string.
    // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
    // a separate secret is defined explicitly for encrypting the JWT.
    secret: process.env.NEXTAUTH_SECRET,

    session: {
      // Use JSON Web Tokens for session instead of database sessions.
      // This option can be used with or without a database for users/accounts.
      // Note: `strategy` should be set to 'jwt' if no database is used.
      strategy: "jwt",

      // Seconds - How long until an idle session expires and is no longer valid.
      maxAge: 24 * 60 * 60, // 30 * 24 * 60 * 60, // 30 days

      // Seconds - Throttle how frequently to write to database to extend a session.
      // Use it to limit write operations. Set to 0 to always update the database.
      // Note: This option is ignored if using JSON Web Tokens
      // updateAge: 24 * 60 * 60, // 24 hours
    },

    // JSON Web tokens are only used for sessions if the `jwt: true` session
    // option is set - or by default if no database is specified.
    // https://next-auth.js.org/configuration/options#jwt
    jwt: {
      // You can define your own encode/decode functions for signing and encryption
      // if you want to override the default behaviour.
      // encode: async ({ secret, token, maxAge }) => {},
      // decode: async ({ secret, token, maxAge }) => {},
    },

    // You can define custom pages to override the built-in ones. These will be regular Next.js pages
    // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
    // The routes shown here are the default URLs that will be used when a custom
    // pages is not specified for that route.
    // https://next-auth.js.org/configuration/pages
    pages: {
      // signIn: '/login',  // Displays signin buttons
      // signOut: '/auth/signout', // Displays form with sign out button
      // error: '/login', // Error code passed in query string as ?error=
      // verifyRequest: '/auth/verify-request', // Used for check email page
      newUser: '/user/change-password' // If set, new users will be directed here on first sign in
    },

    // Callbacks are asynchronous functions you can use to control what happens
    // when an action is performed.
    // https://next-auth.js.org/configuration/callbacks
    callbacks: {
      // async signIn({ user, account, profile, email, credentials }) {
      //   return true
      // },
      // async redirect({ url, baseUrl }) { return baseUrl },
      async jwt({ token, account, user }: any) {    
        
        if (user?.local) {
          return {
            user: {
              id: user.id,
              email: user.email,
              username: user.username,
              image: user.image,
              roles: user.roles
            },
            accessToken: user.access_token,
            accessTokenExpires: Date.now() + user.expires_in * 1000,
            refreshToken: user.refresh_token
          }
        }
        if (account) {
          await findProvider({ ...token, ...account})
          return {
            provider: account.provider,
            accessToken: account.access_token,
            accessTokenExpires: Date.now() + account.expires_in * 1000,
            refreshToken: account.refresh_token,
            user: {
              id: user?.id,
              email: user?.email,
              image: user?.image,
              username: user?.name
            }
          }
        } 
        
        // Return previous token if the access token has not expired yet
        if (Date.now() < token.accessTokenExpires) {
          return token
        }
        
        // Access token has expired, try to update it
        return refreshAccessToken(token)
      },
      async session({ session, token }: any) {
        // Send properties to the client, like an access_token from a provider.
        
        session.user = token.user
        session.user.roles = token.user?.roles
        session.provider = token.provider
        session.id = token.id
        session.accessToken = token.accessToken
        session.refreshToken = token.refreshToken

        return session
      }
    },

    // Events are useful for logging
    // https://next-auth.js.org/configuration/events
    events: {},

    // You can set the theme to 'light', 'dark' or use 'auto' to default to the
    // whatever prefers-color-scheme is set to in the browser. Default is 'auto'
    theme: {
      colorScheme: "light",
    },

    // Enable debug messages in the console if you are having problems
    debug: false,
  }


const Auth = async (req: NextApiRequest, res: NextApiResponse) => {  
  return NextAuth(req, res, authOptions)
}

export default Auth