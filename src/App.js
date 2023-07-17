import React, { useState, useEffect } from "react";
import SignUpForm from "./components/SignUpForm";
import SignInForm from "./components/SignInForm";
import PinVerifyForm from "./components/PinVerifyForm";
// import SignOutButton from "./components/SignOutButton";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DashboardPage from "./components/Dashboard";
// import { useSelector } from "react-redux";

function App() {
  // const user = useSelector((state) => state.auth.user);
  debugger;

  //const session = user.user_status; //
  const session = localStorage.getItem("session");
  //const authToken = user.auth_token; //
  const authToken = localStorage.getItem("authToken");
  debugger;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const permission = localStorage.getItem("permission");
  useEffect(() => {
    // Perform your authentication logic here
    // Example: Check if the user is authenticated based on the session and authToken
    // Update the isAuthenticated state accordingly
    if (session && authToken) {
      setIsAuthenticated(true);
      console.log(isAuthenticated, "now it will be true session && authtoken ");
    } else {
      setIsAuthenticated(false);

      console.log(
        isAuthenticated,
        "now it will be false session && authtoken "
      );
    }
  }, [session, authToken]);

  const SignUpRoute = () => {
    if (!isAuthenticated) {
      return <SignUpForm />;
    } else {
      return <Navigate to="/verify" replace />;
    }
  };

  const VerifyRoute = () => {
    if (permission === "true") {
      return <PinVerifyForm />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  };

  const SignInRoute = () => {
    if (isAuthenticated) {
      return <Navigate to="/dashboard" replace />;
    } else {
      return <SignInForm />;
    }
  };
  // const DashboardComponent = () => {
  //   if (permission === "false") {
  //     return <DashboardPage />;
  //   } else {
  //     return <SignInForm />;
  //   }
  // };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SignUpRoute />} />
          <Route path="/verify" element={<VerifyRoute />} />
          <Route path="/signin" element={<SignInRoute />} />
          <Route
            path="/dashboard"
            element={
              permission === "false" ? (
                <DashboardPage />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
