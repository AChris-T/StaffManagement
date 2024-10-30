import { RiSettingsLine } from 'react-icons/ri';
import { IoIosNotificationsOutline } from 'react-icons/io';
import user from '../../assets/user.png';
import { MdKeyboardArrowDown } from 'react-icons/md';

const PageHeader = () => {
  return (
    <div className="h-[78px] px-2 md:px-[30px] flex justify-between items-center border-b-[1px] ">
      <h3 className="text-lg font-semibold popins">OYO STATE</h3>
      <div className="flex items-center justify-center gap-4">
        <RiSettingsLine className="text-purple-100 text-[18px] h-[18px]" />
        <div className="flex">
          <IoIosNotificationsOutline className="text-purple-100 text-[20px] cursor-pointer" />
          <sup className="bg-blue-dark w-[10px] h-[10px] rounded-full ml-[-10px] mt-[2px] cursor-pointer"></sup>
        </div>
        <div className="flex items-center gap-3 rounded-[50px] px-[5px] bg-white-700">
          <img src={user} alt="" className="w-10 h-10 rounded-full" />
          <MdKeyboardArrowDown className="text-[#534FEB] " />
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
