import React, { useState, useEffect } from 'react';
import './style.css'; // Optional: Create this file for styling

const Payment = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [enrollmentResult, setEnrollmentResult] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/courses')
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  const selectCourse = (courseId, amount) => {
    setSelectedCourseId(courseId);
    setSelectedAmount(amount);
    setEnrollmentResult(''); // Clear previous result
  };

  const initiatePayment = () => {
    if (!selectedCourseId || !selectedAmount) {
      alert('Please select a course first!');
      return;
    }

    fetch(`http://localhost:8080/api/payments/create-order?userId=1&courseId=${selectedCourseId}&amount=${selectedAmount}`)
      .then(response => response.json())
      .then(data => {
        const amount = data.amount;
        if (amount <= 0) {
          alert('Course enrolled for free!');
          enrollCourse(1, selectedCourseId, data.orderId);
        } else {
          const options = {
            key: 'rzp_test_DcmPp3YuVHAaf7', // Replace with live key in production
            amount: (amount * 100).toString(),
            currency: 'INR',
            name: 'StuHub',
            description: 'Course Purchase',
            order_id: data.orderId,
            handler: function (response) {
              fetch('http://localhost:8080/api/payments/update-status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ transactionId: response.razorpay_order_id, status: 'paid' })
              })
              .then(() => enrollCourse(1, selectedCourseId, response.razorpay_order_id))
              .then(() => alert('Payment and Enrollment Successful!'))
              .catch(error => alert('Error updating status: ' + error));
            },
            prefill: {
              name: 'Inamul',
              email: 'inaamul66@gmail.com',
              contact: '9999999999'
            },
            theme: {
              color: '#3399cc'
            }
          };
          const rzp = new window.Razorpay(options);
          rzp.open();
        }
      })
      .catch(error => alert('Error: ' + error));
  };

  const enrollCourse = (userId, courseId, transactionId) => {
    fetch(`http://localhost:8080/api/courses/enroll?userId=${userId}&courseId=${courseId}&transactionId=${transactionId}`, {
      method: 'POST'
    })
    .then(response => response.json())
    .then(data => setEnrollmentResult(data))
    .catch(error => setEnrollmentResult('Enrollment Error: ' + error));
  };

  return (
    <div>
      <h2>Available Courses</h2>
      <div className="course-list">
        {courses.map(course => (
          <div key={course.course_id} className="course-item">
            {course.course_name} (Price: ₹{course.price})
            <button onClick={() => selectCourse(course.course_id, course.price)}>Select</button>
          </div>
        ))}
      </div>
      {selectedCourseId && (
        <div className="payment-section">
          <h3>Pay for Course</h3>
          <button onClick={initiatePayment}>Pay Now</button>
          {enrollmentResult && <p>{enrollmentResult}</p>}
        </div>
      )}
    </div>
  );
};

export default Payment;