import React from "react";
import { Container, Card, Row, Col, Button, ListGroup } from "react-bootstrap";

const UserProfile = () => {
  // Static dummy user
  const user = {
    studentId: "dummyStudent123",
    name: "Dummy User",
    email: "dummyuser@example.com",
    joinedOn: "2024-07-01T00:00:00Z",
    avatar: "https://i.pravatar.cc/150?img=65", // Random avatar placeholder
  };

  return (
    <div style={{ backgroundColor: "#1c1c1e", minHeight: "100vh", paddingTop: "2rem" }}>
      <Container>
        <h2 className="text-center text-light mb-4">👤 User Profile</h2>
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="bg-dark text-light shadow-lg rounded-4">
              <Card.Body>
                <div className="text-center mb-4">
                  <img
                    src={user.avatar}
                    alt="User Avatar"
                    className="rounded-circle border border-secondary"
                    style={{ width: "100px", height: "100px" }}
                  />
                </div>

                <ListGroup variant="flush" className="mb-3">
                  <ListGroup.Item className="bg-dark text-light">
                    <strong>👤 Name:</strong> {user.name}
                  </ListGroup.Item>
                  <ListGroup.Item className="bg-dark text-light">
                    <strong>📧 Email:</strong> {user.email}
                  </ListGroup.Item>
                  <ListGroup.Item className="bg-dark text-light">
                    <strong>🆔 Student ID:</strong> {user.studentId}
                  </ListGroup.Item>
                  <ListGroup.Item className="bg-dark text-light">
                    <strong>📅 Joined:</strong>{" "}
                    {new Date(user.joinedOn).toLocaleDateString()}
                  </ListGroup.Item>
                </ListGroup>

               
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserProfile;
