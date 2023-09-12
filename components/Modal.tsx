import { Fragment, ReactNode, useCallback, useEffect, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
import classNames from './utils/classNames'
import { useModalContext } from 'contexts/ModalContext'

interface ModaType {
    children?: ReactNode
}

type ModalProps = {
    styleButton?: string,
    className?: string,
    size?: string,
    title?: string,
    visible?: boolean,
    confirmBtn?: string,
    onConfirm?: () => {},
    iconType?: string,
    content?: ReactNode,
    type?: string,
    hookForm?: string,
    options?: boolean,
    cancelName?: string
}

export default function Modal(props: ModaType) {

  const { store, hideModal } = useModalContext()
  let { 
          styleButton,
          className,
          title,
          size,
          visible,
          confirmBtn,
          onConfirm,
          iconType,
          content,
          type,
          hookForm,
          options = true,
          cancelName
        } : ModalProps = store
  const KEY_NAME_ESC = 'Escape';

    const {
        children
    } = props

    const onKeyDown = useCallback((event: KeyboardEvent) => {
      if (event.key === KEY_NAME_ESC && visible) {
        hideModal();
      }
    },[hideModal, visible]);
    
    useEffect(() => {
      document.addEventListener('keydown', onKeyDown, false);
      return () => {
        document.removeEventListener('keydown', onKeyDown, false);
      };
    }, [hideModal, onKeyDown]);


    const cancelButtonRef = useRef(null)
    const submitButtonRef = useRef(null)

  return (
    <Transition.Root show={visible || false} as={Fragment}>
      <Dialog
            as="div" className={
            classNames("fixed z-40 inset-0 overflow-y-auto text-sm",
                    className
            )}
        initialFocus={cancelButtonRef} 
        onClose={hideModal}>
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 text-center sm:block sm:p-0 w-full">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className={classNames(
              'w-full inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle',
                size ? size : 'sm:max-w-md'
              )}>
               <div>
                  <div className="bg-white px-4 rounded-full">
                    <div className="sm:flex sm:items-center py-2 space-x-2">
                      { (iconType === 'warn') && (
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                        </div>
                      ) }
                      <div className="relative pt-1 w-full">
                        <div className=' flex flex-row justify-between items-center'>
                          <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                            {title}
                          </Dialog.Title>
                          {(type && type === 'submit') && (
                            <div className={classNames('absolute -right-1 hover:cursor-pointer',
                              !title && 'top-1'
                            )} onClick={hideModal}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </div>
                          )}
                          </div>
                        <div className="my-3 w-full">
                          {children ? children : content}
                        </div>
                      </div>
                    </div>
                  </div>
                  {options && (
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-full">
                      { confirmBtn && (
                        <button
                        type={type === "submit" ? 'submit' : 'button'}
                          className={classNames(
                              'w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm',
                              styleButton)}
                        onClick={onConfirm}
                        form={hookForm ? hookForm : ''}
                        ref={submitButtonRef}
                      >
                        {confirmBtn}
                      </button>
                      )}
                      
                      <button
                        ref={cancelButtonRef}
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={hideModal}
                      >
                        { cancelName ? cancelName : 'Cancelar' }
                      </button>
                    </div>
                  )}
                  
                </div>
              </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}