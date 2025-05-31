import React, { useEffect, useState } from 'react';
import './dstyle.css';
import SideBar from './SideBar';
import Navbar from './Navbar';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/users")
      .then((data) => data.json())
      .then((res) => setUsers(res));
  }, []);

  return (
    <div style={{ backgroundColor: "#eee", minHeight: "100vh" }}>
      <SideBar current={"user"} />
      <section id="content">
        <Navbar />
        <main>
          <div className="table-data" style={{ marginTop: "-10px", overflowX: "auto" }}>
            <div className="order">
              <div className="head">
                <h3 style={{ color: "darkblue" }}>Users Info</h3>
              </div>
              <table className="responsive-table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Profession</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.phno}</td>
                      <td>{user.profession}</td>
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

export default Users;
