import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
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
    user.selected = last + 1;
    await axios.put(`http://127.0.0.1:3000/v1/meetings/${id}/users/${user.id}`, user)
      .then((response) => {
        if (response.status == 200) {
          fetchUsers();
        }
      });
  };

  const reset = async () => {
    await axios.put(`http://127.0.0.1:3000/v1/meetings/${id}/reset`)
    .then((response) => {
      if (response.status == 200) {
        fetchUsers();
      }
    });
  }

  const removeUser = async (userId) => {
    await axios.delete(`http://127.0.0.1:3000/v1/meetings/${id}/users/${userId}`)
      .then((response) => {
        if (response.status == 200) {
          fetchUsers();
        }
      });
  }

  useEffect( () => {
    fetchUsers();
    setInterval(() => {
      fetchUsers();
    }, 5000);
  }, []);

  const copyURL = () => {
    navigator.clipboard.writeText(window.location.href);
  }

  return (
    <div className="container mt-3 mb-5">
      <ul>
        <li className="text-center">Share this link with your partners.</li>
        <li className="d-flex justify-content-center">
          <div className="p-1 link-box">
            <span>{window.location.href}</span>
            <button className="small-btn ms-2" onClick={copyURL}>COPY</button>
          </div>
        </li>
        <li className="text-center">Ask them to add their names. Or you can do it yourself.</li>
      </ul>
      <div className="row mt-4">
        <div className="col-md-3 offset-md-1 participants">
          <Form onSubmit={handleSubmit}>
            <div className="d-flex">
              <Form.Group controlId="username">
                <Form.Control name="username" type="text" value={username} onChange={onChange} placeholder="Name" />
              </Form.Group>
              <button className="small-btn align-self-end" type="submit">
                ADD
              </button>
            </div>
          </Form>
          {(unselected(users).length === 0)
            ? <p>No participants to choose.</p>
            : <table className="table">
                <tbody>
                {unselected(users).map((user) => (
                  <tr key={user.id}>
                    <td>
                      <span>{user.name}</span>
                    </td>
                    <td>
                      <FontAwesomeIcon icon={faX} onClick={() => removeUser(user.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          }
        </div>
        <div className="col-md-4 d-flex flex-column align-items-center">
          <button className="big-button p-4" onClick={randomize}>PICK<br/>RANDOM</button>
          {(selected(users).length === 0) ? '' 
            : <div>
                <div className="participants mt-2">Selected:</div>
                <p className="current-user text-center">{selected(users)[0].name}</p>
              </div>}
        </div>
        <div className="col-md-4 participants">
          {selected(users).length === 0 ? '' 
          : <button className="small-btn" onClick={reset}>RESET</button>}
            {selected(users).slice(1).length === 0 ? ''
              : <div>
                <span>Previous selected </span>
                <ul className="previous-selected">
                  {selected(users).slice(1).map((user) => (
                    <li key={user.id}>
                      <span>{user.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            }
        </div>
      </div>
    </div>
  );
}

export default Meeting;