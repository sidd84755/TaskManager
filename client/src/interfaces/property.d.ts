import { BaseKey } from '@pankod/refine-core';

export interface FormFieldProp {
  title: string,
  labelName: string
}

export interface FormValues {
    title: string,
    description: string,
    taskType: string,
    collaborators: string,
    deadline: number | undefined,
}

export interface PropertyCardProps {
  id?: BaseKey | undefined,
  title: string,
  collaborators: string,
  deadline: string,
  photo: string,
  taskType: string,
}
