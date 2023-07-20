import { useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";

export const handleLogin = (e, email, password, role) => {
  e.preventDefault();
  try {
    if (!role || !email || !password)
      return alert("Please Provide All Details");

    console.log("login", e, email, password, role);
  } catch (error) {
    console.log(error);
  }
};

export const handleRegister = async (values) => {
  // const navigate = useNavigate();
  values.e.preventDefault;

  try {
    const res = await axios.post("/api/v1/auth/register", values);
    if (res.data.success) {
      message.success("Register Successfully");
      // navigate("/login");
    } else {
      message.error(res.data.message);
    }
  } catch (error) {
    console.log(error);
  }
};
