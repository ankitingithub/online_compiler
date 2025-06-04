import React, { useEffect, useRef, useState } from "react";

import CodeEditor from "./CodeEditor";
import { Avatar, AvatarGroup, Box } from "@chakra-ui/react";
import {
  CODE_SYNC,
  GET_USERS,
  INVALID_GROUP,
  INVALID_USER,
  UPDATE_USERS,
} from "./constants";
import { useNavigate } from "react-router";

function Room({ socket }) {

  
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [val, setVal] = useState("");

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);

      switch (message.type) {
        case UPDATE_USERS:
          setUsers(message.users);
          break;

        case INVALID_USER:
          navigate(`/`);
          break;

        case CODE_SYNC:
          setVal(message.code);
          break;

        default:
          break;
      }
    };
  }, [socket]);

  if (!socket) return <h1>Invalid User</h1>;
  if (!users) {
    socket.send(
      JSON.stringify({
        type: GET_USERS,
      })
    );
  }

  return (
    <Box minH="100vh" bg="white" px={6} py={8}>
      <div className="side-panel">
        <h2 className="logo">CodeStream</h2>
        <AvatarGroup size="md" max={4}>
          {users.map((user) => (
            <Avatar name={user} bg="#fecc30" />
          ))}
        </AvatarGroup>
      </div>

      <CodeEditor socket={socket} val={val} setVal={setVal}/>
    </Box>
  );
}

export default Room;
