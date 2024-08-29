import React from 'react';

interface FormFieldProps {
  label: string;
  value: number | '';
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  min?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, value, onChange, type, min }) => {
  return (
    <div className='form-field'>
      <label>{label}</label>
      <input type={type} value={value} onChange={onChange} min={min} />
    </div>
  );
};

export default FormField;
