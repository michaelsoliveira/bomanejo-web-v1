import React, { useRef, Ref } from 'react';
import classNames from 'classnames';
import lodash from 'lodash';

import {
  RegisterOptions,
  DeepMap,
  FieldError,
  UseFormRegister,
  Path,
  FieldValues,
} from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Input, InputProps } from './atoms/input';
import { FormErrorMessage } from './atoms/form-error-message';

export type FormInputProps<TFormValues extends FieldValues> = {
    label?: Path<TFormValues>;
    name: Path<TFormValues>;
    rules?: RegisterOptions | any;
    innerRef?: any;
    register?: UseFormRegister<TFormValues>;
    layout?: 'default' | 'floatLabel',
    errors?: Partial<DeepMap<TFormValues, FieldError>>;
} & Omit<InputProps, 'name'>;

export const FormInput = <TFormValues extends Record<string, unknown>>({
    label,
  name,
  register,
  rules,
  errors,
  className,
  layout = 'default',
  innerRef,
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
  // If the name is in a FieldArray, it will be 'fields.index.fieldName' and errors[name] won't return anything, so we are using lodash get
  const errorMessages = lodash.get(errors, name) as any;
  const hasError = !!(errors && errorMessages);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
      <div className={classNames('flex', layout === 'floatLabel' ? 'flex-row items-center' : 'flex-col', className)} aria-live="polite">
          <label
              htmlFor={label}
              className='text-primary placeholder-gray-gray4 pt-1.5 text-sm py-1 w-[10rem]'
          >
                {label} {rules?.required && <span className='text-red'>*</span>}
          </label>
          <Input
              label={label}
              name={name}
              aria-invalid={hasError}
              ref={innerRef}
              className={classNames([{
              'transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 border-red-600 hover:border-red-600 focus:border-red-600 focus:ring-red-600':
                  hasError
              }])}
              {...props}
              {...(register && register(name, rules))}
          />
          {errors && (
            <ErrorMessage
              errors={errors}
              
              name={name as any}
              render={({ message }) => (
                <FormErrorMessage className="mt-1">{message}</FormErrorMessage>
              )}
            />
          )}
          
    </div>
  );
};
                