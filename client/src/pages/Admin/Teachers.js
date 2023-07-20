import axios from "axios";
import { Layout } from "./../../components/Layout";
import React, { useEffect, useState } from "react";
import { Table } from "antd";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);

  // get Teachers
  const getAllTeachers = async () => {
    try {
      const res = await axios.get("/api/v1/getAllTeachers", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setTeachers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTeachers();
  }, []);

  // antD table col
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Subject",
      dataIndex: "subject",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button className="btn btn-danger">Block</button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1>All Teachers</h1>
      <Table columns={columns} dataSource={teachers} />
    </Layout>
  );
};

export default Teachers;
