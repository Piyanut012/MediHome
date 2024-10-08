import React from 'react'
import NavBarPro from '../../components/NavBarpro'


function HomePro() {
  return (
    <div>
    <NavBarPro/>
    <div className='flex flex-col  justify-center my-16 px-80'>
      <form>
                <div className="mb-4">
                    <label className="block text-gray-700">Gender</label>
                    <div className="flex items-center">
                        <label className="mr-4">
                            <input type="radio" name="gender" value="male" className="mr-1" /> Male
                        </label>
                        <label className="mr-4">
                            <input type="radio" name="gender" value="female" className="mr-1" /> Female
                        </label>
                        <label>
                            <input type="radio" name="gender" value="other" className="mr-1" /> Other
                        </label>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Department</label>
                    <select className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                        <option>Select Department</option>
                        <option>HR</option>
                        <option>IT</option>
                        <option>Finance</option>
                    </select>
                </div>
                <p>Availability</p>
                <div className="mb-4">
                    
                    <label className="block text-gray-700">Start Date</label>
                    <input type="date" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                </div>
                <div className="mb-4">
                    <p>Availability</p>
                    <label className="block text-gray-700">Start Date</label>
                    <input type="date" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                </div>
                <div className="mb-4 flex items-center">
                    <input type="checkbox" className="mr-2" /> <label>Permanent Employee</label>
                </div>
                <div className="flex justify-between">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
                    <button type="button" className="bg-gray-300 text-black px-4 py-2 rounded-md">Reset</button>
                </div>
            </form>

    </div>
  </div>
  )
}

export default HomePro