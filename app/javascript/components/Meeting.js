import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const Meeting = () => {
  const [users, setUsers] = useState([]);
  const { id } = useParams();

  const [username, setUsername] = useState('');

  const onChange = (e) => {
    setUsername(e.target.value);
  };

  const unselected = (arr) => {
    return arr.filter((user) => user.selected === 0);
  };

  const selected = (arr) => {
    return arr.filter((user) => user.selected !== 0).sort((a, b) => b.selected - a.selected);
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

  const randomize = async () => {
    const arr = unselected(users);
    let user = arr[Math.floor(Math.random()*arr.length)];
    const selectArr = selected(users);
    let last = (selectArr.length === 0) ? 0 : Math.max(...selectArr.map(user => user.selected));
    user.selected += 1;
    await axios.put(`http://127.0.0.1:3000/v1/meetings/${id}/users/${user.id}`, user)
      .then((response) => {
        if (response.status == 200) {
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
        {(unselected(users).length === 0)
          ? <p>No participants yet.</p>
          : <ul>
            {unselected(users).map((user) => (
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
      <div>
        <Button onClick={randomize}>Pick Random</Button>
      </div>
    </>
  );
}

export default Meeting;