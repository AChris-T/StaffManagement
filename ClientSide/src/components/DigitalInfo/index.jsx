/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  digitalFilesMutation,
  useFileUploadMutation,
} from '@/utils/hooks/DashboardMutation';
import { useFormik } from 'formik';
import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import {
  MdCheckCircle,
  MdDeleteForever,
  MdOutlineCloudUpload,
} from 'react-icons/md';
import { toast } from 'react-toastify';

export default function FileUploader({ onNext }) {
  const uploadFileMutation = useFileUploadMutation();
  const { mutate, isLoading } = digitalFilesMutation();
  const [fileUploads, setFileUploads] = useState({});
  const userId = localStorage.getItem('userid');

  const handleFileChanges = (event, fieldName) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      const updatedUploads = { ...fileUploads };

      files.forEach((file) => {
        const fileId = `${fieldName}-${file.name}-${Date.now()}`;
        updatedUploads[fileId] = {
          progress: 0,
          status: 'uploading',
          name: file.name,
        };

        const formData = new FormData();
        formData.append('file', file);

        uploadFileMutation.mutate(file, {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setFileUploads((prev) => ({
              ...prev,
              [fileId]: { ...prev[fileId], progress },
            }));
          },
          onSuccess: (uploadedFileUrl) => {
            setFileUploads((prev) => ({
              ...prev,
              [fileId]: { progress: 100, status: 'success' },
            }));

            // Push the uploadedFileUrl into Formik values
            formik.setFieldValue(fieldName, [
              ...formik.values[fieldName],
              uploadedFileUrl,
            ]);

            toast.success(`File "${file.name}" uploaded successfully!`);
          },
          onError: () => {
            setFileUploads((prev) => ({
              ...prev,
              [fileId]: { progress: 100, status: 'error' },
            }));
            toast.error(`File "${file.name}" upload failed.`);
          },
        });
      });

      setFileUploads(updatedUploads);
    }
  };

  const formik = useFormik({
    initialValues: {
      appointmentLetters: [],
      educationalQualifications: [],
      ippisDocuments: [],
      confirmationLetters: [],
      promotionLetters: [],
      trainingCertificates: [],
    },
    onSubmit: (values, { resetForm }) => {
      const payload = {
        id: userId,
        digitalFiles: {
          appointmentLetters: 'thksbd',
          educationalQualifications: 'thksbd',
          ippisDocuments: 'thksbd',
          confirmationLetters: 'thksbd',
          promotionLetters: 'thksbd',
          trainingCertificates: 'thksbd',
        },
      };

      mutate(payload, {
        onSuccess: () => {
          toast.success('Files submitted successfully!');
          onNext();
          resetForm();
        },
        onError: (error) => {
          toast.error(error.message || 'Submission failed.');
        },
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="py-6 mx-auto popins">
      <h3 className="mb-8 text-2xl font-semibold text-black-700">
        Digital Files Upload
      </h3>

      {/* Appointment Letters */}
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="w-full mb-6">
          <label className="block mb-4 text-sm popins text-black-700">
            Upload all copies of appointment letters
          </label>
          <div className="flex w-full p-4 bg-blue-200 ">
            <div className="px-4 border-2 h-[190px] w-[176px] border-gray-300 border-dashed rounded-lg bg-gray-50">
              <div className="flex flex-col py-[36px]  items-center justify-center text-blue-600 cursor-pointer hover:text-blue-800">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,"
                  multiple
                  onChange={(e) => handleFileChanges(e, 'appointmentLetters')}
                  className="hidden"
                  id="appointmentLetters"
                />
                <div className="w-10 flex justify-center items-center mb-5 h-10 rounded-lg border-[1px] border-[#94A3B833]">
                  <MdOutlineCloudUpload />
                </div>

                <label
                  htmlFor="appointmentLetters"
                  className="flex flex-col items-center space-x-2"
                >
                  <span className="text-xs text-blue-100 font-edium">
                    Click to upload
                  </span>
                  <span className="text-[#16161680] text-xs font-normal text-center">
                    SVG, PNG, JPG or GIF(max. 800x400px)
                  </span>
                </label>
              </div>
            </div>

            <div className="w-full mt-4">
              {Object.entries(fileUploads)
                .filter(([key]) => key.startsWith('appointmentLetters'))
                .map(([key, file]) => (
                  <div
                    key={key}
                    className="flex items-center w-full px-3 space-x-3 "
                  >
                    <div className="w-full">
                      <span className="block text-sm font-medium text-gray-700 truncate">
                        {file.name}
                      </span>
                      <div className="w-full h-1 mt-1 bg-gray-200 rounded-full">
                        <div
                          className={`h-full w-full rounded-full ${
                            file.status === 'success'
                              ? 'bg-green-500'
                              : file.status === 'error'
                              ? 'bg-red-500'
                              : 'bg-blue-500'
                          }`}
                          style={{ width: `${file.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    {file.status === 'success' ? (
                      <span className="text-green-500 material-icons">
                        <MdCheckCircle />
                      </span>
                    ) : file.status === 'error' ? (
                      <span className="text-red-500 material-icons">
                        <MdDeleteForever />
                      </span>
                    ) : (
                      <span className="text-gray-500">{file.progress}%</span>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="w-full mb-6">
          <label className="block mb-4 text-sm popins text-black-700">
            Upload all copies of educational Qualifications
          </label>
          <div className="flex w-full p-4 bg-blue-200 ">
            <div className="px-4 border-2 h-[190px] w-[176px] border-gray-300 border-dashed rounded-lg bg-gray-50">
              <div className="flex flex-col py-[36px]  items-center justify-center text-blue-600 cursor-pointer hover:text-blue-800">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,"
                  multiple
                  onChange={(e) =>
                    handleFileChanges(e, 'educationalQualifications')
                  }
                  className="hidden"
                  id="educationalQualifications"
                />
                <div className="w-10 flex justify-center items-center mb-5 h-10 rounded-lg border-[1px] border-[#94A3B833]">
                  <MdOutlineCloudUpload />
                </div>

                <label
                  htmlFor="educationalQualifications"
                  className="flex flex-col items-center space-x-2"
                >
                  <span className="text-xs text-blue-100 font-edium">
                    Click to upload
                  </span>
                  <span className="text-[#16161680] text-xs font-normal text-center">
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </span>
                </label>
              </div>
            </div>

            <div className="w-full mt-4 ">
              {Object.entries(fileUploads)
                .filter(([key]) => key.startsWith('educationalQualifications'))
                .map(([key, file]) => (
                  <div
                    key={key}
                    className="flex items-center w-full px-3 space-x-3 "
                  >
                    <div className="w-full">
                      <span className="block text-sm font-medium text-gray-700 truncate">
                        {file.name}
                      </span>
                      <div className="w-full h-1 mt-1 bg-gray-200 rounded-full">
                        <div
                          className={`h-full w-full rounded-full ${
                            file.status === 'success'
                              ? 'bg-green-500'
                              : file.status === 'error'
                              ? 'bg-red-500'
                              : 'bg-blue-500'
                          }`}
                          style={{ width: `${file.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    {file.status === 'success' ? (
                      <span className="text-green-500 material-icons">
                        <MdCheckCircle />
                      </span>
                    ) : file.status === 'error' ? (
                      <span className="text-red-500 material-icons">
                        <MdDeleteForever />
                      </span>
                    ) : (
                      <span className="text-gray-500">{file.progress}%</span>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="w-full mb-6">
          <label className="block mb-4 text-sm popins text-black-700">
            Upload all copies of ippisDocuments
          </label>
          <div className="flex w-full p-4 bg-blue-200 ">
            <div className="px-4 border-2 h-[190px] w-[176px] border-gray-300 border-dashed rounded-lg bg-gray-50">
              <div className="flex flex-col py-[36px]  items-center justify-center text-blue-600 cursor-pointer hover:text-blue-800">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,"
                  multiple
                  onChange={(e) => handleFileChanges(e, 'ippisDocuments')}
                  className="hidden"
                  id="ippisDocuments"
                />
                <div className="w-10 flex justify-center items-center mb-5 h-10 rounded-lg border-[1px] border-[#94A3B833]">
                  <MdOutlineCloudUpload />
                </div>

                <label
                  htmlFor="ippisDocuments"
                  className="flex flex-col items-center space-x-2"
                >
                  <span className="text-xs text-blue-100 font-edium">
                    Click to upload
                  </span>
                  <span className="text-[#16161680] text-xs font-normal text-center">
                    SVG, PNG, JPG or GIF(max. 800x400px)
                  </span>
                </label>
              </div>
            </div>

            <div className="w-full mt-4">
              {Object.entries(fileUploads)
                .filter(([key]) => key.startsWith('ippisDocuments'))
                .map(([key, file]) => (
                  <div
                    key={key}
                    className="flex items-center w-full px-3 space-x-3 "
                  >
                    <div className="w-full">
                      <span className="block text-sm font-medium text-gray-700 truncate">
                        {file.name}
                      </span>
                      <div className="w-full h-1 mt-1 bg-gray-200 rounded-full">
                        <div
                          className={`h-full w-full rounded-full ${
                            file.status === 'success'
                              ? 'bg-green-500'
                              : file.status === 'error'
                              ? 'bg-red-500'
                              : 'bg-blue-500'
                          }`}
                          style={{ width: `${file.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    {file.status === 'success' ? (
                      <span className="text-green-500 material-icons">
                        <MdCheckCircle />
                      </span>
                    ) : file.status === 'error' ? (
                      <span className="text-red-500 material-icons">
                        <MdDeleteForever />
                      </span>
                    ) : (
                      <span className="text-gray-500">{file.progress}%</span>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="w-full mb-6">
          <label className="block mb-4 text-sm popins text-black-700">
            Upload all copies of confirmation Letters
          </label>
          <div className="flex w-full p-4 bg-blue-200 ">
            <div className="px-4 border-2 h-[190px] w-[176px] border-gray-300 border-dashed rounded-lg bg-gray-50">
              <div className="flex flex-col py-[36px]  items-center justify-center text-blue-600 cursor-pointer hover:text-blue-800">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,"
                  multiple
                  onChange={(e) => handleFileChanges(e, 'confirmationLetters')}
                  className="hidden"
                  id="confirmationLetters"
                />
                <div className="w-10 flex justify-center items-center mb-5 h-10 rounded-lg border-[1px] border-[#94A3B833]">
                  <MdOutlineCloudUpload />
                </div>

                <label
                  htmlFor="confirmationLetters"
                  className="flex flex-col items-center space-x-2"
                >
                  <span className="text-xs text-blue-100 font-edium">
                    Click to upload
                  </span>
                  <span className="text-[#16161680] text-xs font-normal text-center">
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </span>
                </label>
              </div>
            </div>

            <div className="w-full mt-4 ">
              {Object.entries(fileUploads)
                .filter(([key]) => key.startsWith('confirmationLetters'))
                .map(([key, file]) => (
                  <div
                    key={key}
                    className="flex items-center w-full px-3 space-x-3 "
                  >
                    <div className="w-full">
                      <span className="block text-sm font-medium text-gray-700 truncate">
                        {file.name}
                      </span>
                      <div className="w-full h-1 mt-1 bg-gray-200 rounded-full">
                        <div
                          className={`h-full w-full rounded-full ${
                            file.status === 'success'
                              ? 'bg-green-500'
                              : file.status === 'error'
                              ? 'bg-red-500'
                              : 'bg-blue-500'
                          }`}
                          style={{ width: `${file.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    {file.status === 'success' ? (
                      <span className="text-green-500 material-icons">
                        <MdCheckCircle />
                      </span>
                    ) : file.status === 'error' ? (
                      <span className="text-red-500 material-icons">
                        <MdDeleteForever />
                      </span>
                    ) : (
                      <span className="text-gray-500">{file.progress}%</span>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="w-full mb-6">
          <label className="block mb-4 text-sm popins text-black-700">
            Upload all copies of Promotion Letters
          </label>
          <div className="flex w-full p-4 bg-blue-200 ">
            <div className="px-4 border-2 h-[190px] w-[176px] border-gray-300 border-dashed rounded-lg bg-gray-50">
              <div className="flex flex-col py-[36px]  items-center justify-center text-blue-600 cursor-pointer hover:text-blue-800">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,"
                  multiple
                  onChange={(e) => handleFileChanges(e, 'promotionLetters')}
                  className="hidden"
                  id="promotionLetters"
                />
                <div className="w-10 flex justify-center items-center mb-5 h-10 rounded-lg border-[1px] border-[#94A3B833]">
                  <MdOutlineCloudUpload />
                </div>

                <label
                  htmlFor="promotionLetters"
                  className="flex flex-col items-center space-x-2"
                >
                  <span className="text-xs text-blue-100 font-edium">
                    Click to upload
                  </span>
                  <span className="text-[#16161680] text-xs font-normal text-center">
                    SVG, PNG, JPG or GIF(max. 800x400px)
                  </span>
                </label>
              </div>
            </div>

            <div className="w-full mt-4">
              {Object.entries(fileUploads)
                .filter(([key]) => key.startsWith('promotionLetters'))
                .map(([key, file]) => (
                  <div
                    key={key}
                    className="flex items-center w-full px-3 space-x-3 "
                  >
                    <div className="w-full">
                      <span className="block text-sm font-medium text-gray-700 truncate">
                        {file.name}
                      </span>
                      <div className="w-full h-1 mt-1 bg-gray-200 rounded-full">
                        <div
                          className={`h-full w-full rounded-full ${
                            file.status === 'success'
                              ? 'bg-green-500'
                              : file.status === 'error'
                              ? 'bg-red-500'
                              : 'bg-blue-500'
                          }`}
                          style={{ width: `${file.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    {file.status === 'success' ? (
                      <span className="text-green-500 material-icons">
                        <MdCheckCircle />
                      </span>
                    ) : file.status === 'error' ? (
                      <span className="text-red-500 material-icons">
                        <MdDeleteForever />
                      </span>
                    ) : (
                      <span className="text-gray-500">{file.progress}%</span>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="w-full mb-6">
          <label className="block mb-4 text-sm popins text-black-700">
            Upload all copies of Training Certificates
          </label>
          <div className="flex w-full p-4 bg-blue-200 ">
            <div className="px-4 border-2 h-[190px] w-[176px] border-gray-300 border-dashed rounded-lg bg-gray-50">
              <div className="flex flex-col py-[36px]  items-center justify-center text-blue-600 cursor-pointer hover:text-blue-800">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,"
                  multiple
                  onChange={(e) => handleFileChanges(e, 'trainingCertificates')}
                  className="hidden"
                  id="trainingCertificates"
                />
                <div className="w-10 flex justify-center items-center mb-5 h-10 rounded-lg border-[1px] border-[#94A3B833]">
                  <MdOutlineCloudUpload />
                </div>

                <label
                  htmlFor="trainingCertificates"
                  className="flex flex-col items-center space-x-2"
                >
                  <span className="text-xs text-blue-100 font-edium">
                    Click to upload
                  </span>
                  <span className="text-[#16161680] text-xs font-normal text-center">
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </span>
                </label>
              </div>
            </div>

            <div className="w-full mt-4 ">
              {Object.entries(fileUploads)
                .filter(([key]) => key.startsWith('trainingCertificates'))
                .map(([key, file]) => (
                  <div
                    key={key}
                    className="flex items-center w-full px-3 space-x-3 "
                  >
                    <div className="w-full">
                      <span className="block text-sm font-medium text-gray-700 truncate">
                        {file.name}
                      </span>
                      <div className="w-full h-1 mt-1 bg-gray-200 rounded-full">
                        <div
                          className={`h-full w-full rounded-full ${
                            file.status === 'success'
                              ? 'bg-green-500'
                              : file.status === 'error'
                              ? 'bg-red-500'
                              : 'bg-blue-500'
                          }`}
                          style={{ width: `${file.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    {file.status === 'success' ? (
                      <span className="text-green-500 material-icons">
                        <MdCheckCircle />
                      </span>
                    ) : file.status === 'error' ? (
                      <span className="text-red-500 material-icons">
                        <MdDeleteForever />
                      </span>
                    ) : (
                      <span className="text-gray-500">{file.progress}%</span>
                    )}
                  </div>
                ))}
            </div>
          </div>
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
