/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import { FormInfo, NextOfKinForm, Stepper } from '..';

export default function index() {
  const steps = [
    { id: 1, title: 'Personal Info' },
    { id: 2, title: 'Next of Kin' },
    { id: 3, title: 'Service record' },
    { id: 4, title: 'Contact info' },
    { id: 5, title: 'Academics' },
    { id: 6, title: 'Progression' },
    { id: 7, title: 'Deployment' },
    { id: 8, title: 'Digital files' },
    { id: 9, title: 'Courses' },
    { id: 10, title: 'PM' },
  ];

  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = localStorage.getItem('currentStep');
    return savedStep ? parseInt(savedStep, 10) : 1;
  });

  const [isCompleted, setIsCompleted] = useState(() => {
    const savedCompleted = localStorage.getItem('isCompleted');
    return savedCompleted ? JSON.parse(savedCompleted) : {};
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('currentStep', currentStep);
    localStorage.setItem('isCompleted', JSON.stringify(isCompleted));
  }, [currentStep, isCompleted]);

  const handleNextStep = () => {
    setIsCompleted((prev) => ({ ...prev, [currentStep]: true }));
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return <FormInfo onNext={handleNextStep} />;
      case 2:
        return <NextOfKinForm onNext={handleNextStep} />;
      // Add cases for other steps
      default:
        return <h2>All steps completed!</h2>;
    }
  };

  return (
    <div>
      <Stepper
        steps={steps}
        currentStep={currentStep}
        isCompleted={isCompleted}
      />
      {renderForm()}
    </div>
  );
}