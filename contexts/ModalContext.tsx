import React, { createContext, ReactNode, useContext, useState } from 'react';

type ContextType = {
    showModal: (modalProps?: any, content?: any) => void;
    hideModal: () => void;
    store: any
}

const initialState: ContextType = {
  showModal: () => {},
  hideModal: () => {},
  store: {}
}

type Props = {
    children: ReactNode
}

// context
const ModalContext = createContext(initialState);

// Provider
const ModalProvider = ({ children }: Props) => {
  const [store, setStore] = useState({});

  const showModal = (modalProps: any = {}) => {
    setStore({
      ...store,
      ...modalProps,
      visible: true
    });
  }

  const hideModal = () => setStore({ modalProps: {}, onConfirm: () => {}, visible: false });

  return (
    <ModalContext.Provider value={{ store, showModal, hideModal }}>
        {children}
    </ModalContext.Provider>
  );
};

const useModalContext = () => {
  const context = useContext(ModalContext);
  return context;
};

export { useModalContext, ModalProvider };