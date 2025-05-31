import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Courses() {
  const [courses, setCourses] = useState([]);
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();
  const [enrolled, setEnrolled] = useState([]);
  const authToken = localStorage.getItem("token");
  const [isProcessing, setIsProcessing] = useState(false);

  // Backend base URL from environment variable or fallback to localhost
  const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

  useEffect(() => {
    // Fetch all courses
    fetch(`${BASE_URL}/api/courses`)
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    // Fetch enrolled courses for logged in user
    if (userId) {
      fetch(`${BASE_URL}/api/learning/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          let arr = [];
          for (let i = 0; i < data.length; i++) {
            arr.push(data[i].course_id);
          }
          setEnrolled(arr);
        })
        .catch((error) => {
          console.error("Error fetching enrolled courses:", error);
        });
    }
  }, [userId, BASE_URL]);

  // Load Razorpay checkout script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.getElementById("razorpay-script")) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Enroll course with payment
  async function enrollCourse(courseId, price) {
    if (!authToken) {
      toast.error("You need to login to continue", {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }

    setIsProcessing(true);

    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Check your connection.");
      setIsProcessing(false);
      return;
    }

    try {
      // Create Razorpay order on backend
      const orderResponse = await axios.post(`${BASE_URL}/api/payments/createOrder`, {
        amount: Number(price), // ensure number type
      });
      const orderData = orderResponse.data;

      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "StuHub Payment",
        description: `Payment for course enrollment`,
        order_id: orderData.orderId,
        handler: async function (response) {
          try {
            // Verify payment on backend
            await axios.post(`${BASE_URL}/api/payments/verify`, {
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            });

            // Enroll user after successful payment
            const enrollRequest = {
              userId: userId,
              courseId: courseId,
            };
            const enrollResponse = await axios.post(`${BASE_URL}/api/learning`, enrollRequest);

            if (enrollResponse.data === "Enrolled successfully") {
              toast.success("Course enrolled successfully!", {
                position: "top-right",
                autoClose: 1500,
              });
              setEnrolled((prev) => [...prev, courseId]);
              setTimeout(() => {
                navigate(`/course/${courseId}`);
              }, 2000);
            } else {
              toast.error("Enrollment failed, please try again.");
            }
          } catch (verifyError) {
            toast.error("Payment verification failed, please try again.");
            console.error("Payment verification error:", verifyError);
          }
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error in payment process:", error);
      toast.error("Payment initiation failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div>
      <Navbar page={"courses"} />
      <div className="courses-container" style={{ marginTop: "20px" }}>
        {courses.map((course) => (
          <div key={course.course_id} className="course-card">
            <img
              src={course.p_link}
              alt={course.courseName}
              className="course-image"
            />
            <div className="course-details">
              <h3 className="course-heading">
                {course.courseName.length < 8
                  ? `${course.courseName} Tutorial`
                  : course.courseName}
              </h3>
              <p className="course-description" style={{ color: "grey" }}>
                Price: Rs.{course.price}
              </p>
              <p className="course-description">Tutorial by {course.instructor}</p>
            </div>
            {enrolled.includes(course.course_id) ? (
              <button
                className="enroll-button"
                style={{
                  color: "#F4D03F",
                  backgroundColor: "darkblue",
                  fontWeight: "bold",
                }}
                onClick={() => navigate("/learnings")}
              >
                Enrolled
              </button>
            ) : (
              <button
                className="enroll-button"
                disabled={isProcessing}
                onClick={() => enrollCourse(course.course_id, course.price)}
              >
                {isProcessing ? "Processing..." : "Enroll"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
