import React, { ReactNode, createContext, useState } from 'react';

type StepContextType = {
    step: number;
    data: any;
    nextStep: () => void;
    prevStep: () => void;
    setStep: (step: number) => void;
    updateData: (data: any) => void;
    resetData: () => void;
}

type Props = {
    children: ReactNode
}

const StepContext = createContext({ step: 1 } as StepContextType)

const StepProvider = ({ children }: Props) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({});

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const updateData = (data: any) => {
    setData((prevData) => ({
      ...prevData,
      ...data
    }));
  };

  const resetData = () => {
    setData({});
    setStep(1);
  };

  const values = {
    step,
    data,
    nextStep,
    prevStep,
    updateData,
    resetData,
    setStep
  };

  return (
    <StepContext.Provider value={values}>{children}</StepContext.Provider>
  );
};

export { StepContext, StepProvider };