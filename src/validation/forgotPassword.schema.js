import * as yup from "yup";

export default yup.object().shape({
  email: yup
    .string()
    .email("Not a well formed email address")
    .lowercase()
    .required("Email is required")
    .defined(),
});
