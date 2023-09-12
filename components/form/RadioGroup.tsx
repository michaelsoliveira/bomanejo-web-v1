import React, { useState } from "react";
import Option from "./Option";

interface IProps {
  children: React.ReactNode;
  labelText?: string;
}
const RadioGroup = ({ labelText, children }: IProps) => {
  
  return (
    <div>
      {labelText && (
        <label className="block text-gray-600 mb-2 text-xs lg:text-sm xl:text-base">
          {labelText}
        </label>
      )}
      <div className="flex justify-evenly">
        {children}
      </div>
    </div>
  );
};
export default RadioGroup