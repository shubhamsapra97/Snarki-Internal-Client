import React from 'react';
import './AnimatedTextInput.css';

const AnimatedTextInput = ({
  id,
  label,
  value = '',
  type = 'text',
  required = false,
  formikInstance = {},
  ...rest
}) => {
  const touched = formikInstance.touched && formikInstance.touched[id];
  const errors = formikInstance.errors && formikInstance.errors[id];

  return (
    <div className={`
      input-container
      ${touched && errors ? "input-container-error" : ''}
    `}>
      <input id={label} type={type} {...rest} />
      <label className={value && 'filled'} htmlFor={label}>
        {label}
        {required && <span> *</span>}
        <span className="input-errors">{
          touched && errors ?
          formikInstance.errors[id]
          : null
        }</span>
      </label>
    </div>
  );
}

export default AnimatedTextInput;
