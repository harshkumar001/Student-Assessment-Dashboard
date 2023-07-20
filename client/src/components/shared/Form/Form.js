import React, { useState } from "react";
import InputType from "./InputType";
import { Link } from "react-router-dom";
// import { handleLogin } from "../../../services/authService";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../../redux/features/alertSlice";

const Form = ({ formType, submitBtn, formTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [subject, setSubject] = useState("");
  const [clas, setClas] = useState("");
  const [rollno, setRollno] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    const values = {
      email,
      password,
      role,
    };
    try {
      if (!role || !email || !password)
        return alert("Please Provide All Details");
      console.log("login", e, email, password, role);

      dispatch(showLoading());
      const res = await axios.post("/api/v1/auth/login", values);
      window.location.reload();
      dispatch(hideLoading());

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        navigate("/");
      } else {
        message.error("Invalid Email or Password");
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const values = {
        email,
        password,
        role,
        subject,
        clas,
        rollno,
        name,
      };

      dispatch(showLoading());
      const res = await axios.post("/api/v1/auth/register", values);
      dispatch(hideLoading());

      if (res.data.success) {
        message.success("Register Successfully");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          if (formType === "login")
            return handleLogin(e, email, password, role);
          else if (formType === "register") return handleRegister(e);
        }}
      >
        <h1 className="text-center">{formTitle}</h1>
        <hr />

        <div className="d-flex mb-3">
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="adminRadio"
              value={"admin"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="adminRadio" className="form-check-label">
              Admin
            </label>
          </div>
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="teacherRadio"
              value={"teacher"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="teacherRadio" className="form-check-label">
              Teacher
            </label>
          </div>
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="studentRadio"
              value={"student"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="studentRadio" className="form-check-label">
              Student
            </label>
          </div>
        </div>

        {/* Switch statement  */}
        {(() => {
          switch (true) {
            case formType === "login": {
              return (
                <>
                  <InputType
                    labelText={"Email"}
                    labelFor={"forEmail"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    labelText={"Password"}
                    labelFor={"forPassword"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </>
              );
            }
            case formType === "register": {
              return (
                <>
                  <InputType
                    labelText={"Email"}
                    labelFor={"forEmail"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    labelText={"Password"}
                    labelFor={"forPassword"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputType
                    labelText={"Name"}
                    labelFor={"forName"}
                    inputType={"text"}
                    name={"name"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {role === "student" && (
                    <InputType
                      labelText={"Roll No."}
                      labelFor={"forRollno"}
                      inputType={"number"}
                      name={"rollno"}
                      value={rollno}
                      onChange={(e) => setRollno(e.target.value)}
                    />
                  )}
                  {role === "student" && (
                    <InputType
                      labelText={"Class"}
                      labelFor={"forClas"}
                      inputType={"number"}
                      name={"clas"}
                      value={clas}
                      onChange={(e) => setClas(e.target.value)}
                    />
                  )}
                  {role === "teacher" && (
                    <InputType
                      labelText={"Subject"}
                      labelFor={"forSubject"}
                      inputType={"string"}
                      name={"subject"}
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  )}
                </>
              );
            }
            default: {
              return <h1>This is Default Page</h1>;
            }
          }
        })()}
        <div className="d-flex flex-row justify-content-between mt-2">
          {formType === "login" ? (
            <p>
              Not register? Register
              <Link to="/register" style={{ textDecoration: "none" }}>
                {" "}
                Here{" "}
              </Link>
            </p>
          ) : (
            <p>
              Already User
              <Link to="/login"> Login</Link>
            </p>
          )}
          <button className="btn btn-primary" type="submit">
            {submitBtn}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
