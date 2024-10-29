import { SideList } from '@/db/data';
import logo from '../../assets/logo.png';
import { NavLink } from 'react-router-dom';

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
              className={({ isActive }) => {
                `flex flex-col`;
                isActive;
              }}
            >
              {items.icons}
              {items.title}
            </NavLink>
          ))}
        </div>
      </div>
      <button>Logout</button>
    </div>
  );
}
