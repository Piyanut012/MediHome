import React from 'react';
import NavBarCare from '../../components/NavBarCare';

function Confirm() {
  const handleDelete = (id) => {
    // ฟังก์ชันที่จะจัดการกับการยกเลิกการจอง
    console.log(`Deleting appointment with ID: ${id}`);
    // คุณสามารถเพิ่มโค้ดการลบข้อมูลจาก backend ได้ที่นี่
  };

  return (
    <div>
      <NavBarCare />
      <div className='flex flex-col h-screen  items-center text-xl'>
        <div className='p-[50px] flex flex-col'>
          <p>การจองทั้งหมด</p>
          <p>ทั้งหมด 15 อัน</p>
        </div>
        <div className='grid grid-cols-3 gap-5'>
          
          <div className="flex flex-col justify-center w-[320px] h-[300px] p-6 bg-theme4 rounded-xl shadow-md">
            <h2 className="text-lg font-bold text-gray-900">สมชาย ใจดี</h2>
            <div className="mt-4">
              <p className="text-base text-gray-500">Service</p>
              <p className="text-lg text-gray-900">ล้างแผล ดูเเลไอขาขาด</p>
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <p className="text-base text-gray-500">Date</p>
                <p className="text-lg text-gray-900">15/05/2565</p>
              </div>
              <div>
                <p className="text-base text-gray-500">Time</p>
                <p className="text-lg text-gray-900">12:00 pm</p>
              </div>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <button onClick={() => handleDelete(1)} className="text-gray-400 text-sm text-green-400">
                ยืนยัน
              </button>
              <button onClick={() => handleDelete(1)} className="text-gray-400 text-sm text-red-500">
                ยกเลิก
              </button>
            </div>
          </div>

          <div className="flex flex-col justify-center w-[320px] h-[300px] p-6 bg-theme4 rounded-xl shadow-md">
            <h2 className="text-lg font-bold text-gray-900">สมชาย ใจดี</h2>
            <div className="mt-4">
              <p className="text-base text-gray-500">Service</p>
              <p className="text-lg text-gray-900">ล้างแผล ดูเเลไอขาขาด</p>
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <p className="text-base text-gray-500">Date</p>
                <p className="text-lg text-gray-900">15/05/2565</p>
              </div>
              <div>
                <p className="text-base text-gray-500">Time</p>
                <p className="text-lg text-gray-900">12:00 pm</p>
              </div>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <button onClick={() => handleDelete(1)} className="text-gray-400 text-sm text-green-400">
                ยืนยัน
              </button>
              <button onClick={() => handleDelete(1)} className="text-gray-400 text-sm text-red-500">
                ยกเลิก
              </button>
            </div>
          </div>

          <div className="flex flex-col justify-center w-[320px] h-[300px] p-6 bg-theme4 rounded-xl shadow-md">
            <h2 className="text-lg font-bold text-gray-900">สมชาย ใจดี</h2>
            <div className="mt-4">
              <p className="text-base text-gray-500">Service</p>
              <p className="text-lg text-gray-900">ล้างแผล ดูเเลไอขาขาด</p>
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <p className="text-base text-gray-500">Date</p>
                <p className="text-lg text-gray-900">15/05/2565</p>
              </div>
              <div>
                <p className="text-base text-gray-500">Time</p>
                <p className="text-lg text-gray-900">12:00 pm</p>
              </div>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <button onClick={() => handleDelete(1)} className="text-gray-400 text-sm text-green-400">
                ยืนยัน
              </button>
              <button onClick={() => handleDelete(1)} className="text-gray-400 text-sm text-red-500">
                ยกเลิก
              </button>
            </div>
          </div>


          <div className="flex flex-col justify-center w-[320px] h-[300px] p-6 bg-theme4 rounded-xl shadow-md">
            <h2 className="text-lg font-bold text-gray-900">สมชาย ใจดี</h2>
            <div className="mt-4">
              <p className="text-base text-gray-500">Service</p>
              <p className="text-lg text-gray-900">ล้างแผล ดูเเลไอขาขาด</p>
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <p className="text-base text-gray-500">Date</p>
                <p className="text-lg text-gray-900">15/05/2565</p>
              </div>
              <div>
                <p className="text-base text-gray-500">Time</p>
                <p className="text-lg text-gray-900">12:00 pm</p>
              </div>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <button onClick={() => handleDelete(1)} className="text-gray-400 text-sm text-green-400">
                ยืนยัน
              </button>
              <button onClick={() => handleDelete(1)} className="text-gray-400 text-sm text-red-500">
                ยกเลิก
              </button>
            </div>
          </div>
          

        </div>
      </div>
    </div>
  );
}

export default Confirm;
