import axios from "axios";
import { Layout } from "./../../components/Layout";
import React, { useEffect, useState } from "react";
import { Table } from "antd";

const Students = () => {
  const [students, setStudents] = useState([]);

  // get Students
  const getAllStudents = async () => {
    try {
      const res = await axios.get("/api/v1/getAllStudents", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setStudents(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllStudents();
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
      title: "Class",
      dataIndex: "clas",
    },
    {
      title: "Rollno",
      dataIndex: "clas",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
  ];

  return (
    <Layout>
      <h1>All Students</h1>
      <Table columns={columns} dataSource={students} />
    </Layout>
  );
};

export default Students;
