import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux"; //, useSelector
import { verifyPin } from "../actions/authAction";
import { useNavigate } from "react-router-dom";

const PinVerifyForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const isLoggedIn = useSelector((state) => state.auth.user !== null); // Check if user is logged in

  const formik = useFormik({
    initialValues: {
      pin: "",
    },
    validationSchema: Yup.object({
      pin: Yup.string().required("Pin is required"),
    }),
    onSubmit: (values) => {
      const phone = localStorage.getItem("phone");
      debugger;
      const pinData = {
        user: {
          phone: phone,
          phone_pin: values.pin,
        },
        user_session: {
          device_type: "ios/android",
          device_token: "xxx",
        },
      };

      dispatch(verifyPin(pinData, navigate));
      localStorage.setItem("permission", false);
      const permision = localStorage.getItem("permission");
      console.log(permision, "permision in verify");
      debugger;
    },
  });
  // if (!isLoggedIn) {
  //   // Redirect to signup if user is not logged in
  //   navigate("/");
  //   return null;
  // }
  // useEffect(() => {
  //   // Check if the user has completed the signup process
  //   const isSignupCompleted = false; // Replace with the appropriate logic to check signup completion

  //   // If signup is not completed, redirect to the signup page
  //   if (!isSignupCompleted) {
  //     navigate("/");
  //   }
  // }, [navigate]);

  return (
    <div className="container">
      <div className="mt-5 d-flex justify-content-center">
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="pin" className="form-lable">
              Enter Pin :
            </label>
            <input
              className="form-control"
              type="text"
              id="pin"
              name="pin"
              onChange={formik.handleChange}
              value={formik.values.pin}
            />
            {formik.errors.pin && formik.touched.pin && (
              <div>{formik.errors.pin}</div>
            )}
          </div>
          <button className="btn btn-danger mt-3" type="submit">
            Verify Pin
          </button>
        </form>
      </div>
    </div>
  );
};

export default PinVerifyForm;
