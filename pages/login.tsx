import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Login from 'components/Login'
import Logo from 'components/Logo'
import { getCsrfToken, getSession } from 'next-auth/react'
import Link from 'next/link';

const Pagelogin = ({ csrfToken }: any) => {

  const router = useRouter()
  
  return (
    <div className="min-h-full flex items-center justify-center mt-28 mb-16 px-4">
      <div className="max-w-md flex flex-col justify-center items-center w-full space-y-4 py-4 border rounded-md shadow-2xl">
        <div className='absolute top-10'>
        <div className='bg-gray-50 border border-green-700 rounded-full shadow-lg w-36 h-36'>
        <div className='relative h-full flex flex-col items-center justify-center'>
          <Logo width='w-16' height='h-16' />
          <h1 className='font-roboto text-md font-semibold text-green-700'>BOManejoWeb</h1>
          </div>
        </div>
        </div>
        <div className="w-5/6 pt-10">
          <Login csrfToken={csrfToken} />
        </div>
        
        <p className='flex items-center py-4 text-center text-sm'>Não tem conta?&nbsp;
          <span className='underline font-bold text-green-700'> <Link href='/signup'>Cadastre-se</Link></span>
        </p>
        </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
  const session = await getSession(ctx)

  if (session) {
      return {
          redirect: {
              destination: '/',
              permanent: false
          }
      }
  }  

  return {
    props: {
      csrfToken: await getCsrfToken(ctx)
    },
  }
}

export default Pagelogin