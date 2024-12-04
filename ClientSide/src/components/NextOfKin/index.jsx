/* eslint-disable react/prop-types */
import { Formik, FieldArray } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { nextofKinMutation } from '@/utils/hooks/DashboardMutation';

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
        phoneNumber: Yup.string().required('Phone number is required'),
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
                    <h4 className="mb-4 text-lg font-semibold">
                      Next of Kin {index + 1}
                    </h4>

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
                          type="number"
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
                    <button
                      type="button"
                      className="p-2 mt-2 text-white bg-red-500 rounded"
                      onClick={() => remove(index)}
                      disabled={formik.values.nextOfKin.length === 1}
                    >
                      Remove
                    </button>
                  </div>
                ))}

                {/* Add Button */}
                <button
                  type="button"
                  className="px-4 py-2 mt-4 text-white bg-blue-500 rounded"
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
                >
                  Add Next of Kin
                </button>
              </div>
            )}
          </FieldArray>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 px-4 bg-green-500 text-white rounded mt-4`}
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      )}
    </Formik>
  );
}
