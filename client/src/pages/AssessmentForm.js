import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { Checkbox, Col, Form, Input, Row, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";

const AssessmentForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    questions: [
      {
        questionText: "",
        options: [{ optionText: "", isCorrect: false }],
        justification: "",
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      questions: prevState.questions.map((question, i) =>
        i === index ? { ...question, [name]: value } : question
      ),
    }));
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    setFormData((prevState) => ({
      ...prevState,
      questions: prevState.questions.map((question, i) =>
        i === questionIndex
          ? {
              ...question,
              options: question.options.map((option, j) =>
                j === optionIndex ? { ...option, isCorrect: value } : option
              ),
            }
          : question
      ),
    }));
  };
  const addQuestion = () => {
    setFormData((prevState) => ({
      ...prevState,
      questions: [
        ...prevState.questions,
        {
          questionText: "",
          options: [{ optionText: "", isCorrect: false }],
          justification: "",
        },
      ],
    }));
  };

  const addOption = (questionIndex) => {
    setFormData((prevState) => ({
      ...prevState,
      questions: prevState.questions.map((question, i) =>
        i === questionIndex
          ? {
              ...question,
              options: [
                ...question.options,
                { optionText: "", isCorrect: false },
              ],
            }
          : question
      ),
    }));
  };

  const deleteQuestion = (questionIndex) => {
    setFormData((prevState) => ({
      ...prevState,
      questions: prevState.questions.filter(
        (_, index) => index !== questionIndex
      ),
    }));
  };

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      // Destructure the form values
      const { title, description, questions } = values;

      // Validate the form data before submitting
      // Check if title and description are provided
      if (!title || !description) {
        message.error(
          "Please provide a title and description for the assessment."
        );
        return;
      }

      // Check if there is at least one question with questionText, justification, and at least one option with non-empty optionText
      // const validQuestions = questions.every((question) => {
      //   const hasQuestionText = !!question.questionText;
      //   const hasJustification = !!question.justification;
      //   const hasValidOptions = question.options.some(
      //     (option) => !!option.optionText && option.isCorrect
      //   );
      //   return hasQuestionText && hasJustification && hasValidOptions;
      // });

      // if (!validQuestions) {
      //   message.error(
      //     "Please provide question text, justification, and at least one option for all questions."
      //   );
      //   return;
      // }

      dispatch(showLoading());

      // Create the request payload
      const payload = {
        title,
        description,
        questions: questions.map((question) => ({
          questionText: question.questionText,
          options: question.options.map((option) => ({
            optionText: option.optionText,
            isCorrect: option.isCorrect,
          })),
          justification: question.justification,
        })),
        userId: user._id,
      };

      const res = await axios.post(
        "/api/v1/teacher/createAssessment",
        payload,
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  return (
    <Layout>
      <h1 className="text-center">Create Assessment</h1>
      <hr />
      <Form layout="vertical" onFinish={handleSubmit} className="m-3">
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Title"
              name="title"
              // value={formData.title}
              onChange={handleChange}
              required
              rules={[{ required: true }]}
            >
              <Input type="text" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Description"
              name="description"
              // value={formData.description}
              onChange={handleChange}
              required
              rules={[{ required: true }]}
            >
              <Input type="text" />
            </Form.Item>
          </Col>
        </Row>

        {formData.questions.map((question, questionIndex) => (
          <div key={questionIndex}>
            <h4>Question {questionIndex + 1}</h4>
            <Row className="row g-2 align-items-center">
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Question Text"
                  name={["questions", questionIndex, "questionText"]}
                  // value={question.questionText}
                  onChange={(e) => handleQuestionChange(questionIndex, e)}
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.List
                  name={["questions", questionIndex, "options"]}
                  rules={[
                    {
                      validator: async (_, options) => {
                        if (!options || options.length < 2) {
                          return Promise.reject(
                            new Error("At least 2 options are required")
                          );
                        }
                      },
                    },
                  ]}
                >
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field) => (
                        <Row
                          key={field.key}
                          className="row g-3 align-items-center"
                        >
                          <Col xs={18} md={18} lg={12}>
                            <Form.Item
                              className="mb-3"
                              label="Option Text"
                              name={[field.name, "optionText"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Missing option text",
                                },
                              ]}
                            >
                              <Input type="text" />
                            </Form.Item>
                          </Col>
                          <Col xs={6} md={6} lg={4}>
                            <Form.Item
                              valuePropName="checked"
                              name={[field.name, "isCorrect"]}
                              initialValue={false}
                            >
                              <Checkbox>Correct</Checkbox>
                            </Form.Item>
                          </Col>
                          <Col xs={24} md={24} lg={24} className="mt-0 mb-3">
                            <button
                              className="btn btn-danger btn-sm"
                              type="button"
                              onClick={() => remove(field.name)}
                            >
                              Remove Option
                            </button>
                          </Col>
                        </Row>
                      ))}
                      <Form.Item>
                        <button
                          className="mt-2 btn btn-success btn-sm"
                          type="button"
                          onClick={() => add()}
                        >
                          Add Option
                        </button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Col>

              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  className="mb-0"
                  label="Justification"
                  name={`questions[${questionIndex}].justification`}
                  value={question.justification}
                  onChange={(e) => handleQuestionChange(questionIndex, e)}
                  // required
                  // rules={[{ required: true }]}
                >
                  <Input.TextArea rows={2} />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <button
                  className="mb-3 btn btn-secondary btn-sm"
                  type="button"
                  onClick={() => deleteQuestion(questionIndex)}
                >
                  Delete Question
                </button>
              </Col>
            </Row>
          </div>
        ))}

        <button
          className="me-5 btn btn-warning btn-sm"
          type="button"
          onClick={addQuestion}
        >
          Add Question
        </button>
        <br />
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary submit" type="submit">
            Submit
          </button>
        </div>
      </Form>
    </Layout>
  );
};

export default AssessmentForm;
