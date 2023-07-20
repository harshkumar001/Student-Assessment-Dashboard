import React from "react";
import Form from "../components/shared/Form/Form";
// import "../styles/RegisterStyles.css";
// import { Form, Input, message } from "antd";

// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

const Login = () => {
  return (
    <>
      <div className="row g-0">
        <div className="col-md-8 form-banner">
          <img src="./asseets/images/banner.jpg" alt="loginImage" />
        </div>
        <div className="col-md-4 form-container">
          <Form
            formTitle={"Login Page"}
            submitBtn={"Login"}
            formType={"login"}
          />
        </div>
      </div>
    </>
  );
};

export default Login;
