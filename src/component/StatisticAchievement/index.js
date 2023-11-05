import React, { useEffect, useRef } from 'react';

import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const StatisticAchievement = ({ data, total }) => {
  const chart = useRef(null);

  const toggleDataSeries = (e) => {
    if (typeof e.dataSeries.visible === 'undefined' || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    chart.current.render();
  };

  const options = {
    animationEnabled: true,

    toolTip: {
      shared: true,
    },
    legend: {
      enabled: false, // Menghilangkan legenda
    },
    data: [
      {
        type: 'stackedBar',
        name: 'Bronze Medal',
        color: '#790112',
        showInLegend: false,
        dataPoints: [
          { label: 'WORLD', y: data.WORLD.bronze_medal_count },
          { label: 'ASIAN', y: data.ASIAN.bronze_medal_count },
          { label: 'ASEAN', y: data.ASEAN.bronze_medal_count },
        ],
      },

      {
        type: 'stackedBar',
        name: 'Silver Medal',
        color: '#9BA5B7',
        showInLegend: false,
        dataPoints: [
          { label: 'WORLD', y: data.WORLD.silver_medal_count },
          { label: 'ASIAN', y: data.ASIAN.silver_medal_count },
          { label: 'ASEAN', y: data.ASEAN.silver_medal_count },
        ],
      },
      {
        type: 'stackedBar',
        name: 'Gold Medal',
        color: '#F6BE2C',
        showInLegend: false,
        dataPoints: [
          { label: 'WORLD', y: data.WORLD.gold_medal_count },
          { label: 'ASIAN', y: data.ASIAN.gold_medal_count },
          { label: 'ASEAN', y: data.ASEAN.gold_medal_count },
        ],
      },
    ],
  };

  useEffect(() => {
    // This will run after the first render, acting like "componentDidMount"
    if (chart.current) {
      chart.current.render();
    }
  }, []);
  const inlineStyles = {
    boxShadow: '0px 0px 8px 0px rgba(0, 0, 0, 0.25)',
  };
  return (
    <div
      className='p-8 bg-white rounded-[10px]'
      style={inlineStyles}>
      <div className='border-b border-[#6B7280] py-5 mb-[52px]'>
        <div className='flex items-center justify-between'>
          <h1 className='text-base font-[300] text-[#40444C]'>Statistics</h1>
          <h1 className='text-lg font-[300] text-[#615E83]'>Total:</h1>
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-12'>
            <h1 className='text-xl font-bold text-[#1E1B39]'>Achievement</h1>
            <div className='flex gap-[30px] items-center'>
              <div className='flex items-center gap-2'>
                <div className='w-[14px] h-[14px] rounded-full bg-[#F6BE2C]'></div>
                <h1 className='text-lg text-[#1E1B39]'>Gold Medals</h1>
              </div>
              <div className='flex items-center gap-2'>
                <div className='w-[14px] h-[14px] rounded-full bg-[#9BA5B7]'></div>
                <h1 className='text-lg text-[#1E1B39]'>Silver Medals</h1>
              </div>
              <div className='flex items-center gap-2'>
                <div className='w-[14px] h-[14px] rounded-full bg-[#790112]'></div>
                <h1 className='text-lg text-[#1E1B39]'>Bronze Medals</h1>
              </div>
            </div>
          </div>
          <h1 className='text-[22px] font-bold text-[#1E1B39]'>{total}</h1>
        </div>
      </div>
      <div className='w-full overflow-x-auto'>
        <CanvasJSChart
          options={options}
          onRef={(ref) => (chart.current = ref)}
        />
      </div>
    </div>
  );
};

export default StatisticAchievement;
