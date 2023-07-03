import React from "react";
import { useField } from "formik";

const TextField = ({ label, ...props }) => {
  const { fieldClass, labelClass, inputClass, name, type } = props;
  const [field, { error, touched }] = useField(props);

  return (
    <div className={fieldClass}>
      <label className={labelClass} htmlFor={name}>
        {label}
      </label>
      <input className={inputClass} {...field} name={name} type={type} />
      {error != null && touched && (
        <span className="text-discord-red text-xs">{error}</span>
      )}
    </div>
  );
};

export default TextField;
