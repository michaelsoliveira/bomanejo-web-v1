import { useState } from 'react';
import { Tab } from '@headlessui/react'
import classNames from 'classnames';
import Login from './Login'
import { AddEdit } from './user/AddEdit'
import React, { createRef } from 'react'
import { UserAddIcon } from '@heroicons/react/outline';

const styles = {
  label: 'block text-gray-700 text-sm font-bold pt-2 pb-1',
  field:
    'text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 w-[22.5em] appearance-none',
  button:
    ' bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-500',
  errorMsg: 'text-red-500 text-sm',
}

const Tabs = () => {
  const formRef = createRef<any>()

  const submitForm = () => {
    if (formRef.current) {
        formRef.current.handleSubmit()
    }
  } 

  return (
    <div className="w-full py-4">
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-2 bg-green-900/20 rounded-lg">
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full py-2.5 text-sm leading-5 font-medium rounded-md transition-all',
                  'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-green-400 ring-white ring-opacity-60',
                  selected
                    ? 'bg-green-700 text-white shadow'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-700'
                )
              }
            >
              Login
          </Tab>
          <Tab
              className={({ selected }) =>
                classNames(
                  'w-full py-2.5 text-sm leading-5 font-medium rounded-md transition-all',
                  'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-green-400 ring-white ring-opacity-60',
                  selected
                    ? 'bg-green-700 text-white shadow'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-green-700'
                )
              }
            >
              Cadastro
            </Tab>
        </Tab.List>
        <Tab.Panels>
            <Tab.Panel
              className={classNames(
                'px-6 py-2'
              )}
          >
              <Login /> 
          </Tab.Panel>
          <Tab.Panel
              className={classNames(
                'px-4 py-2 text-left mx-auto flex flex-wrap justify-center items-center'
              )}
            >
              <div className="flex flex-col items-center justify-between w-full">
              
              <AddEdit ref={formRef} styles={styles} projetoId="" redirect/>
              
                <button
                  onClick={submitForm}
                  disabled={formRef.current?.isSubmitting}
                  type="submit"
                  className="my-4 group relative w-3/4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <UserAddIcon className="h-5 w-5 text-green-500 group-hover:text-green-400" aria-hidden="true" />
                  </span>
                  Cadastrar
                </button>
              </div>
              
              
            </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Tabs