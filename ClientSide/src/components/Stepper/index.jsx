import { IoMdCheckmark } from 'react-icons/io';

export default function index({ steps, currentStep, isCompleted }) {
  return (
    <div className="flex items-center justify-between mb-6 overflow-auto popins lg:overflow-visible">
      {steps.map((step) => (
        <div
          key={step.id}
          className="flex items-center justify-between flex-1 min-w-[100px] md:min-w-[100px] lg:min-w-[90px]"
        >
          <div className="flex flex-col items-center">
            <h3
              className={`w-8 h-8 rounded-full flex flex-col justify-center items-center ${
                isCompleted[step.id]
                  ? 'bg-blue-dark text-white-200'
                  : currentStep === step.id
                  ? 'bg-blue-dark text-white-200'
                  : 'bg-transparent border-blue-dark border-[2px] text-blue-dark'
              }`}
            >
              {isCompleted[step.id] ? <IoMdCheckmark /> : step.id}
            </h3>
            <h3 className="flex-1 mt-1 text-xs font-medium text-blue-dark">
              {step.title}
            </h3>
          </div>

          {step.id < steps.length && (
            <div className="flex items-center justify-center flex-1 h-[1px] mx-[0.5px] mb-3 bg-white-900"></div>
          )}
        </div>
      ))}
    </div>
  );
}
