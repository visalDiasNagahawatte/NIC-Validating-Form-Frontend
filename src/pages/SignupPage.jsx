import React, { useState, useContext } from "react";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  let navigate = useNavigate();

  //handling form submission
  const handleSignup = async (e) => {
    e.preventDefault();

    //creating a data object to send to the backend
    const signupData = {
      username: userName,
      email: email,
      password: password,
    };
    console.log({ signupData });
    try {
      //POST request
      const response = await axios.post(
        "http://localhost:3001/auth",
        signupData
      );
      //Success message
      console.log("Signup Successful: ", response.data);

      //resetting the form fields
      setUserName("");
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      console.error("Signup Error: ", error);
    }
  };

  return (
    <div className="d-flex justify-content-center position-absolute top-50 start-50 translate-middle">
      <form onSubmit={handleSignup}>
        <MDBInput
          className="mb-4"
          type="text"
          id="formUserName"
          label="User Name"
          value={userName}
          required
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <MDBInput
          className="mb-4"
          type="email"
          id="form1Example1"
          label="Email address"
          value={email}
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <MDBInput
          className="mb-4"
          type="password"
          id="form1Example2"
          label="Password"
          value={password}
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <MDBBtn type="submit" className="mb-4" block>
          Sign up
        </MDBBtn>
        <div className="text-center">
          <p>
            Already have an account? <a href="/login">Log In</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignupPage;
