import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const Meeting = () => {
  const [users, setUsers] = useState([]);
  const { id } = useParams();
  let selected = [];

  const [username, setUsername] = useState('');

  const onChange = (e) => {
    setUsername(e.target.value);
  };

  const fetchUsers = () => {
    axios.get(`http://127.0.0.1:3000/v1/meetings/${id}/users`)
      .then((response) => {
        setUsers(response.data);
      });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: username,
      meeting_id: id,
    };
    await axios.post(`http://127.0.0.1:3000/v1/meetings/${id}/users`, data)
      .then((response) => {
        if (response.status == 200) {
          setUsername('');
          fetchUsers();
        }
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div>
        <h1>This is the meeting you've just created</h1>
        {(users.filter((user) => !user.selected).length === 0)
          ? <p>No participants yet.</p>
          : <ul>
            {users.filter((user) => !user.selected).map((user) => (
              <li key={user.id}>
                <span>{user.name}</span>
              </li>
            ))}
          </ul>
        }
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label>Participant name</Form.Label>
              <Form.Control name="username" type="text" value={username} onChange={onChange} />
            </Form.Group>
            <Button type="submit">
              Add
            </Button>
          </Form>
      </div>
    </>
  );
}

export default Meeting;