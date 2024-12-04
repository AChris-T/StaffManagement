/* eslint-disable react-hooks/rules-of-hooks */
import { CiSearch } from 'react-icons/ci';
import { MdOutlineKeyboardCommandKey } from 'react-icons/md';
import { CiTextAlignCenter } from 'react-icons/ci';
import { SlCloudUpload } from 'react-icons/sl';
import Dashtable from '@/utils/hooks/Dashtable';
import { Pagination } from '..';
import user from '../../assets/user.png';
import { getStatusColor } from '@/db/data';

export default function index() {
  const {
    data,
    totalPages,
    currentPage,
    currentDataRange,
    handlePageChange,
    handleNextPage,
    handlePrevPage,
    total,
  } = Dashtable();
  return (
    <div className="mt-16 mb-10">
      <div className="flex flex-wrap items-start w-full gap-4 md:flex-nowrap md:gap-8 md:justify-between">
        <div className="flex flex-wrap w-full gap-4 md:flex-row ">
          <div className="relative md:w-[270px] w-full border-[#00000033] border-[0.5px] rounded-xl">
            <input
              placeholder="Search by name,rank,service number"
              className="w-full px-10 py-4 font-light outline-none pr-14 popins rounded-xl "
            />
            <button
              type="button"
              className="absolute inset-y-0 flex items-center text-purple-100 b left-4 focus:outline-none"
            >
              <CiSearch className="text-[20px] text-[#00000099]" />
            </button>
            <button
              type="button"
              className="absolute inset-y-0 flex items-center gap-1 pl-3 text-purple-100 right-4 focus:outline-none"
            >
              <MdOutlineKeyboardCommandKey className="text-[20px] text-[#00000099]" />
              <p className="text-[#00000099] popins">K</p>
            </button>
          </div>
          <div className="px-2 w-[150px] flex md:hidden pr-4 border-[#00000033] border-[0.5px] rounded-xl">
            <select
              id="role"
              placeholder="Select your role"
              name="role"
              className="w-full h-[56px] px-2 py-4 font-light border-none outline-none outfit rounded-xl 'text-black-default'
              "
            >
              <option value="" className="">
                Service Number
              </option>
              <option value="ICT">Name</option>
              <option value="Registry">Date</option>
              <option value="Management">Rank</option>
            </select>
          </div>
          <button className="border-[#00000033] h-[56px] w-[150px] border-[0.5px] flex  justify-center items-center gap-4 rounded-xl popins font-light text-base">
            Filter
            <CiTextAlignCenter className="text-base" />
          </button>
        </div>
        <div className="flex flex-wrap gap-4 md:flex-nowrap">
          <div className="px-2 w-[150px] hidden md:flex pr-4 border-[#00000033] border-[0.5px] rounded-xl">
            <select
              id="role"
              placeholder="Select your role"
              name="role"
              className="w-full h-[56px] px-2 py-4 font-light border-none outline-none outfit rounded-xl 'text-black-default'
              "
            >
              <option value="" className="">
                Service Number
              </option>
              <option value="ICT">Name</option>
              <option value="Registry">Date</option>
              <option value="Management">Rank</option>
            </select>
          </div>
          <button className="border-[#00000033]  pl-2 h-[56px] gap-2 w-[150px] border-[0.5px] flex  justify-center items-center  rounded-xl popins font-light text-base">
            <input
              type="date"
              className="w-full pr-3 font-light focus:outline-none outfit"
            />
          </button>
          <button className="border-[#00000033] px-2 h-[56px] w-[150px] border-[0.5px] flex  justify-center items-center gap-4 rounded-xl popins font-light text-base">
            Export Rec...
            <SlCloudUpload className="text-base" />
          </button>
        </div>
      </div>
      <div className="mt-[23px] w-full  overflow-x-auto">
        <table className="min-w-[800px] popins ">
          <thead className="h-[68px]">
            <tr className="justify-start text-white bg-blue-200">
              <th className="px-4 rounded-tl-lg w-[150px] text-start text-base popins font-normal">
                Date
              </th>
              <th className="text-start w-[200px] text-base popins font-normal">
                Employee
              </th>
              <th className="text-start w-[150px] text-base popins font-normal">
                Gender
              </th>
              <th className="text-start w-[200px] text-base popins font-normal">
                Service Number
              </th>
              <th className="text-start  w-[200px] text-base popins font-normal">
                <h3 className="text-center w-[120px]">Status</h3>
              </th>
              <th className="rounded-tr-lg text-start w-[200px] text-base popins font-normal ">
                Rank
              </th>
            </tr>
          </thead>
          <tbody className="">
            {data.map((item) => (
              <tr
                key={item.id}
                className="text-start h-[72px] border-b-[#00000033] "
              >
                <td className="px-4 text-base font-light text-start popins">
                  {item.Date}
                </td>
                <td className="text-start popins">
                  <div className="flex items-center gap-2 text-base font-light ">
                    <img src={user} alt="" className="w-10 h-10 rounded-full" />
                    <h3>{item.Employee}</h3>
                  </div>
                </td>
                <td className="text-base font-light text-start popins">
                  {item.Gender}
                </td>
                <td className="text-base font-light text-start popins">
                  {item.ServiceNumber}
                </td>
                <td className="text-base font-ligh text-start popins">
                  <h3
                    className={`border-[1px] ${getStatusColor(
                      item.status
                    )} border-black-400 py-2 rounded-lg w-[120px] text-center`}
                  >
                    {item.status}
                  </h3>
                </td>
                <td className="text-base font-light text-start popins">
                  {item.rank}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col items-start justify-between md:items-center mt-7 md:flex-row ">
        <h3 className="text-base popins text-white-300">
          Showing{' '}
          <span className="font-normal text-black-default">
            {currentDataRange} of {total}
          </span>{' '}
          Employee
        </h3>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
        />
      </div>
    </div>
  );
}
