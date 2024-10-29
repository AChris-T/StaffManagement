import logo from '../../assets/logo.png';
import passwordVisibility from '@/utils/hooks/passwordVisibilty';

const index = () => {
  const [passwordVisible, setPasswordVisible, Icon, userText, handleChange] =
    passwordVisibility();

  return (
    <div className="w-full h-[100vh] bg-white-100 flex justify-center items-center">
      <div className="w-[560px] rounded-[20px] shadow py-9 gap-5 bg-white-200 px-6 ">
        <div className="flex flex-col items-center justify-center gap-5">
          <div className="flex flex-col items-center justify-center gap-2">
            <img
              src={logo}
              alt=""
              className="object-cover w-[69px] h-[69px] "
            />
            <h3 className="text-[12px] popins font-light">
              Redneck personnel management platform{' '}
            </h3>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-semibold popins">Welcome back</h2>
            <h4 className="text-base text-white-300">
              Sign in to your account
            </h4>
          </div>
        </div>
        <form className="flex flex-col gap-5 mt-9">
          <div className="flex flex-col justify-start gap-3">
            <label className="text-base font-normal popins">Username</label>
            <div className="px-2 pr-4 bg-blue-light rounded-xl">
              <select
                id="role"
                values={userText}
                onChange={handleChange}
                placeholder="Select your role"
                name="role"
                className={`border-none w-full popins px-2   rounded-xl py-4 bg-blue-light outline-none ${
                  userText ? 'text-black-default' : ''
                }`}
              >
                <option value="" className="">
                  Select your role
                </option>
                <option value="ICT">ICT</option>
                <option value="Registry">Registry</option>
                <option value="Management">Management</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col justify-start gap-3">
            <label className="text-base font-normal popins">Password</label>
            <div className="relative w-full bg-blue-light rounded-xl">
              <input
                type={passwordVisible ? 'text' : 'password'}
                values={handleChange}
                onChange={handleChange}
                placeholder="Enter your Password"
                className={`border w-full popins px-4 rounded-xl py-4 bg-blue-light outline-none ${
                  userText ? 'text-black-default' : ''
                }`}
              />
              <button
                type="button"
                onClick={setPasswordVisible}
                className="absolute inset-y-0 flex items-center text-purple-100 right-4 focus:outline-none"
              >
                <Icon />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-2 popins">
              <input type="checkbox" />
              <h3 className="text-sm font-normal text-white-300">
                Remember me
              </h3>
            </div>
            <h3 className="text-base font-normal text-blue-dark popins">
              Forget Password?
            </h3>
          </div>
          <button className="py-4 text-base font-bold bg-blue-100 rounded-xl popins text-white-200">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default index;
