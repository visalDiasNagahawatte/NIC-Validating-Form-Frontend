import React, { useState, useContext } from "react";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const { setAuthState } = useContext(AuthContext);

  let navigate = useNavigate();

  //handling loginData
  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      email: formData.email,
      password: formData.password,
    };
    console.log({ loginData });
    try {
      //POST request
      const response = await axios.post(
        "http://localhost:3001/auth/login",
        loginData
      );
      //Success Message
      console.log("Login Data Sent", response.data);
      if (!response.data.error) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("userId", response.data.userId);
        setAuthState(true);
        //resetting the form fields
        setFormData({
          email: "",
          password: "",
        });

        navigate("/profile");
      } else {
        setErrorMessage(response.data.error); // Set error message from the response
      }
    } catch (error) {
      console.log("loginData error", error);
    }
  };

  return (
    <>
      {errorMessage && (
        <div className="text-center alert alert-danger mb-4" role="alert">
          {errorMessage}
        </div>
      )}
      <div className="d-flex justify-content-center position-absolute top-50 start-50 translate-middle">
        <form onSubmit={handleLogin}>
          <MDBInput
            className="mb-4"
            type="email"
            id="form1Example1"
            label="Email address"
            value={formData.email}
            required
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
          />
          <MDBInput
            className="mb-4"
            type="password"
            id="form1Example2"
            label="Password"
            value={formData.password}
            required
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
          />

          <MDBBtn type="submit" className="mb-3" block>
            Log in
          </MDBBtn>
          <div className="text-center">
            <p>
              New to NIC Pro ? <a href="/signup">Sign Up</a> <br />
              <a href="">Forgot Password</a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
