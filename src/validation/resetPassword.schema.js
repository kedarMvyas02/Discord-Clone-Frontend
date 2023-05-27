import * as yup from "yup";

export default yup.object().shape({
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100)
    .required("Password is required")
    .defined(),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Password confirmation is required")
    .defined(),
});
