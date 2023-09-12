import React, { Component, useCallback, useContext, useEffect, useState } from 'react';

import AsyncSelect from 'react-select/async';

interface State {
    readonly inputValue: string;
}

export interface OptionType {
    readonly label: string;
    readonly value: string | Number;
}

export type SelectType = {
  label?: string;
  callback: (option: any) => void;
  defaultOptions?: OptionType[];
  placeholder?: string;
  selectedValue?: any;
  options?: any;
  isMulti?: boolean;
  initialData?: any
}

export const Select = ({ label, callback, options, defaultOptions, placeholder, selectedValue, isMulti = false , initialData }: SelectType) => {
    return (
      <div>
        <label className="text-sm" htmlFor="">{ label }</label>
        <AsyncSelect
            isMulti={isMulti}
            loadOptions={options}
            className="text-sm origin-top-right absolute right-0"
            defaultOptions={defaultOptions}
            placeholder={placeholder}
            value={typeof selectedValue !== typeof undefined ? (selectedValue?.length > 1 ? selectedValue?.map((data: any) => {
              return {
                label: data.label,
                value: data.value
              }
            }) : 
            selectedValue
              ) : initialData
            }
            onChange={callback}
            id="category-select"
            instanceId="category-select"
            theme={(theme) => ({
                ...theme,
                // borderRadius: 0,
                colors: {
                    ...theme.colors,
                    primary: 'rgb(21 128 61)',
                    primary75: 'rgb(22 163 74)',
                    primary50: 'rgb(21 128 61)',
                    primary25: 'rgb(229 231 235)',
                    },
                })
            }
        />
      </div>
    )
}
