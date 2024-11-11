import React from 'react';
import { Nav, Navbar, Tab, Row, Col, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Import Routes
import About from "./About";
import UserTab from "./UserTab";
import Dashboard from "./Dashboard";

function App() {
    return (
        <Router> {/* Wrap the entire app in Router */}
            <div>
                {/* Navigation Bar */}
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand href="#home">User Management</Navbar.Brand>
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link> {/* Link to Home page */}
                        <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                        <Nav.Link as={Link} to="/userTab">Manage Users</Nav.Link>
                        <Nav.Link as={Link} to="/about">About</Nav.Link> {/* Link to About page */}
                    </Nav>
                </Navbar>

                {/* Main Content with Tabs */}
                <Container className="mt-3">
                    <Routes> {/* Use Routes instead of Switch */}
                        <Route path="/" />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/userTab" element={<UserTab />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </Container>
            </div>
        </Router>
    );
}

export default App;
