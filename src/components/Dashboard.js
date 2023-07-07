import React from "react";
import SignOutButton from "./SignOutButton";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  debugger;
  const user = JSON.parse(localStorage.getItem("user"));
  debugger;
  // if (user.user_status === "Registered") {
  //   localStorage.setItem("session", user.user_status);
  // }
  const naviagte = useNavigate();
  debugger;
  return (
    <div className="m-5 d-flex justify-content-center">
      <div>
        {user && (
          <div>
            <h1 className="text-info">Dashboard</h1>

            <h1 className="text-danger">
              <strong>{user.first_name}</strong> !
            </h1>
            <span> Welcome to dashboard</span>
            <table className="mt-3 table table-hovered table-bordered w-25">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{user.id}</td>
                  <td>{user.first_name}</td>
                  <td>{user.phone}</td>
                  <td
                    className={
                      user.user_status === "Registered"
                        ? "text-info"
                        : "text-danger"
                    }
                  >
                    <strong>{user.user_status}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
            <SignOutButton />
          </div>
        )}
        {!user && naviagte("/signin")}
      </div>
    </div>
  );
};

export default Dashboard;
