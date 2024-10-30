export default function index({ icons, title, figure }) {
  return (
    <div className="border-[#00000033] w-full border-[0.5px] rounded-xl flex flex-col p-4 gap-4">
      <div className="border-[#00000033] border-[0.5px] rounded-xl w-10 h-10 flex justify-center items-center ">
        {icons}{' '}
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-xs font-normal popins">{title}</h3>
        <h2 className="text-3xl font-medium popins">{figure}</h2>
      </div>
    </div>
  );
}
