import { useState } from "react";

export default function useMultiForm(steps: number, startIndex: number) {
  const [currentStep, setCurrentStep] = useState(startIndex || 0);

  function next() {
    setCurrentStep((prev) => {
      if (prev >= steps) return prev;
      return prev + 1;
    });
  }

  function back() {
    setCurrentStep((prev) => {
      if (prev <= 0) return prev;
      return prev - 1;
    });
  }

  function goTo(index: number) {
    setCurrentStep(index);
  }

  return {
    currentStep,
    goTo,
    next,
    back,
    steps,
  };
}
