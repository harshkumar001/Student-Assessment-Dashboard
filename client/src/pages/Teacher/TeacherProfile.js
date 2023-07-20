import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import { useSelector } from "react-redux";
import { Descriptions } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";

const TeacherProfile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  if (!user) {
    return dispatch(showLoading());
  }
  return (
    <Layout>
      <h1 className="text-center">Teacher Profile</h1>
      <div className="card">
        <div className="card-body">
          <Descriptions column={1}>
            <Descriptions.Item label="Name">{user?.name}</Descriptions.Item>
            <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
            <Descriptions.Item label="Subject">
              {user?.subject}
            </Descriptions.Item>
            <Descriptions.Item label="Created At">
              {user?.createdAt}
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>
    </Layout>
  );
};

export default TeacherProfile;
