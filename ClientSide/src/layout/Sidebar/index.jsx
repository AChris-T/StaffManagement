import { SideList } from '@/db/data';
import logo from '../../assets/logo.png';
import { NavLink } from 'react-router-dom';
import { RiLogoutCircleRLine } from 'react-icons/ri';

export default function index() {
  return (
    <div className="flex flex-col justify-between  w-full px-5 py-[22px]">
      <div className="flex flex-col gap-11">
        <div className="flex items-center justify-center w-full gap-2 ">
          <img src={logo} alt="" className="w-[72px] h-[72px]" />
        </div>
        <div className="flex flex-col gap-2">
          {SideList.map((items, index) => (
            <NavLink
              key={index}
              to={items.path}
              className={({ isActive }) =>
                `flex px-4 py-4 rounded-xl hover:bg-blue-dark hover:text-white-200 items-center outfit gap-3
                ${isActive ? 'bg-blue-dark text-white-200' : ''}`
              }
            >
              {items.icons}
              <h3 className="text-base">{items.title}</h3>
            </NavLink>
          ))}
        </div>
      </div>
      <button className="flex items-center w-full gap-3 px-6">
        <RiLogoutCircleRLine />
        Logout
      </button>
    </div>
  );
}
