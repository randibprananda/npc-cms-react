import React, { useState } from 'react';

import { IconDropdown } from '../../assets';

const AccordionCheckbox = ({ title, options, selectedNews, setSelectedNews }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to handle checkbox click
  const handleCheckboxChange = (optionId) => {
    // Check if the optionId is already in the selected array
    if (selectedNews.includes(optionId)) {
      // If it is, remove it
      setSelectedNews(selectedNews.filter((id) => id !== optionId));
    } else {
      // If it's not, add it
      setSelectedNews([...selectedNews, optionId]);
    }
  };

  return (
    <div className='w-full mx-auto'>
      <div>
        <button
          type='button'
          onClick={() => setIsOpen(!isOpen)}
          className='flex items-center justify-between w-full py-2 text-base font-bold rounded'>
          {title}
          <img
            src={IconDropdown}
            className={isOpen ? 'rotate-180' : 'rotate-0'}
            alt='IconDropdown'
          />
        </button>
        {isOpen && (
          <div className='mt-2'>
            {options.map((option, index) => (
              <div
                className='flex items-center mt-2'
                key={index}>
                <input
                  value={option?.id}
                  type='checkbox'
                  id={`option${index}`}
                  className='form-checkbox h-4 w-4 text-blue-600 rounded-[4px]'
                  onChange={() => handleCheckboxChange(option.id)}
                  checked={selectedNews !== undefined ? selectedNews.includes(option.id) : false}
                />
                <label
                  htmlFor={`option${index}`}
                  className='ml-2 text-xs'>
                  {option?.title}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccordionCheckbox;
