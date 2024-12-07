/* eslint-disable react/prop-types */
import { Formik, FieldArray } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { nextofKinMutation } from '@/utils/hooks/DashboardMutation';
import { LuPlusCircle } from 'react-icons/lu';

export default function Index({ onNext }) {
  const { mutate, isLoading } = nextofKinMutation();
  const userId = localStorage.getItem('userid');
  console.log(userId);
  const validationSchema = Yup.object().shape({
    nextOfKin: Yup.array().of(
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
        phoneNumber: Yup.string()
          .matches(
            /^0(70|80|81|90|91|701|702|703|704|705|706|707|708|709|802|803|804|805|806|807|808|809|810|811|812|813|814|815|816|817|818|819|909|901|902|903|904|905|906|907|908|915|916|917|918)\d{7}$/,
            'Invalid Nigerian phone number'
          )
          .required('Phone number is required'),
      })
    ),
  });

  return (
    <Formik
      initialValues={{
        id: '', // Example static ID
        nextOfKin: [
          {
            firstName: '',
            lastName: '',
            otherNames: '',
            residentialAddress: '',
            relationship: '',
            phoneNumber: '',
          },
        ],
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        const payload = {
          id: userId,
          nextOfKin: values.nextOfKin,
        };
        console.log(payload);

        mutate(payload, {
          onSuccess: () => {
            toast.success('Next of Kin details submitted successfully!');
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
          <h3 className="mb-8 text-2xl font-semibold text-black-700">
            Next of Kin Information
          </h3>

          <FieldArray name="nextOfKin">
            {({ push, remove }) => (
              <div>
                {formik.values.nextOfKin.map((_, index) => (
                  <div key={index} className="p-4 mb-6 ">
                    <div className="flex items-center justify-between mb-10">
                      <h4 className="mb-4 text-lg font-semibold">
                        Next of Kin
                      </h4>
                      {index >= 1 ? null : (
                        <button
                          onClick={() =>
                            push({
                              firstName: '',
                              lastName: '',
                              otherNames: '',
                              residentialAddress: '',
                              relationship: '',
                              phoneNumber: '',
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
                          First Name
                        </label>
                        <input
                          type="text"
                          name={`nextOfKin[${index}].firstName`}
                          value={formik.values.nextOfKin[index].firstName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="w-full px-4 py-3 bg-blue-300 focus:outline-none"
                          placeholder="Enter your first name"
                        />
                        {formik.touched.nextOfKin?.[index]?.firstName &&
                          formik.errors.nextOfKin?.[index]?.firstName && (
                            <div className="text-sm text-red-500">
                              {formik.errors.nextOfKin[index].firstName}
                            </div>
                          )}
                      </div>

                      {/* Last Name */}
                      <div className="w-full mb-3">
                        <label className="block mb-2 text-sm font-normal text-black-700">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name={`nextOfKin[${index}].lastName`}
                          value={formik.values.nextOfKin[index].lastName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="w-full px-4 py-3 bg-blue-300 focus:outline-none"
                          placeholder="Enter your first name"
                        />
                        {formik.touched.nextOfKin?.[index]?.lastName &&
                          formik.errors.nextOfKin?.[index]?.lastName && (
                            <div className="text-sm text-red-500">
                              {formik.errors.nextOfKin[index].lastName}
                            </div>
                          )}
                      </div>

                      {/* Add more fields as necessary */}
                      {/* Relationship */}
                      <div className="w-full mb-3">
                        <label className="block mb-2 text-sm font-normal text-black-700">
                          other Names
                        </label>
                        <input
                          type="text"
                          name={`nextOfKin[${index}].otherNames`}
                          value={formik.values.nextOfKin[index].otherNames}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="w-full px-4 py-3 bg-blue-300 focus:outline-none"
                          placeholder="Enter your first name"
                        />
                        {formik.touched.nextOfKin?.[index]?.otherNames &&
                          formik.errors.nextOfKin?.[index]?.otherNames && (
                            <div className="text-sm text-red-500">
                              {formik.errors.nextOfKin[index].otherNames}
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                      <div className="w-full mb-3">
                        <label className="block mb-2 text-sm font-normal text-black-700">
                          Residential Address
                        </label>
                        <input
                          type="text"
                          name={`nextOfKin[${index}].residentialAddress`}
                          value={
                            formik.values.nextOfKin[index].residentialAddress
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="w-full px-4 py-3 bg-blue-300 focus:outline-none"
                          placeholder="Enter your first name"
                        />
                        {formik.touched.nextOfKin?.[index]
                          ?.residentialAddress &&
                          formik.errors.nextOfKin?.[index]
                            ?.residentialAddress && (
                            <div className="text-sm text-red-500">
                              {
                                formik.errors.nextOfKin[index]
                                  .residentialAddress
                              }
                            </div>
                          )}
                      </div>

                      {/* Last Name */}
                      <div className="w-full mb-3">
                        <label className="block mb-2 text-sm font-normal text-black-700">
                          Phone Number
                        </label>
                        <input
                          type="phoneNumber"
                          name={`nextOfKin[${index}].phoneNumber`}
                          value={formik.values.nextOfKin[index].phoneNumber}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="w-full px-4 py-3 bg-blue-300 focus:outline-none"
                          placeholder="Enter your first name"
                        />
                        {formik.touched.nextOfKin?.[index]?.phoneNumber &&
                          formik.errors.nextOfKin?.[index]?.phoneNumber && (
                            <div className="text-sm text-red-500">
                              {formik.errors.nextOfKin[index].phoneNumber}
                            </div>
                          )}
                      </div>

                      {/* Add more fields as necessary */}
                      {/* Relationship */}
                      <div className="w-full mb-3">
                        <label className="block mb-2 text-sm font-normal text-black-700">
                          Relationship
                        </label>
                        <input
                          type="text"
                          name={`nextOfKin[${index}].relationship`}
                          value={formik.values.nextOfKin[index].relationship}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="w-full px-4 py-3 bg-blue-300 focus:outline-none"
                          placeholder="Enter your first name"
                        />
                        {formik.touched.nextOfKin?.[index]?.relationship &&
                          formik.errors.nextOfKin?.[index]?.relationship && (
                            <div className="text-sm text-red-500">
                              {formik.errors.nextOfKin[index].relationship}
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
