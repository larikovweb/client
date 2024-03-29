import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

export interface StepHelpers {
  goToNextStep: () => void;
  goToPrevStep: () => void;
  reset: () => void;
  canGoToNextStep: boolean;
  canGoToPrevStep: boolean;
  setStep: Dispatch<SetStateAction<number>>;
}

type setStepCallbackType = (step: number | ((step: number) => number)) => void;

export const useStep = (maxStep: number): [number, StepHelpers] => {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const onPopState = (event: PopStateEvent) => {
      if (event.state?.step) {
        setCurrentStep(event.state.step);
      }
    };

    window.addEventListener('popstate', onPopState);
    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  const canGoToNextStep = useMemo(() => currentStep < maxStep, [currentStep, maxStep]);
  const canGoToPrevStep = useMemo(() => currentStep > 1, [currentStep]);

  const setStep = useCallback<setStepCallbackType>(
    (step) => {
      const newStep = step instanceof Function ? step(currentStep) : step;
      if (newStep >= 1 && newStep <= maxStep) {
        setCurrentStep(newStep);
        window.history.pushState({ step: newStep }, '', `?step=${newStep}`);
      } else {
        throw new Error('Step not valid');
      }
    },
    [maxStep, currentStep],
  );

  const goToNextStep = useCallback(() => {
    if (canGoToNextStep) {
      setCurrentStep((step) => {
        const newStep = step + 1;
        window.history.pushState({ step: newStep }, '', `?step=${newStep}`);
        return newStep;
      });
    }
  }, [canGoToNextStep]);

  const goToPrevStep = useCallback(() => {
    if (canGoToPrevStep) {
      setCurrentStep((step) => {
        const newStep = step - 1;
        window.history.pushState({ step: newStep }, '', `?step=${newStep}`);
        return newStep;
      });
    }
  }, [canGoToPrevStep]);

  const reset = useCallback(() => {
    setCurrentStep(1);
    window.history.pushState({ step: 1 }, '', '?step=1');
  }, []);

  return [
    currentStep,
    {
      goToNextStep,
      goToPrevStep,
      canGoToNextStep,
      canGoToPrevStep,
      setStep,
      reset,
    },
  ];
};

// usage
// const [currentStep, helpers] = useStep(5)
// const {
//   canGoToPrevStep,
//   canGoToNextStep,
//   goToNextStep,
//   goToPrevStep,
//   reset,
//   setStep,
// } = helpers
