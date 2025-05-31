import React, { useState, useEffect } from "react";
import "./dstyle.css";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import Navbar from "./Navbar";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "antd";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [isDeleted, setDeleted] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [cid, setCid] = useState(-1);
  const navigate = useNavigate();

  const showModal = () => setOpenModal(true);
  const handleOk = () => {
    setOpenModal(false);
    deleteCourse(cid);
  };
  const handleCancel = () => setOpenModal(false);

  useEffect(() => {
    fetch(`http://localhost:8080/api/courses`)
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error fetching data:", error));
    setDeleted(false);
  }, [isDeleted]); // Fixed: Changed "[is zau)" to "[isDeleted]"

  function deleteCourse(courseId) {
    axios
      .delete("http://localhost:8800/delete", {
        data: { courseId },
      })
      .then((response) => console.log("Delete successful:", response.data))
      .catch((error) => console.error("Delete error:", error));
    setDeleted(true);
    setCid(-1);
  }

  function editCourse(course_id) {
    navigate(`/editCourse/${course_id}`);
  }

  function addquestions(course_id) {
    navigate(`/addquestions/${course_id}`);
  }

  return (
    <div className="dashboard-wrapper">
      <SideBar current={"courses"} />
      <div className="dashboard-content">
        <Navbar />
        <main className="t">
          <div className="table-data">
            <div className="order">
              <div id="course" className="todo">
                <div className="head">
                  <h3>Courses</h3>
                  <button
                    onClick={() => navigate("/addcourse")}
                    style={{
                      backgroundColor: "darkblue",
                      borderRadius: "10px",
                      color: "white",
                      border: "none",
                      padding: "8px",
                      fontWeight: "500",
                    }}
                  >
                    Add Course <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
                <ul className="todo-list">
                  {courses.map((course) => (
                    <li key={course.course_id} className="completed">
                      <p>{course.course_name}</p>
                      <div>
                        <button
                          onClick={() => {
                            setOpenModal(true);
                            setCid(course.course_id);
                          }}
                          className="delete-button"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <button
                          onClick={() => editCourse(course.course_id)}
                          className="edit-button"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          onClick={() => addquestions(course.course_id)}
                          className="test-button"
                        >
                          Test
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Modal
        id="poppup"
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h3>Are you sure you want to delete?</h3>
      </Modal>
    </div>
  );
}

export default Courses;