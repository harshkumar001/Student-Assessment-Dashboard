import React from "react";
import Form from "../components/shared/Form/Form";
// import "../styles/RegisterStyles.css";
import { message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { showLoading, hideLoading } from "../redux/features/alertSlice";
const Register = () => {
  return (
    <>
      <div className="row g-0">
        <div className="col-md-8 form-banner ">
          <img src="./asseets/images/banner.jpg" alt="registerImage" />
        </div>
        <div className="col-md-4 form-container">
          <Form
            formTitle={"Register"}
            submitBtn={"Register"}
            formType={"register"}
          />
        </div>
      </div>
    </>
  );
};

export default Register;
