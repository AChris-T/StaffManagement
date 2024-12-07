/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { deploymentRecordMutation } from '@/utils/hooks/DashboardMutation';

export default function index({ onNext }) {
  const { mutate, isLoading } = deploymentRecordMutation();

  const userId = localStorage.getItem('userid');
  console.log(userId);

  const formik = useFormik({
    initialValues: {
      id: '',
      division: '',
      nameOfPosting: '',
      datePosted: '',
      positionHeld: '',
    },

    validationSchema: Yup.object({
      division: Yup.string()
        .required('Division is required')
        .min(2, 'Division must be at least 2 characters')
        .max(50, 'Division cannot exceed 50 characters'),
      nameOfPosting: Yup.string()
        .required('Name of Posting is required')
        .min(3, 'Name of Posting must be at least 3 characters')
        .max(100, 'Name of Posting cannot exceed 100 characters'),
      datePosted: Yup.date()
        .required('Date Posted is required')
        .max(new Date(), 'Date Posted cannot be in the future'),
      positionHeld: Yup.string()
        .required('Position Held is required')
        .min(2, 'Position Held must be at least 2 characters')
        .max(50, 'Position Held cannot exceed 50 characters'),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log('hello');

      const payload = {
        id: userId,
        deploymentRecord: {
          division: values.division,
          nameOfPosting: values.nameOfPosting,
          datePosted: '2020',
          positionHeld: 'ksdj',
        },
      };

      const formData = new FormData();

      formData.append('payload', JSON.stringify(payload));
      mutate(payload, {
        onSuccess: () => {
          toast.success('Deployment Record save successfully!');
          onNext();
          resetForm();
        },
        onError: (error) => {
          error(error);
          toast.error(error);
        },
      });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="py-6 mx-auto popins ">
      <h3 className="mb-8 text-2xl font-semibold text-black-700">
        Service record{' '}
      </h3>
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="w-full mb-4 ">
          <label className="block mb-2 text-sm font-normal text-black-700">
            Division
          </label>
          <input
            name="division"
            type="text"
            onBlur={formik.handleBlur}
            value={formik.values.division}
            onChange={(e) => {
              formik.handleChange(e);
            }}
            placeholder="division"
            className="w-full px-4 py-3 bg-blue-300 text-white-800 focus:outline-none"
          />
          {formik.touched.division && formik.errors.division && (
            <div className="mt-1 text-sm text-red-500">
              {formik.errors.division}
            </div>
          )}
        </div>
        <div className="w-full mb-4 ">
          <label className="block mb-2 text-sm font-normal text-black-700">
            Name Of Posting
          </label>
          <input
            name="nameOfPosting"
            type="text"
            onBlur={formik.handleBlur}
            value={formik.values.nameOfPosting}
            onChange={(e) => {
              formik.handleChange(e);
            }}
            placeholder="name of posting"
            className="w-full px-4 py-3 bg-blue-300 text-white-800 focus:outline-none"
          />
          {formik.touched.nameOfPosting && formik.errors.nameOfPosting && (
            <div className="mt-1 text-sm text-red-500">
              {formik.errors.nameOfPosting}
            </div>
          )}
        </div>
        <div className="w-full mb-4 ">
          <label className="block mb-2 text-sm font-normal text-black-700">
            Date Posted
          </label>
          <input
            name="datePosted"
            type="date"
            onBlur={formik.handleBlur}
            value={formik.values.datePosted}
            onChange={(e) => {
              formik.handleChange(e);
            }}
            placeholder="date posted"
            className="w-full px-4 py-3 bg-blue-300 text-white-800 focus:outline-none"
          />
          {formik.touched.datePosted && formik.errors.datePosted && (
            <div className="mt-1 text-sm text-red-500">
              {formik.errors.datePosted}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="w-full mb-4 ">
          <label className="block mb-2 text-sm font-normal text-black-700">
            Position Held{' '}
          </label>
          <input
            name="positionHeld"
            type="text"
            onBlur={formik.handleBlur}
            value={formik.values.positionHeld}
            onChange={(e) => {
              formik.handleChange(e);
            }}
            placeholder="Position Held"
            className="w-full px-4 py-3 bg-blue-300 text-white-800 focus:outline-none"
          />
          {formik.touched.positionHeld && formik.errors.positionHeld && (
            <div className="mt-1 text-sm text-red-500">
              {formik.errors.positionHeld}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center w-full gap-3 mt-10">
        <button
          type=""
          disabled
          className={`w-[250px] flex  justify-center text-white-800 items-center py-2 px-4 font-bold border-[2px] border-white-800 text-white rounded-lg 
        }`}
        >
          Previous
        </button>
        <button
          type="submit"
          className={`w-[250px] flex justify-center text-white-200 items-center py-2 px-4 bg-blue-dark text-white rounded-lg 
        }`}
        >
          {isLoading ? 'Submitting' : 'Next'}
        </button>
      </div>
    </form>
  );
}
