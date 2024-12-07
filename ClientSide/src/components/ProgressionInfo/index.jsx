/* eslint-disable react/prop-types */
import { Formik, FieldArray, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { progressionRecordMutation } from '@/utils/hooks/DashboardMutation';
import { LuPlusCircle } from 'react-icons/lu';

const getYears = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: currentYear - 1985 + 1 }, (_, i) => 1985 + i);
};

const years = getYears();

const ranks = [
  'CA III',
  'CA II',
  'CA I',
  'AIC',
  'SCA',
  'CCA',
  'IC',
  'SIC',
  'ASC I',
  'PIC',
  'ASC II',
  'DSC',
  'SC',
  'CSC',
  'AC',
  'DC',
  'CC',
];

const levels = [
  'Level 3',
  'Level 4',
  'Level 5',
  'Level 6',
  'Level 7',
  'Level 8',
  'Level 9',
  'Level 10',
  'Level 11',
  'Level 12',
  'Level 13',
  'Level 14',
  'Level 15',
  'Level 16',
];

export default function Index({ onNext }) {
  const { mutate, isLoading } = progressionRecordMutation();
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
        id: '674ce671fcb585acbf920432',
        progression: [
          {
            rank: '',
            gradeLevel: '',
            type: '',
            year: '',
          },
        ],
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        const payload = {
          id: userId,
          progression: values.progression,
        };
        console.log(payload);

        mutate(payload, {
          onSuccess: () => {
            toast.success('Progression Record submitted successfully!');
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
          <FieldArray name="progression">
            {({ push, remove }) => (
              <div>
                {formik.values.progression.map((_, index) => (
                  <div key={index} className="p-4 mb-6 ">
                    <div className="flex items-center justify-between mb-10">
                      <h3 className="text-2xl font-semibold text-black-700">
                        Progression{' '}
                      </h3>
                      <button
                        onClick={() =>
                          push({
                            rank: '',
                            gradeLevel: '',
                            type: '',
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
                          Rank
                        </label>
                        <Field
                          as="select"
                          type="text"
                          name={`progression[${index}].rank`}
                          value={formik.values.progression[index].rank}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          //name="year"
                          className="w-full px-4 py-3 bg-blue-300 focus:outline-none"
                        >
                          <option value="">-- Select rank --</option>
                          {ranks.map((rank) => (
                            <option key={rank} value={rank}>
                              {rank}
                            </option>
                          ))}
                        </Field>
                        {formik.touched.progression?.[index]?.qualification &&
                          formik.errors.progression?.[index]?.qualification && (
                            <div className="text-sm text-red-500">
                              {formik.errors.progression[index].qualification}
                            </div>
                          )}
                      </div>

                      {/* Last Name */}
                      <div className="w-full mb-3">
                        <label className="block mb-2 text-sm font-normal text-black-700">
                          Grade level
                        </label>
                        <Field
                          as="select"
                          type="text"
                          name={`progression[${index}].gradeLevel`}
                          value={formik.values.progression[index].gradeLevel}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="w-full px-4 py-3 bg-blue-300 focus:outline-none"
                        >
                          <option value="">-- Select level --</option>
                          {levels.map((level) => (
                            <option key={level} value={level}>
                              {level}
                            </option>
                          ))}
                        </Field>
                        {formik.touched.progression?.[index]?.gradeLevel &&
                          formik.errors.progression?.[index]?.gradeLevel && (
                            <div className="text-sm text-red-500">
                              {formik.errors.progression[index].gradeLevel}
                            </div>
                          )}
                      </div>

                      {/* Add more fields as necessary */}
                      {/* Relationship */}
                      <div className="w-full mb-3">
                        <label className="block mb-2 text-sm font-normal text-black-700">
                          Type
                        </label>
                        <input
                          type="text"
                          name={`progression[${index}].type`}
                          value={formik.values.progression[index].type}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="w-full px-4 py-3 bg-blue-300 focus:outline-none"
                          placeholder="type"
                        />

                        {formik.touched.progression?.[index]?.type &&
                          formik.errors.progression?.[index]?.type && (
                            <div className="text-sm text-red-500">
                              {formik.errors.progression[index].type}
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                      {/* Relationship */}
                      <div className="w-full mb-3">
                        <label className="block mb-2 text-sm font-normal text-black-700">
                          Year{' '}
                        </label>
                        <div>
                          <Field
                            as="select"
                            type="text"
                            name={`progression[${index}].year`}
                            value={formik.values.progression[index].year}
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
                        {formik.touched.progression?.[index]?.year &&
                          formik.errors.progression?.[index]?.year && (
                            <div className="text-sm text-red-500">
                              {formik.errors.progression[index].year}
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
