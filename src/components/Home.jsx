import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { INVALID_GROUP, JOIN_GROUP, NEW_GROUP, VALID_GROUP } from "./constants";

function Home({socket}) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [roomId, setroomId] = useState("");

  useEffect(() => {
    if (!socket) return;
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);

      switch (message.type) {

        case VALID_GROUP:
          console.log("Navigating to new room")
          // navigate
          navigate(`/room/${roomId}`, {
            state: {
              userName,
            },
          });
          break;
        
        case INVALID_GROUP:
          console.log("Invalid room");
          break;

        default:
            break;
        
      }
    };
  }, [socket]);

  if (!socket) return <div>Connecting to backend.....</div>;

  const generateRoom = (e) => {
    e.preventDefault();
    const id = uuidv4();
    setroomId(id);
    console.log(id);
    socket.send(
      JSON.stringify({
        type: NEW_GROUP,
        roomId: String(id),
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!roomId || !userName) return;

    socket.send(
      JSON.stringify({
        type: JOIN_GROUP,
        userName,
        socket,
        roomId,
      })
    );
  };


  return (
    <div className="container-home">
      <div className="home">
        <h1 className="logo">Welcome to CodeStream</h1>
        <h4 className="sub-header">Stream Code with your Buddy</h4>
        <form action="" onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            value={userName}
            placeholder="UserName"
            className="input-field"
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="text"
            value={roomId}
            placeholder="RoomId"
            className="input-field"
            onChange={(e) => setroomId(e.target.value)}
          />
          <button type="submit" className="join-btn">
            Join In
          </button>
        </form>

        <h4 className="sub-header">
          Dont Have a roomId{"? "}
          <a onClick={generateRoom} href="" className="new-room-btn">
            Create One {"!"}
          </a>
        </h4>
      </div>
    </div>
  );
}

export default Home;
