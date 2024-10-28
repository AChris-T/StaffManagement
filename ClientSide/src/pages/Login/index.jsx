import logo from '../../assets/logo.png';
import passwordVisibility from '@/utils/hooks/passwordVisibilty';

const index = () => {
  const [passwordVisible, setPasswordVisible, Icon] = passwordVisibility();

  return (
    <div className="w-full h-[100vh] bg-white-100 flex justify-center items-center">
      <div className="w-[560px] rounded-[20px] shadow py-9 gap-5 bg-white-200 px-6 ">
        <div className="flex justify-center items-center flex-col">
          <div className="flex justify-center flex-col items-center gap-2">
            <img
              src={logo}
              alt=""
              className="object-cover w-[69px] h-[69px] "
            />
            <h3 className="text-[12px] popins font-light">
              Redneck personnel management platform{' '}
            </h3>
          </div>
          <div className="flex justify-center flex-col items-center">
            <h2 className="text-2xl popins font-semibold">Welcome back</h2>
            <h4 className="text-white-300 text-base">
              Sign in to your account
            </h4>
          </div>
        </div>
        <form className="mt-9 gap-5 flex flex-col">
          <div className="flex justify-start flex-col gap-3">
            <label className="popins text-base font-normal">Username</label>
            <select
              id="role"
              name="role"
              className="bg-blue-light px-4 py-4 rounded-xl text-white-300 focus:outline-none"
            >
              <option value="">Select your role</option>
              <option value="male">ICT</option>
              <option value="female">Registery</option>
              <option value="female">Management</option>
            </select>
          </div>
          <div className="flex justify-start flex-col gap-3">
            <label className="popins text-base font-normal">Password</label>
            <div className="w-full relative bg-blue-light rounded-xl">
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Enter your Password"
                className="bg-blue-light rounded-xl w-full px-4 py-4  text-white-300 focus:outline-none"
              />
              <button
                type="button"
                onClick={setPasswordVisible}
                className="absolute inset-y-0 right-4 flex items-center text-gray-400 focus:outline-none"
              >
                <Icon />
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 popins">
              <input type="checkbox" />
              <h3 className="font-normal text-white-300 text-sm">
                Remember me
              </h3>
            </div>
            <h3 className="text-blue-dark popins font-normal text-base">
              Forget Password?
            </h3>
          </div>
          <button className="bg-blue-100 rounded-xl py-4 popins text-base font-bold text-white-200">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default index;
