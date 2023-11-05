import React from 'react';

const WidgetDashboard = ({ borderColor, iconSrc, mainText, subText }) => {
    const inlineStyles = {
        boxShadow: '0px 0px 8px 0px rgba(0, 0, 0, 0.25)',
        borderTop: `3px solid ${borderColor}`
    };

    return (
        <div className='rounded-[10px] py-5 px-7 h-[160px] flex justify-between flex-col w-full' style={inlineStyles}>
            <div className='flex justify-end'>
                <img src={iconSrc} alt='icon' />
            </div>
            <div>
                <h1 className='text-[32px] font-bold text-black'>{mainText}</h1>
                <h1 className='text-xs text-[#8E95A2] font-bold'>{subText}</h1>
            </div>
        </div>
    );
};

export default WidgetDashboard;
