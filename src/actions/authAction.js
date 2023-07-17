// actions/authActions.js
import axios from "axios";
// import { useNavigate } from "react-router-dom";

export const signUpUser = (userData, naviagte) => {
  debugger;
  return (dispatch) => {
    axios
      .post("http://demoapi.gharpar.co/api/v8/registrations.json", userData)
      .then((response) => {
        debugger;
        if (response.status === 200) {
          debugger;
          dispatch({ type: "SIGNUP_SUCCESS", payload: response.data });
          localStorage.setItem("permission", true);
          const permision = localStorage.getItem("permission");
          console.log(permision, "permision in sign up action");
          naviagte("/verify");
        }
      })
      .catch((error) => {
        debugger;
        console.log(error.message);
        if (error.response.status === 400) {
          // console.log("User Already Registered");
          alert("User Already Registered");
          // localStorage.setItem("signedup", false);
        }
        dispatch({ type: "SIGNUP_ERROR", payload: error.message });
      });
  };
};

export const verifyPin = (pinData, naviagte) => {
  // const naviagte = useNavigate();

  return (dispatch) => {
    axios
      .post(
        "http://demoapi.gharpar.co/api/v8/user_sessions/pin_verification.json",
        pinData
      )
      .then((response) => {
        if (response.status === 200) {
          debugger;
          localStorage.setItem("authToken", response.data.auth_token);
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("session", response.data.user_status);
          localStorage.setItem("permission", false);

          debugger;
          dispatch({ type: "PIN_VERIFY_SUCCESS", payload: response.data });
          localStorage.setItem("session", response.data.user_status);
          naviagte("/dashboard");
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          // console.log("User Already Registered");
          alert(error.message, "Error Occured");
          // localStorage.setItem("signedup", false);
        }
        dispatch({ type: "PIN_VERIFY_ERROR", payload: error.message });
      });
  };
};
export const signInUser = (userData, naviagte) => {
  return (dispatch) => {
    debugger;
    axios
      .post("http://demoapi.gharpar.co/api/v8/user_sessions.json", userData)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("authToken", response.data.auth_token);
          localStorage.setItem("session", response.data.user_status);
          localStorage.setItem("permission", false);

          debugger;
          dispatch({ type: "SIGNIN_SUCCESS", payload: response.data });
          debugger;
          naviagte("/dashboard");
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          // console.log("User Already Registered");
          alert(error.message, "Error Occured");
          // localStorage.setItem("signedup", false);
        }
        dispatch({ type: "SIGNIN_ERROR", payload: error.message });
      });
  };
};

export const signOutUser = (authToken, naviagte) => {
  return (dispatch) => {
    const config = {
      headers: {
        "AUTH-TOKEN": authToken,
        "Content-Type": "application/json",
      },
    };

    axios
      .post(
        "http://demoapi.gharpar.co/api/v8/user_sessions/logout.json",
        {},
        config
      )
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: "SIGNOUT_SUCCESS", payload: response.data });
          naviagte("/signin");
        } // Invoke the callback function
      })
      .catch((error) => {
        if (error.response.status === 400) {
          // console.log("User Already Registered");
          alert(error.message, "Error Occured");
          // localStorage.setItem("signedup", false);
        }
        dispatch({ type: "SIGNOUT_ERROR", payload: error.message });
      });
  };
};
