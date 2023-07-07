import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { signInUser } from "../actions/authAction";
import { useNavigate, Link } from "react-router-dom";

const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      phone: "",
      password: "",
    },
    validationSchema: Yup.object({
      phone: Yup.string().required("Phone number is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      const userData = {
        user: {
          country_code: "+92",
          phone: values.phone,
          password: values.password,
        },
        user_session: {
          device_type: "ios/android",
          device_token: "xxx",
        },
      };

      dispatch(signInUser(userData, navigate));
      debugger;

      // navigate("/dashboard");
    },
  });

  return (
    <div className="container">
      <div className="mt-5 d-flex justify-content-center">
        <form onSubmit={formik.handleSubmit} className=" mt-5">
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
            />
            {formik.errors.password && formik.touched.password && (
              <div className="text-danger">{formik.errors.password}</div>
            )}
          </div>
          <div as="span">
            <button type="submit" className="btn btn-primary">
              Sign In
            </button>
            <div className="mt-2">
              <span>
                Not Registered? <Link to="/">Sign Up</Link> Here
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
