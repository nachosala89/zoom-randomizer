import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Meeting = () => {
  const [users, setUsers] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://127.0.0.1:3000/v1/meetings/${id}/users`)
      .then((response) => {setUsers(response.data)});
  }, []);

  //Todo: implement selected and unselected in state
  
  return (
    <>
      <h1>This is the meeting you've just created</h1>
      {(users.length === 0)
        ? <p>No participants yet.</p>
        : <ul>
          {users.map((user) => (
            <li key={user.id}>
              <span>{user.name}</span>
            </li>
          ))}
        </ul>
      }
    </>
  );
}

export default Meeting;