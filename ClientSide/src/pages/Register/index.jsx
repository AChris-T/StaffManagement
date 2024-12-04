/* eslint-disable react-hooks/rules-of-hooks */
import { FormSteps, Header } from '@/components';
import { Main } from '@/layout';
import { useSearchParams } from 'react-router-dom';
import { LuPlusCircle } from 'react-icons/lu';
import { IoIosArrowBack } from 'react-icons/io';
import { GrFormClose } from 'react-icons/gr';

export default function Index() {
  const [searchParams, setSearchParams] = useSearchParams();
  const isAddMode = searchParams.get('CreatePersonelProfile') === 'true';

  const toggleAddMode = (value) => {
    setSearchParams({ CreatePersonelProfile: value ? 'true' : 'false' });
  };
  const clearForm = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Main>
      {isAddMode ? (
        <div className="px-1 flex-col flex gap-10 pt-12 md:px-6">
          <div className="flex items-center justify-between">
            <div
              onClick={() => toggleAddMode(false)}
              className="flex gap-1 text-base font-bold text-blue-100 cursor-pointer popins"
            >
              <IoIosArrowBack className="text-2xl" />
              Back
            </div>
            <div
              onClick={clearForm}
              className="flex gap-1 pr-4 text-base font-bold text-blue-100 cursor-pointer popins"
            >
              Clear form
              <GrFormClose className="text-2xl" />
            </div>
          </div>
          <FormSteps />
        </div>
      ) : (
        <div className="flex flex-col px-2 pt-12 md:px-6">
          <div className="flex items-center justify-between gap-2 md:flex-row">
            <Header title={'Personnel Registry'} />
            <button
              onClick={() => toggleAddMode(true)}
              className="flex items-center gap-2 px-5 py-4 text-xs font-bold bg-blue-100 rounded-xl text-white-200 md:text-base md:shadow-2xl"
            >
              <LuPlusCircle className="text-[24px]" />
              <p className="hidden md:flex">Add new personnel</p>
            </button>
          </div>
        </div>
      )}
    </Main>
  );
}
