import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import { useSelector } from "react-redux";
// import { Table } from "antd";
import { Descriptions } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";

const StudentProfile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  if (!user) {
    return dispatch(showLoading());
  }
  return (
    <Layout>
      <h1 className="text-center">Student Profile</h1>
      <div className="card">
        <div className="card-body">
          <Descriptions column={1}>
            <Descriptions.Item label="Name">{user?.name}</Descriptions.Item>
            <Descriptions.Item label="Class">{user?.clas}</Descriptions.Item>
            <Descriptions.Item label="Roll No.">
              {user?.rollno}
            </Descriptions.Item>
            <Descriptions.Item label="E mail">{user?.email}</Descriptions.Item>
            <Descriptions.Item label="Created At">
              {user?.createdAt}
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>
    </Layout>
  );
};

export default StudentProfile;
