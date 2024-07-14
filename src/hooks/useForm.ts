/*
TODO:
Можно лучше
Можно сделать универсальный кастомный хук
для контроля любого количества инпутов в любых формах:
export function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
  };
  return {values, handleChange, setValues};
}
Этот код помещают в отдельный файл useForm.js в папке hooks
и импортируют функцию туда, где нужно контролировать инпуты */
import { useState } from 'react';

export function useForm<T>(inputValues: T) {
  const [values, setValues] = useState<T>(inputValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}
