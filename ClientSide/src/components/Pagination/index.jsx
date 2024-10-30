import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import { RiArrowRightDoubleLine } from 'react-icons/ri';

export default function index({
  totalPages,
  currentPage,
  onPageChange,
  onNextPage,
  onPrevPage,
}) {
  const getPaginationButtons = () => {
    const buttons = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(i);
      }
    } else {
      buttons.push(1);

      if (currentPage > 4) buttons.push('...');

      if (currentPage > 1 && currentPage < totalPages - 1)
        buttons.push(currentPage);
      if (currentPage + 1 < totalPages - 1) buttons.push(currentPage + 1);

      if (currentPage < totalPages - 3) buttons.push('...');

      buttons.push(totalPages);
    }

    return buttons;
  };
  return (
    <div className="flex mt-4 md:justify-center md:items-center">
      <button
        onClick={onPrevPage}
        disabled={currentPage === 1}
        className="px-[15px] py-[9px] rounded-[0.5px]  bg-[#E8F0FE80]"
      >
        <MdKeyboardDoubleArrowLeft />
      </button>

      {getPaginationButtons().map((page, index) =>
        page === '...' ? (
          <span key={index} className="mx-1">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        className="px-[15px] py-[9px] bg-[#E8F0FE80] "
      >
        <RiArrowRightDoubleLine />
      </button>
    </div>
  );
}
