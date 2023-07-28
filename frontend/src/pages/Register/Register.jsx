import React, { useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../axios/services/userService";

const Register = () => {
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState("");

  const { fullname, email, password } = formValue;

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (fullname && email && password) {
      const newUser = await registerUser(formValue);
      if (newUser.status) {
        navigate("/login");
      }
    } else {
      alert("Please provide all the details");
    }
  };

  return (
    <div className="register">
      <div className="register-container">
        <MDBCard alignment="center">
          <MDBIcon fas icon="user-circle" className="fa-5x p-4" />
          <h4> USER REGISTRATION </h4>
          <MDBCardBody>
            <MDBValidation
              onSubmit={handleSubmit}
              noValidate
              className="row g-3"
            >
              <MDBValidationItem
                className="col-md-12"
                feedback="Please provide fullname"
                invalid
              >
                <div className="col-md-12">
                  <MDBInput
                    label="Fullname"
                    type="text"
                    value={fullname}
                    name="fullname"
                    onChange={onInputChange}
                    required
                    invalid
                  />
                </div>
              </MDBValidationItem>
              <MDBValidationItem
                className="col-md-12"
                feedback="Please provide your email"
                invalid
              >
                <div className="col-md-12">
                  <MDBInput
                    label="Email"
                    type="email"
                    value={email}
                    name="email"
                    onChange={onInputChange}
                    required
                    invalid
                  />
                </div>
              </MDBValidationItem>
              <MDBValidationItem
                className="col-md-12"
                feedback="Please provide your password"
                invalid
              >
                <div className="col-md-12">
                  <MDBInput
                    label="Password"
                    type="password"
                    value={password}
                    name="password"
                    onChange={onInputChange}
                    required
                    invalid
                  />
                </div>
              </MDBValidationItem>
              <div className="col-12">
                <MDBBtn style={{ width: "100%" }} className="mt-2">
                  Sign Up
                </MDBBtn>
              </div>
            </MDBValidation>
          </MDBCardBody>
          <MDBCardFooter>
            <Link to="/login">
              <p>Already have an account? Login here</p>
            </Link>
          </MDBCardFooter>
        </MDBCard>
      </div>
    </div>
  );
};

export default Register;
