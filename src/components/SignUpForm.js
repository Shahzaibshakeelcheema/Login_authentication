import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { signUpUser } from "../actions/authAction";
import { useNavigate, Link } from "react-router-dom";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      password: "",
      password_confirmation: "",
      country_code: "",
      phone: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("First name is required"),
      last_name: Yup.string().required("Last name is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password Length is to short"),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Password confirmation is required"),
      country_code: Yup.string(),
      phone: Yup.string()
        .matches(/^\d{0,10}$/, "Phone number must be 10 digits")
        .max(10, "Only !0 Digits are Alloow as phone No")
        .required("Phone number is required"),
    }),
    onSubmit: (values) => {
      // Prepend the country code to the phone number
      const country_code = "+92";
      const updatedValues = {
        ...values,
        country_code: country_code,
      };

      const user = {
        user: updatedValues,
      };
      debugger;
      dispatch(signUpUser(user, navigate));
      localStorage.setItem("phone", user.user.phone);
      localStorage.setItem("permission", true);
      const permision = localStorage.getItem("permission");
      console.log(permision, "permision in sign up form");
      debugger;
    },
  });

  return (
    <div className="">
      <div className="mt-5 d-flex justify-content-center">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="first_name" className="form-label">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.first_name}
            />
            {formik.errors.first_name && formik.touched.first_name && (
              <div className="text-danger">{formik.errors.first_name}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="last_name" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.last_name}
            />
            {formik.errors.last_name && formik.touched.last_name && (
              <div className="text-danger">{formik.errors.last_name}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.password}
              autoComplete="off"
            />
            {formik.errors.password && formik.touched.password && (
              <div className="text-danger">{formik.errors.password}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password_confirmation" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.password_confirmation}
              autoComplete="off"
            />
            {formik.errors.password_confirmation &&
              formik.touched.password_confirmation && (
                <div className="text-danger">
                  {formik.errors.password_confirmation}
                </div>
              )}
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
            {formik.errors.phone && formik.touched.phone && (
              <div className="text-danger">{formik.errors.phone}</div>
            )}
          </div>

          <div className=" d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
            <div className="mt-2">
              <span>
                Already Registered? <Link to="/signin">Sign In</Link> Here
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
