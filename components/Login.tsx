import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { LockClosedIcon } from '@heroicons/react/solid'
import alertService from '../services/alert';
import { signIn, useSession } from 'next-auth/react'
import { FaFacebookF, FaGithub, FaGoogle } from 'react-icons/fa';
import { useModalContext } from 'contexts/ModalContext';
import { useEffect, useRef } from 'react';

// import { userService } from 'services';

export default Login;

function Login({ csrfToken }: any) {
  const { hideModal } = useModalContext()
    const router = useRouter();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, setError, formState, setFocus } = useForm(formOptions);
    

    function signInProvider(provider: string) {
      // event?.preventDefault()
      return signIn(provider, {
          redirect: false,
          callbackUrl: `${window.location.origin}`
        })
      
    }

    useEffect(() => {
      setFocus('email')
    }, [setFocus])

    async function onSubmit({ email, password, csrfToken }: any) {
      try {

          const res = await signIn('credentials', {
            redirect: false,
            email,
            password,
            // callbackUrl: `${window.location.origin}`,
          }).then((response: any) => {
            if (response.ok) {
              alertService.success('Login realizado com sucesso')
              hideModal()
              router.push('/')
            } else {
              alertService.warn('Email ou senha inválidos, verifique os dados e tente novamente!')
            }
          }).catch ((e) => {
            console.log(e)
          })
        
        
      } catch (error: any) {
        console.log(error)
        alertService.error(error)
      }
      
    }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-6" method='POST'>
          <input type="hidden" name="csrfToken" value={csrfToken} />
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md flex flex-col items-center">
                <div className="relative w-full">
                    <input
                      autoFocus
                      {...register('email')}
                      id="emailLogin" 
                      name="email" 
                      type="email" 
                      className="peer h-10 w-full border-b border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-green-600" 
                      placeholder="user@email.com" />
                      <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email</label>
                </div>
              
                <div className="mt-10 relative w-full">
                    <input
                      {...register('password')}
                      id="passwordLogin" 
                      name="password" 
                      type="password" 
                      className="peer h-10 w-full border-b border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-green-600" placeholder="michaelsoliveira@gmail.com" />
                      <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Senha</label>
                </div>
              
            </div>

            <div className="flex items-center justify-between w-full lg:px-8">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-green-600 hover:text-green-500">
                  Esqueceu sua senha?
                </a>
              </div>
            </div>

            <div className='mx-auto flex flex-row items-center justify-center py-2'>
            <button
                disabled={formState.isSubmitting}
                type="submit"
                className="group relative w-3/4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-green-500 group-hover:text-green-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
      </form>
      <div className="flex flex-col justify-between items-center w-full">
        <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 lg:w-4/6"></span>
            <a href="#" className="text-xs text-center text-gray-500 uppercase w-96">or login with social</a>
            <span className="border-b w-1/5 lg:w-4/6"></span>
        </div>
        <div className='flex flex-col justify-center items-center max-w-full w-full'>
          <a href="#"
                onClick={() => signInProvider('google')}
              className="flex items-center justify-center mt-3 mb-2 text-white rounded-lg shadow-md hover:bg-gray-100 w-5/6">
                <div className="px-2 py-3">
                    <svg className="h-6 w-6" viewBox="0 0 40 40">
                        <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107"/>
                        <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00"/>
                        <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50"/>
                        <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2"/>
                    </svg>
                </div>
                <h1 className="px-4 py-2 w-5/6 text-center text-gray-600 font-medium">Sign in with Google</h1>
            </a>
        </div>
        <button
          onClick={() => signInProvider('facebook')}
          className="flex items-center justify-center mb-2 text-indigo-700 hover:text-indigo-600 rounded-lg shadow-md hover:bg-gray-100 w-5/6">
          <FaFacebookF className="fa fa-facebook mr-2" />
          <h1 className="px-4 py-2 w-5/6 text-center text-gray-600 font-medium">Sign in with Facebook</h1>
        </button>
        <button
          onClick={() => signInProvider('github')}
          className="flex items-center justify-center mb-2 text-gray-700 hover:text-gray-800 rounded-lg shadow-md hover:bg-gray-100 w-5/6">
          <FaGithub className="fa fa-facebook mr-2" />
          <h1 className="px-4 py-2 w-5/6 text-center text-gray-600 font-medium">Sign in with Github</h1>
        </button>
      </div> 
    </div>
  )
}