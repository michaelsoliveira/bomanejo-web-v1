import { AddEdit } from '@/components/user/AddEdit'
import Logo from 'components/Logo'
import { UserAddIcon } from '@heroicons/react/solid'
import Link from 'next/link';
import React, { createRef } from 'react';

import { styles } from 'components/helpers/defaultStyles'
import { useModalContext } from 'contexts/ModalContext';
import { useSession } from 'next-auth/react';

const SigupPage = () => {
  const { hideModal } = useModalContext()
  const { data: session } = useSession()
  const formRef = createRef<any>()

  const submitForm = () => {
    if (formRef.current) {
      formRef.current.handleSubmit()
      hideModal()
    }
  }
  
  return (
    <>
      <div className="min-h-full flex items-center justify-center my-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md flex flex-col justify-center items-center w-full space-y-4 px-8 py-4 border rounded-md shadow-2xl">
          <div className='flex bg-gray-50 border absolute top-20 border-green-700 justify-center items-center rounded-full shadow-lg w-36 h-36'>
          <div className='relative flex flex-col items-center justify-center'>
            <Logo width='w-16' height='h-16' />
            <h1 className='font-roboto text-md font-semibold text-green-700'>BOManejoWeb</h1>
            </div>
          </div>
          <div className='w-full pt-20'>
            <AddEdit projetoId='' ref={formRef} styles={styles} redirect/>
              <div className='mx-auto flex flex-row items-center justify-center py-4'>
                <button
                    // disabled={formState.isSubmitting}
                    type="submit"
                    className="group relative w-3/4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    onClick={submitForm}
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <UserAddIcon className="h-5 w-5 text-green-500 group-hover:text-green-400" aria-hidden="true" />
                    </span>
                  Cadastrar
                </button>
              </div>
          </div>
          <div className='w-full border-b border-gray-200 flex items-center'>
            <p className='text-xs py-4 flex items-center text-center'>
              Ao se cadastrar, você concordar com nossos Termos de Uso e com a Política de Privacidade
            </p>
          </div>
          {!session && (
            <p className='flex items-center text-center text-sm'>Já tem conta?&nbsp;
              <span className='underline font-bold text-green-700'> <Link href='/login'>Faça login</Link></span>
            </p>
          )}
          
          </div>
      </div>
    </>
  )
}

export default SigupPage