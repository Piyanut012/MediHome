import React, { useState } from 'react';
import NavBarPro from '../../components/NavBarpro';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars'; // นำเข้า DateRangePickerComponent

const startValue = new Date(new Date().getFullYear(), new Date().getMonth(), 14);
const endValue = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 15);
const minDate = new Date(new Date().getFullYear(), new Date().getMonth(), 8);
const maxDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 20);

function HomePro() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // แสดงผลวันที่ที่เลือก
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
  };

  return (
    <div>
      <NavBarPro />
      <div className='flex flex-col justify-center my-16 px-80'>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col items-center'>
            <p className='text-left mb-3'>Availability</p>
            <div className="mb-4">
              <label className="block text-gray-700">เริ่มต้นวันว่าง</label>
              <input 
                type="date" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)} 
                className="mt-1 block w-[450px] border border-gray-300 rounded-md p-2" 
                min={minDate.toISOString().split('T')[0]} 
                max={maxDate.toISOString().split('T')[0]}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">สิ้นสุดวันว่าง</label>
              <input 
                type="date" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)} 
                className="mt-1 block w-[450px] border border-gray-300 rounded-md p-2" 
                min={minDate.toISOString().split('T')[0]} 
                max={maxDate.toISOString().split('T')[0]}
              />
            </div>
            <div>
              <DateRangePickerComponent 
                placeholder="Enter Date Range"
                startDate={startValue}
                endDate={endValue}
                min={minDate}
                max={maxDate}
                minDays={3}
                maxDays={5}
                format="dd-MMM-yy"
              />
            </div>
            <div className="flex justify-end w-3/6">
              <button type="submit" className="bg-green-500 text-xs text-white px-4 py-2 rounded-md">เพิ่ม</button>
            </div>
          </div>
        </form>
        <p>ช่วงเวลาว่างทั้งหมด</p>
        <hr className='m-3' />
        <div className='flex flex-col items-center'>
          <div className='flex p-5 bg-theme3 w-3/4 rounded-md '>
            <p>{`เริ่มต้น: ${startDate}, สิ้นสุด: ${endDate}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePro;
