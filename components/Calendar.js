'use client'

import { gradients , baseRating } from '@/utils/gradients';
import { Fugaz_One } from 'next/font/google';
import React, { useState } from 'react';


const months = {
  'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr', 
  'May': 'May', 'June': 'Jun','July': 'Jul', 'August': 'Aug', 
  'September': 'Sep', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec'
};
const monthsArr = Object.keys(months)
const now = new Date();
const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];  // Changed to correct day order
const fugaz = Fugaz_One({ subsets: ['latin'], weight: '400' })

export default function Calendar(props) {
  const now = new Date()
  const currMonth = now.getMonth()
  const [selectedMonth, setSelectedMonth] = useState(Object.keys(months)[currMonth])
  const [selectedYear,setSelectedYear] = useState(now.getFullYear())
  console.log('SELECTED MONTH:'+selectedMonth)
  const { demo, completeData, handleSetMood } = props;
  
  const numericMonth= monthsArr.indexOf(selectedMonth) 
  const data = completeData?.[selectedYear]?.[numericMonth] || {}
  //const year = 2024;
  //const month = 'October';

  function handleIncrementeMonth(val){
    
    if (numericMonth + val < 0){
      // set the month value = 11 and decrement the year
      setSelectedYear(curr => curr-1)
      setSelectedMonth(monthsArr[monthsArr.lenght-1])

    } else if (numericMonth + val > 11){
      // set the month value = 0 and increment the year
      setSelectedYear(curr => curr+1)
      setSelectedMonth(monthsArr[0])
    }else {
      setSelectedMonth(monthsArr[numericMonth + val])
    }
  }


  
  // First day of the month (e.g., October 1, 2024) and its day of the week
  const monthNow = new Date(selectedYear, Object.keys(months).indexOf(selectedMonth), 1);
  const firstDayOfMonth = monthNow.getDay(); // Get the day of the week (0-6)
  
  // Total days in the month
  const daysInMonth = new Date(selectedYear, Object.keys(months).indexOf(selectedMonth) + 1, 0).getDate();

  // Calculate number of rows needed to display the days
  const totalCells = firstDayOfMonth + daysInMonth;
  const numRows = Math.ceil(totalCells / 7);

  return (
    <div className='flex flex-col gap-2'>
      <div className='grid grid-cols-5 gap-4'>
        <button onClick={() => {
          handleIncrementeMonth(-1)
        }} className='mr-auto text-indigo-400 text-lg duration-200 hover:opacity-60'><i className="fa-solid fa-circle-left"></i></button>
        <p className={'text-center col-span-3 capitalize whitespace-nowrap textGradient ' + fugaz.className}>{selectedMonth}, {selectedYear}</p>
        <button onClick={() => {
          handleIncrementeMonth(+1)
        }} className='ml-auto text-indigo-400 text-lg duration-200 hover:opacity-60'><i className="fa-solid fa-circle-right"></i></button>
      </div>

      <div className="flex flex-col overflow-hidden gap-1 py-4">
        {[...Array(numRows).keys()].map((row, rowIndex) => {
          return (
            <div key={rowIndex} className="grid grid-cols-7 gap-1">
              {dayList.map((dayOfWeek, dayOfWeekIndex) => {
                // Calculate the current day index
                const cellIndex = rowIndex * 7 + dayOfWeekIndex;
                const dayIndex = cellIndex - firstDayOfMonth + 1;

                // Determine if the day should be displayed (valid day of the month)
                const dayDisplay = dayIndex > 0 && dayIndex <= daysInMonth;
                const isToday = dayIndex === now.getDate();

                if (!dayDisplay) {
                  return <div className="bg-white" key={dayOfWeekIndex}></div>;
                }

                const color = demo 
                  ? gradients.indigo[baseRating[dayIndex]] 
                  : dayIndex in data 
                  ? gradients.indigo[data[dayIndex]] 
                  : 'white';

                return (
                  <div
                    style={{ background: color }}
                    className={
                      'text-sm md:text-xs border border-solid p-2 flex items-center gap-2 justify-between rounded-lg ' +
                      (isToday ? 'border-indigo-400' : 'border-indigo-100') +
                      (color === 'white' ? 'text-indigo-400' : 'text-white')
                    }
                    key={dayOfWeekIndex}
                  >
                    <p>{dayIndex}</p>
                  </div>
                );
              })}
            </div>
        );
      })}
    </div>
  </div>
  );
}
