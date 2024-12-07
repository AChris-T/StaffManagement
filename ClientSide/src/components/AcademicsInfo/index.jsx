/* eslint-disable react/prop-types */
import { Formik, FieldArray, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { LuPlusCircle } from 'react-icons/lu';
import { academicRecordMutation } from '@/utils/hooks/DashboardMutation';

const getYears = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: currentYear - 1985 + 1 }, (_, i) => 1985 + i);
};

const years = getYears();

export default function Index({ onNext }) {
  const { mutate, isLoading } = academicRecordMutation();
  const userId = localStorage.getItem('userid');

  console.log(userId);
  const validationSchema = Yup.object().shape({
    /* AcedemicRecord: Yup.array().of(
      Yup.object().shape({
        firstName: Yup.string()
          .required('First name is required')
          .min(3, 'Must be at least 3 characters'),
        lastName: Yup.string()
          .required('Last name is required')
          .min(3, 'Must be at least 3 characters'),
        otherNames: Yup.string()
          .required('Last name is required')
          .min(3, 'Must be at least 3 characters'),
        residentialAddress: Yup.string().required(
          'Residential address is required'
        ),
        relationship: Yup.string().required('Relationship is required'),
        phoneNumber: Yup.string().required('Phone number is required'),
      })
    ), */
  });

  return (
    <Formik
      initialValues={{
        id: '',
        AcedemicRecord: [
          {
            qualification: '',
            institutionAttended: '',
            grade: '',
            specialization: '',
            year: '',
          },
        ],
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        const payload = {
          id: userId,
          AcedemicRecord: values.AcedemicRecord,
        };
        console.log(payload);

        mutate(payload, {
          onSuccess: () => {
            toast.success('Acedemic Record submitted successfully!');
            onNext();
            resetForm(); // Reset form on success
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
          <FieldArray name="AcedemicRecord">
            {({ push, remove }) => (
              <div>
                {formik.values.AcedemicRecord.map((_, index) => (
                  <div key={index} className="p-4 mb-6 ">
                    <div className="flex items-center justify-between mb-10">
                      <h3 className="text-2xl font-semibold text-black-700">
                        Academic qualification{' '}
                      </h3>
                      <button
                        onClick={() =>
                          push({
                            qualification: '',
                            institutionAttended: '',
                            grade: '',
                            specialization: '',
                            year: '',
                          })
                        }
                        className="flex items-center gap-2 px-5 py-4 text-xs font-medium border-[1px]  border-blue-100 rounded-xl text-blue-100 md:text-base md:shadow-2xl"
                      >
                        <LuPlusCircle className="text-[24px]" />
                        <p className="hidden md:flex"> Add New</p>
                      </button>
                    </div>
                    {/* First Name */}
                    <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                      <div className="w-full mb-3">
                        <label className="block mb-2 text-sm font-normal text-black-700">
                          Qualification
                        </label>
                        <input
                          type="text"
                          name={`AcedemicRecord[${index}].qualification`}
                          value={
                            formik.values.AcedemicRecord[index].qualification
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="w-full px-4 py-3 bg-blue-300 focus:outline-none"
                          placeholder="Enter your first name"
                        />
                        {formik.touched.AcedemicRecord?.[index]
                          ?.qualification &&
                          formik.errors.AcedemicRecord?.[index]
                            ?.qualification && (
                            <div className="text-sm text-red-500">
                              {
                                formik.errors.AcedemicRecord[index]
                                  .qualification
                              }
                            </div>
                          )}
                      </div>

                      {/* Last Name */}
                      <div className="w-full mb-3">
                        <label className="block mb-2 text-sm font-normal text-black-700">
                          Institution attended{' '}
                        </label>
                        <input
                          type="text"
                          name={`AcedemicRecord[${index}].institutionAttended`}
                          value={
                            formik.values.AcedemicRecord[index]
                              .institutionAttended
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="w-full px-4 py-3 bg-blue-300 focus:outline-none"
                          placeholder="Enter your first name"
                        />
                        {formik.touched.AcedemicRecord?.[index]
                          ?.institutionAttended &&
                          formik.errors.AcedemicRecord?.[index]
                            ?.institutionAttended && (
                            <div className="text-sm text-red-500">
                              {
                                formik.errors.AcedemicRecord[index]
                                  .institutionAttended
                              }
                            </div>
                          )}
                      </div>

                      {/* Add more fields as necessary */}
                      {/* Relationship */}
                      <div className="w-full mb-3">
                        <label className="block mb-2 text-sm font-normal text-black-700">
                          Grade
                        </label>
                        <input
                          type="text"
                          name={`AcedemicRecord[${index}].grade`}
                          value={formik.values.AcedemicRecord[index].grade}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="w-full px-4 py-3 bg-blue-300 focus:outline-none"
                          placeholder="Enter your first name"
                        />
                        {formik.touched.AcedemicRecord?.[index]?.grade &&
                          formik.errors.AcedemicRecord?.[index]?.grade && (
                            <div className="text-sm text-red-500">
                              {formik.errors.AcedemicRecord[index].grade}
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                      <div className="w-full mb-3">
                        <label className="block mb-2 text-sm font-normal text-black-700">
                          Specialization
                        </label>
                        <input
                          type="text"
                          name={`AcedemicRecord[${index}].specialization`}
                          value={
                            formik.values.AcedemicRecord[index].specialization
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="w-full px-4 py-3 bg-blue-300 focus:outline-none"
                          placeholder="Enter your first name"
                        />
                        {formik.touched.AcedemicRecord?.[index]
                          ?.specialization &&
                          formik.errors.AcedemicRecord?.[index]
                            ?.specialization && (
                            <div className="text-sm text-red-500">
                              {
                                formik.errors.AcedemicRecord[index]
                                  .specialization
                              }
                            </div>
                          )}
                      </div>

                      {/* Relationship */}
                      <div className="w-full mb-3">
                        <label className="block mb-2 text-sm font-normal text-black-700">
                          Year
                        </label>
                        <div>
                          <Field
                            as="select"
                            type="text"
                            name={`AcedemicRecord[${index}].year`}
                            value={formik.values.AcedemicRecord[index].year}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            //name="year"
                            className="w-full px-4 py-3 bg-blue-300 focus:outline-none"
                          >
                            <option value="">-- Select Year --</option>
                            {years.map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </Field>
                        </div>
                        {formik.touched.AcedemicRecord?.[index]?.year &&
                          formik.errors.AcedemicRecord?.[index]?.year && (
                            <div className="text-sm text-red-500">
                              {formik.errors.AcedemicRecord[index].year}
                            </div>
                          )}
                      </div>
                    </div>
                    {index === 0 ? null : (
                      <button
                        type="button"
                        className="p-2 mt-2 text-white bg-red-500 rounded"
                        onClick={() => remove(index)}
                        disabled={formik.values.AcedemicRecord.length === 1}
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
            <button
              type="submit"
              className={`w-[250px] flex justify-center text-white-100 items-center py-2 px-4 bg-blue-dark text-white rounded-lg 
        }`}
            >
              Previous
            </button>
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
