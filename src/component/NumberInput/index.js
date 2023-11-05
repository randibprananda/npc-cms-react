import React, { useEffect, useState } from 'react';

const NumberInput = ({ initialValue = 0, minValue = 0, onValueChange }) => {
  const [inputValue, setInputValue] = useState(initialValue);

  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  const handleIncrement = () => {
    const newValue = inputValue + 1;
    setInputValue(newValue);
    onValueChange && onValueChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(inputValue - 1, minValue);
    setInputValue(newValue);
    onValueChange && onValueChange(newValue);
  };

  return (
    <div className='flex'>
      {/* <button
        type='button'
        style={{ height: '40px' }}
        className='px-4 py-2.5 rounded-l-[10px] bg-[#EE393E] flex items-center'
        onClick={handleDecrement}>
        <img
          src={IconMinusWhite}
          alt='IconMinusWhite'
        />
      </button> */}
      <input
        disabled
        value={inputValue}
        onChange={(e) => {
          const newValue = Number(e.target.value);
          setInputValue(newValue);
          onValueChange && onValueChange(newValue);
        }}
        style={{ height: '40px' }}
        className='appearance-none block text-center w-full border bg-light text-black py-2.5 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white md:text-sm text-xs'
        id='number'
        type='number'
        placeholder=''
      />
      {/* <button
        type='button'
        style={{ height: '40px' }}
        className='px-4 py-2.5 rounded-r-[10px] bg-[#EE393E] flex items-center'
        onClick={handleIncrement}>
        <img
          src={IconPlusWhite}
          alt='IconPlusWhite'
        />
      </button> */}
    </div>
  );
};

export default NumberInput;
