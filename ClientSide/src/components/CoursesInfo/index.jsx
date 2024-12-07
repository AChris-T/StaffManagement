/* eslint-disable react/prop-types */
import { Formik, FieldArray } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { coursesRecordMutation } from '@/utils/hooks/DashboardMutation';
import { LuPlusCircle } from 'react-icons/lu';

export default function Index({ onNext }) {
  const { mutate, isLoading } = coursesRecordMutation();
  const userId = localStorage.getItem('userid');
  console.log(userId);

  const validationSchema = Yup.object().shape({
    coursesAttended: Yup.array().of(
      Yup.object().shape({
        titleOfProgramme: Yup.string()
          .required('title of programme is required')
          .min(3, 'Must be at least 3 characters'),
        organiserFirstName: Yup.string()
          .required('organiser first name is required')
          .min(3, 'Must be at least 3 characters'),
        organiserLastName: Yup.string()
          .required('organiser Last name is required')
          .min(3, 'Must be at least 3 characters'),
      })
    ),
  });

  return (
    <Formik
      initialValues={{
        id: '', // Example static ID
        coursesAttended: [
          {
            titleOfProgramme: '',
            organiserFirstName: '',
            organiserLastName: '',
            location: '',
            date: '',
          },
        ],
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        const payload = {
          id: userId,
          coursesAttended: values.coursesAttended,
        };
        console.log(payload);

        mutate(payload, {
          onSuccess: () => {
            toast.success('User Details submitted successfully!');
            onNext();
            resetForm();
           // Reset form on success
          },
          onError: (error) => {
            console.error('Error:', error);
            toast.error('Failed to submit details. Please try again.');
          },
        });
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit} className="py-6 mx-auto popins">
          <h3 className="mb-8 text-2xl font-semibold text-black-700">
            Courses attended
          </h3>

          <FieldArray name="coursesAttended">
            {({ push, remove }) => (
              <div>
                {formik.values.coursesAttended.map((_, index) => (
                  <div key={index} className="p-4 mb-6 ">
                    <div className="flex items-center justify-between mb-10">
                      <h4 className="mb-4 text-lg font-semibold">
                        Courses Attended
                      </h4>
                      {index >= 1 ? null : (
                        <button
                          onClick={() =>
                            push({
                              titleOfProgramme: '',
                              organiserFirstName: '',
                              organiserLastName: '',
                              location: '',
                              date: '',
                            })
                          }
                          className="flex items-center gap-2 px-5 py-4 text-xs font-medium border-[1px]  border-blue-100 rounded-xl text-blue-100 md:text-base md:shadow-2xl"
                        >
                          <LuPlusCircle className="text-[24px]" />
                          <p className="hidden md:flex"> Add Next of Kin</p>
                        </button>
                      )}
                    </div>
                    {/* First Name */}
                    <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                      <div className="w-full mb-3">
                        <label className="block mb-2 text-sm font-normal text-black-700">
                          Title of program
                        </label>
                        <input
                          type="text"
                          name={`coursesAttended[${index}].titleOfProgramme`}
                          value={
                            formik.values.coursesAttended[index]
                              .titleOfProgramme
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="w-full px-4 py-3 bg-blue-300 focus:outline-none"
                          placeholder="Enter your first name"
                        />
                        {formik.touched.coursesAttended?.[index]
                          ?.titleOfProgramme &&
                          formik.errors.coursesAttended?.[index]
                            ?.titleOfProgramme && (
                            <div className="text-sm text-red-500">
                              {
                                formik.errors.coursesAttended[index]
                                  .titleOfProgramme
                              }
                            </div>
                          )}
                      </div>

                      {/* Last Name */}
                      <div className="w-full mb-3">
                        <label className="block mb-2 text-sm font-normal text-black-700">
                          Organiser’s first name{' '}
                        </label>
                        <input
                          type="text"
                          name={`coursesAttended[${index}].organiserFirstName`}
                          value={
                            formik.values.coursesAttended[index]
                              .organiserFirstName
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="w-full px-4 py-3 bg-blue-300 focus:outline-none"
                          placeholder="Enter your first name"
                        />
                        {formik.touched.coursesAttended?.[index]
                          ?.organiserFirstName &&
                          formik.errors.coursesAttended?.[index]
                            ?.organiserFirstName && (
                            <div className="text-sm text-red-500">
                              {
                                formik.errors.coursesAttended[index]
                                  .organiserFirstName
                              }
                            </div>
                          )}
                      </div>

                      {/* Add more fields as necessary */}
                      {/* Relationship */}
                      <div className="w-full mb-3">
                        <label className="block mb-2 text-sm font-normal text-black-700">
                          Organiser’s last name{' '}
                        </label>
                        <input
                          type="text"
                          name={`coursesAttended[${index}].organiserLastName`}
                          value={
                            formik.values.coursesAttended[index]
                              .organiserLastName
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="w-full px-4 py-3 bg-blue-300 focus:outline-none"
                          placeholder="Enter your organiser's last name"
                        />
                        {formik.touched.coursesAttended?.[index]
                          ?.organiserLastName &&
                          formik.errorscoursesAttended?.[index]
                            ?.organiserLastName && (
                            <div className="text-sm text-red-500">
                              {
                                formik.errors.coursesAttended[index]
                                  .organiserLastName
                              }
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                      <div className="w-full mb-3">
                        <label className="block mb-2 text-sm font-normal text-black-700">
                          Location
                        </label>
                        <input
                          type="text"
                          name={`coursesAttended[${index}].location`}
                          value={formik.values.coursesAttended[index].location}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="w-full px-4 py-3 bg-blue-300 focus:outline-none"
                          placeholder="Enter your Location"
                        />
                        {formik.touched.coursesAttended?.[index]?.location &&
                          formik.errors.coursesAttended?.[index]?.location && (
                            <div className="text-sm text-red-500">
                              {formik.errors.coursesAttended[index].location}
                            </div>
                          )}
                      </div>

                      {/* Last Name */}
                      <div className="w-full mb-3">
                        <label className="block mb-2 text-sm font-normal text-black-700">
                          Date{' '}
                        </label>
                        <input
                          type="Date"
                          name={`coursesAttended[${index}].date`}
                          value={formik.values.coursesAttended[index].date}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="w-full px-4 py-3 bg-blue-300 focus:outline-none"
                          placeholder="Enter your first name"
                        />
                        {formik.touched.coursesAttended?.[index]?.date &&
                          formik.errors.coursesAttended?.[index]?.date && (
                            <div className="text-sm text-red-500">
                              {formik.errors.coursesAttended[index].date}
                            </div>
                          )}
                      </div>
                    </div>
                    {/* Remove Button */}
                    {index === 0 ? null : (
                      <button
                        type="button"
                        className="p-2 mt-2 text-white bg-red-500 rounded"
                        onClick={() => remove(index)}
                        disabled={formik.values.nextOfKin.length === 1}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}

                {/* Add Button */}
              </div>
            )}
          </FieldArray>

          {/* Submit Button */}
          <div className="flex items-center justify-center w-full gap-3 mt-10">
            <a
              href="#"
              disabled
              className={`w-[250px] cursor-not-allowed flex justify-center text-white-800 border-[2px] border-white-800 items-center py-2 px-4 bg-transparent text-white rounded-lg 
        }`}
            >
              Previous
            </a>
            <button
              type="submit"
              className={`w-[250px] flex justify-center text-white-100 items-center py-2 px-4 bg-blue-dark text-white rounded-lg 
        }`}
            >
              {isLoading ? 'Submitting...' : 'Next'}
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
}
