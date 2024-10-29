import { RiSettingsLine } from 'react-icons/ri';
import { IoIosNotificationsOutline } from 'react-icons/io';

const PageHeader = () => {
  return (
    <div className="h-[78px]  px-[30px] flex justify-between items-center shadow-lg ">
      <h3 className="popins text-[20px]">Welcome back, BABATUNDE Olanrewaju</h3>
      <div className="flex items-center justify-center gap-4">
        <RiSettingsLine className="text-purple-100 text-[18px] h-[18px]" />
        <div className="flex">
          <IoIosNotificationsOutline className="text-purple-100 text-[20px] cursor-pointer" />
          <sup className="bg-blue-dark w-[10px] h-[10px] rounded-full ml-[-10px] mt-[2px] cursor-pointer"></sup>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
