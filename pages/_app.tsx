import "../styles/globals.css"
import 'react-toastify/dist/ReactToastify.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from 'contexts/AuthContext'
import { ProjetoProvider } from "contexts/ProjetoContext"
import { ModalProvider } from "contexts/ModalContext"
import { LoadingProvider } from "contexts/LoadingContext"
import { StepProvider } from "contexts/StepContext"
import { Provider } from 'react-redux'
import { store } from 'store'
import { saveState } from 'store/browser-storage'
import Layout from 'components/Layout'
import { SessionProvider } from 'next-auth/react'
import Modal from "@/components/Modal"
import NextNProgress from 'nextjs-progressbar'

const { ToastContainer } = require('react-toastify')
const { debounce } = require("debounce")

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  
  store.subscribe(
    // we use debounce to save the state once each 800ms
    // for better performances in case multiple changes occur in a short time
    debounce(() => {
      saveState(store.getState());
    }, 800)
  );
  
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
      <LoadingProvider>
          <ModalProvider>
            <ProjetoProvider>
              <AuthProvider>
                
                  <StepProvider>
                    <Layout>
                    <ToastContainer />
                    <NextNProgress />
                      <Component {...pageProps} />  
                      <Modal />
                    </Layout>
                  </StepProvider>
                
              </AuthProvider>
            </ProjetoProvider>
          </ModalProvider>
          </LoadingProvider>
      </Provider>
    </SessionProvider>
  )
}

export default MyApp
