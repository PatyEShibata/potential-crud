import React from 'react';
import '../styles/input.css'

const Input = (props) => {
  const { label, value, name, type, error, placeholder, onChange } = props;
  return(
    <div className="field">
      <label for={name} className={error ? "label-error" : ''}> {label} </label>
      <input
        id={name}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className={error ? "input-error" : ''}
      />
      {error && <span className="error">{error}</span>}
    </div>
  )
}

export default Input;