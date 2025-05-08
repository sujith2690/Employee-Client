import * as Yup from "yup"
export const loginSchema = Yup.object({
    email: Yup.string().email().required("Please Enter Email"),
    password: Yup.string().min(3).required("Enter Your Password")
})
export const signUpSchema = Yup.object({
    name: Yup.string().min(1).max(25).required("Please enter your Name"),
    email: Yup.string().email().required("Please enter your Email"),
    password: Yup.string().min(3).required("Please enter your Password"),
    confirmPassword: Yup.string().required().oneOf([Yup.ref('password'), null], "Password Must match")
})