import React from "react";
import { useDispatch } from "react-redux";
import { signOutUser } from "../actions/authAction";
import { useNavigate } from "react-router-dom";

const SignOutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Get the history object

  const handleSignOut = () => {
    const Token = localStorage.getItem("authToken"); // Retrieve the auth token from localStorage
    dispatch(signOutUser(Token, navigate));

    /*() => {
    // Callback function to be invoked after successful sign-out
    navigate("/signin"); // Redirect to the desired page (e.g., homepage)
  } */
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("session");
    localStorage.removeItem("phone");
    localStorage.removeItem("permission");

    // navigate("/signin");
  };

  return (
    <button onClick={handleSignOut} className="btn btn-danger">
      Sign Out
    </button>
  );
};

export default SignOutButton;
