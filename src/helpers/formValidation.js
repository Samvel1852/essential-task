import * as yup from "yup";

export const validationLogin = yup.object({
  userName: yup.string("Enter your userName").required("userName is required"),
  password: yup
    .string("Enter your password")
    .min(4, "Password should be of minimum 4 characters length")
    .required("Password is required"),
});
