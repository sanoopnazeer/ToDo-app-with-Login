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
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../../axios/services/userService";

const Login = () => {

    const navigate = useNavigate();

    const [formValue, setFormValue] = useState('')

    const { email, password } = formValue;

    const onInputChange = (e) => {
        let { name, value } = e.target;
        setFormValue({...formValue, [name]: value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const res = await userLogin(formValue)
        console.log(res)
        localStorage.setItem("user", JSON.stringify(res))
        navigate('/mynotes')
    }
    
  return (
    <div className="login">
      <div className="login-container">
        <MDBCard alignment="center">
          <MDBIcon fas icon="user-circle" className="fa-5x p-4" />
          <h4>USER LOGIN</h4>
          <MDBCardBody>
            <MDBValidation
                onSubmit={handleSubmit}
              noValidate
              className="row g-3"
            >
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
                  Login
                </MDBBtn>
              </div>
            </MDBValidation>
          </MDBCardBody>
          <MDBCardFooter>
            <Link to="/register">
              <p>Don't have an account? Sign Up</p>
            </Link>
          </MDBCardFooter>
        </MDBCard>
      </div>
    </div>
  );
};

export default Login;
