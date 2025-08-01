import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Spinner } from 'react-bootstrap';
import axios from 'axios';

const EnrollmentList = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = 'http://localhost:5000/api';

  // Fetch all courses
  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${API}/courses`);
      setCourses(res.data);
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  };

  // Fetch user enrollments
  const fetchEnrollments = async () => {
    try {
      const res = await axios.get(`${API}/enrollments/me`);
      setEnrollments(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching enrollments:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchEnrollments();
  }, []);

  const handleDisenroll = async (courseId) => {
    if (!window.confirm('Are you sure you want to disenroll?')) return;

    try {
      await axios.delete(`${API}/enrollments/${courseId}`);
      setEnrollments((prev) => prev.filter((id) => id !== courseId));
    } catch (err) {
      alert('Error disenrolling');
      console.error(err);
    }
  };

  const enrolledCourses = courses.filter((course) =>
    enrollments.includes(course._id)
  );

  return (
    <div style={{ backgroundColor: '#121212', minHeight: '100vh', paddingBottom: '2rem', paddingTop: '2rem' }}>
  <Container>
    <h2 className="text-center text-white py-3 mb-4 rounded" style={{ background: 'linear-gradient(to right, #3a3f51, #2b2f3e)' }}>
      📋 Enrolled Courses
    </h2>

    {loading ? (
      <div className="text-center py-5">
        <Spinner animation="border" variant="info" />
      </div>
    ) : enrolledCourses.length === 0 ? (
      <p className="text-center text-muted fs-5">You are not enrolled in any courses yet.</p>
    ) : (
      <div className="table-responsive">
        <Table bordered hover variant="dark" className="rounded shadow-lg overflow-hidden">
          <thead>
            <tr style={{ backgroundColor: '#1f1f1f' }} className="text-warning text-center">
              <th>#</th>
              <th>Course Title</th>
              <th>Instructor</th>
              <th>Duration</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {enrolledCourses.map((course, idx) => (
              <tr key={course._id} className="align-middle text-light text-center">
                <td>{idx + 1}</td>
                <td className="fw-semibold text-info">{course.title}</td>
                <td>{course.instructor}</td>
                <td>
                  <span className="badge bg-secondary px-3 py-2">{course.duration}</span>
                </td>
                <td>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDisenroll(course._id)}
                    className="px-3 fw-bold"
                  >
                    ❌ Disenroll
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )}
  </Container>
</div>
  )
};

export default EnrollmentList;
