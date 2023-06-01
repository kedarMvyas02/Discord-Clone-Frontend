import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  avatarFile: Yup.mixed().required("Avatar is required"),
});

const CustomFileInput = ({ field, form }) => {
  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    form.setFieldValue(field.name, file);
  };

  return (
    <div className="relative">
      <input
        type="file"
        id={field.name}
        name={field.name}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      <label
        htmlFor={field.name}
        className="w-16 h-16 rounded-full overflow-hidden border-2 border-dashed border-blue-400 cursor-pointer flex justify-center items-center"
      >
        {field.value ? (
          <img
            src={URL.createObjectURL(field.value)}
            alt="Avatar Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <span
            className="text-blue-400 text-4xl absolute rounded-full -top--1 -right--4 transform translate-x-1/2 -translate-y-1/2 translate-y-0.5 flex justify-center items-center w-8 h-8"
            style={{ zIndex: 10 }}
          >
            +
          </span>
        )}
      </label>
    </div>
  );
};

const CreateServerForm = ({ onSubmit }) => {
  const initialValues = {
    avatarFile: null,
  };

  const handleFormSubmit = (values) => {
    onSubmit(values.avatarFile);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-discord-darkGrey p-4 rounded-lg w-64">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="flex items-center mb-4">
                <Field name="avatarFile" component={CustomFileInput} />
                <ErrorMessage
                  name="avatarFile"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateServerForm;
