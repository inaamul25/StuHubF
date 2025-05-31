import React, { useEffect, useState } from 'react';
import './dstyle.css';
import SideBar from './SideBar';
import Navbar from './Navbar';

function Tutors() {
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8800/tutors")
      .then((data) => data.json())
      .then((res) => setTutors(res));
  }, []);

  return (
    <div className="dashboard-wrapper">
      <SideBar current={'tutor'} />
      <section id="content">
        <Navbar />
        <main>
          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3 style={{ color: "darkblue" }}>Tutors Info</h3>
              </div>
              <table id="user" className="responsive-table">
                <thead>
                  <tr>
                    <th>Tutor Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Qualification</th>
                  </tr>
                </thead>
                <tbody>
                  {tutors.map((tutor, index) => (
                    <tr key={index}>
                      <td data-label="Tutor Name:"><p>{tutor.tutor_name}</p></td>
                      <td data-label="Email:">{tutor.tutor_email}</td>
                      <td data-label="Phone Number:">{tutor.tutor_phno}</td>
                      <td data-label="Qualification:">{tutor.tutor_qualification}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}

export default Tutors;