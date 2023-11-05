// File Dashboard.js
import React from 'react';

import { IconAthletesColor, IconBlogColor, IconEventColor, IconSportColor } from '../../../assets';
import { FooterAdmin, HeaderAdmin, Sidebar, StatisticAchievement, WidgetDashboard } from '../../../component';
import { useGetCardStatistics } from '../../../hooks/fetch/dashboard/useGetCardStatistics';

const Dashboard = () => {
  const columns = ['No', 'Feature', 'Date', 'Information'];
  const rows = [{ No: 1, Feature: 'Sport', Date: '16:33 / 30-08-2023', Information: 'Added new sports' }];
  const { data: dataCardStatistics } = useGetCardStatistics();

  if (!dataCardStatistics) {
    return null;
  }

  return (
    <div className='flex'>
      <Sidebar />
      <div className='w-screen -my-2 overflow-hidden'>
        <HeaderAdmin title='Dashboard' />
        <div className='w-full px-8 py-20'>
          <div className='flex w-full gap-6 mb-7'>
            <WidgetDashboard
              borderColor='#25272C'
              iconSrc={IconSportColor}
              mainText={dataCardStatistics.total_sports}
              subText='TOTAL SPORT'
            />
            <WidgetDashboard
              borderColor='#EE393E'
              iconSrc={IconEventColor}
              mainText={dataCardStatistics.total_events}
              subText='TOTAL EVENT'
            />
            <WidgetDashboard
              borderColor='#1FB15E'
              iconSrc={IconBlogColor}
              mainText={dataCardStatistics.total_news}
              subText='TOTAL NEWS'
            />
            <WidgetDashboard
              borderColor='#1479BD'
              iconSrc={IconAthletesColor}
              mainText={dataCardStatistics.total_athletes}
              subText='TOTAL ATHLETES'
            />
          </div>
          <div className='mb-7'>
            <StatisticAchievement
              total={dataCardStatistics.total_medal_counts.totalMedals}
              data={dataCardStatistics.medal_counts}
            />
          </div>
          {/* <Table2
            title={'Last Activity'}
            rows={rows}
            columns={columns}
          /> */}
        </div>

        <FooterAdmin />
      </div>
    </div>
  );
};

export default Dashboard;
