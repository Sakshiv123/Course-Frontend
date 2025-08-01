import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button ,Badge} from 'react-bootstrap';


const API = 'https://courselist-backend.onrender.com/api';

function App() {
  // const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [courses, setCourses] = useState([]);
  const [enrolled, setEnrolled] = useState([]);
  const [studentId, setStudentId] = useState('');

  const headers = { headers: { Authorization: `Bearer ${token}` } };

  // const handleLogin = async () => {
  //   try {
  //     const res = await axios.post(`${API}/login`, { studentId });
  //     localStorage.setItem('token', res.data.token);
  //     setToken(res.data.token);
  //   } catch (err) {
  //     alert('Login failed');
  //   }
  // };

  const fetchCourses = async () => {
    const res = await axios.get(`${API}/courses`);
    setCourses(res.data);
  };

  const fetchEnrollments = async () => {
    const res = await axios.get(`${API}/enrollments/me`, headers);
    setEnrolled(res.data);
  };

  const handleEnroll = async (courseId) => {
    try {
      await axios.post(`${API}/enrollments`, { courseId }, headers);
      setEnrolled([...enrolled, courseId]);
    } catch (err) {
      alert(err.response?.data?.message || 'Enrollment failed');
    }
  };

  useEffect(() => {
    fetchCourses();
    // if (token) fetchEnrollments();
  });

  // if (!token) {
  //   return (
  //     <div style={{ padding: 20 }}>
  //       <h2>Login</h2>
  //       <input
  //         placeholder="Enter Student ID"
  //         value={studentId}
  //         onChange={(e) => setStudentId(e.target.value)}
  //       />
  //       <button onClick={handleLogin}>Login</button>
  //     </div>
  //   );
  // }

 return (
  <div style={{ backgroundColor: '#1c1c1e', minHeight: '100vh', paddingBottom: '2rem' }}>
  <Container className="py-5">
    <h1 className="mb-4 text-center text-light fw-bold py-3 rounded bg-dark shadow">
      🎓 Explore Our Courses
    </h1>

    <Row xs={1} md={2} lg={3} className="g-4">
      {courses.map((course) => (
        <Col key={course._id}>
          <Card
            className="h-100 border-0 shadow-sm text-light"
            style={{
              backgroundColor: '#2a2a2e', // Slightly lighter than outer background
              borderRadius: '1rem',
            }}
          >
            <Card.Body className="d-flex flex-column justify-content-between">
              <div>
                <Card.Title
                  className="fs-4 fw-bold mb-2"
                  style={{
                    color: '#ffffff',
                    textShadow: '1px 1px 2px #000',
                    letterSpacing: '0.5px',
                  }}
                >
                  📘 {course.title}
                </Card.Title>
                <Card.Text style={{ color: '#b5b5b5' }}>
                  {course.description}
                </Card.Text>
                <p className="mb-1">
                  <strong className="text-info">Instructor:</strong>{' '}
                  <span className="fw-medium text-light">{course.instructor}</span>
                </p>
                <p>
                  <Badge bg="secondary" text="light">
                    ⏱ {course.duration}
                  </Badge>
                </p>
              </div>

              <div className="mt-3">
                {enrolled.includes(course._id) ? (
                  <Button variant="success" disabled className="w-100 fw-semibold">
                    ✅ Enrolled
                  </Button>
                ) : (
                  <Button
                    variant="outline-warning"
                    className="w-100 fw-semibold"
                    onClick={() => handleEnroll(course._id)}
                  >
                    🚀 Enroll Now
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
</div>
 );
};


export default App;
