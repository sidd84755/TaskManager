/* eslint-disable no-plusplus */
import { FormValues } from 'interfaces/property';

export const validateForm = (formValues: FormValues) => {
  const errors: { message: string } = { message: '' };
  let hasError = false;

  Object.keys(formValues).forEach((key) => {
    switch (key) {
      case 'title':
        if (!formValues.title) {
          errors.message = 'Title is required';
          hasError = true;
        }
        break;

      case 'description':
        if (!formValues.description) {
          errors.message = 'Description is required';
          hasError = true;
        }
        break;

      case 'taskType':
        if (!formValues.taskType) {
          errors.message = 'Task type is required';
          hasError = true;
        }
        break;

      case 'collaborators':
        if (!formValues.collaborators) {
          errors.message = 'Working solo ? Enter solo';
          hasError = true;
        }
        break;

      case 'deadline':
        if (!formValues.deadline) {
          errors.message = 'required';
          hasError = true;
        }
        break;

      default:
        hasError = false;
    }
  });

  return { hasError, errors };
};

export const hasChanged = (initialValues: FormValues, currentValues: FormValues) => {
  const initialValuesArray = Object.values(initialValues);
  const currentValuesArray = Object.values(currentValues);
  for (let i = 0; i < initialValuesArray.length; i++) {
    if (initialValuesArray[i] !== currentValuesArray[i]) {
      return true;
    }
  }
  return false;
};