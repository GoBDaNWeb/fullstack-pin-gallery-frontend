// * react
import React, { memo } from 'react';
import { IInputProps } from './types';

const Input: React.FC<IInputProps> = memo(
    ({ func, type, placeholder, name, value, error }) => (
        <input
            onChange={func}
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            className={`border-solid rounded-full h-10 px-2 border-[1px] border-gray-200 bg-gray-100 outline-none w-full ${
                error && 'border-red-500 bg-red-200'
            }`}
        />
    ),
);

export default Input;
