import { useState } from 'react';
import { useGetIdentity } from '@pankod/refine-core';
import { FieldValues, useForm } from '@pankod/refine-react-hook-form';
import Form from 'components/common/Form';

const EditTask = () => {
  const { data: user } = useGetIdentity();
  const [taskImage, setTaskImage] = useState({ name: '', url: '' });
  const { refineCore: { onFinish, formLoading }, register, handleSubmit } = useForm();

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) => new Promise<string>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.readAsDataURL(readFile);
    });

    reader(file).then((result: string) => setTaskImage({ name: file?.name, url: result }));
  };

  const onFinishHandler = async (data: FieldValues) => {
    if (!taskImage.name) return alert('Please upload a property image');

    await onFinish({ ...data, photo: taskImage.url, email: user.email });
  };

  return (
    <Form
      type="Edit"
      register={register}
      onFinish={onFinish}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange}
      onFinishHandler={onFinishHandler}
      taskImage={taskImage}
    />
  );
};

export default EditTask;
