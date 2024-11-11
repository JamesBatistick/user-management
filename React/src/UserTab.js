import React, { useState } from 'react';
import { Nav, Navbar, Tab, Row, Col, Container } from 'react-bootstrap';
import UserForm from './UserForm';
import UserList from './UserList';

function UserTab() {
    const [users, setUsers] = useState([]);

    return (
        <Container>
            <Tab.Container id="left-tabs-example" defaultActiveKey="userForm">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="userForm">User Form</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="userList">User List</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="userForm">
                                <UserForm setUsers={setUsers} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="userList">
                                <UserList users={users} setUsers={setUsers} />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    )
};
export default UserTab;