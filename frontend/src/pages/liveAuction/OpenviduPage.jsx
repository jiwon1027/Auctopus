import React, { Component, useState } from "react";
import "regenerator-runtime/runtime";
import OpenViduSession from "openvidu-react";
import axios from "axios";
import styled from "styled-components";

const APPLICATION_SERVER_URL = "http://localhost:5000/";

export default function AppFunc() {
  const [session, setSession] = useState(undefined);
  const [mySessionId, setMySessionId] = useState("SessionA");
  const [myUserName, setMyUserName] = useState("SangGi");
  const [token, setToken] = useState();

  const handlerJoinSessionEvent = () => {
    console.log("Join session");
  };

  const handlerLeaveSessionEvent = () => {
    console.log("Leave session");
    setSession(undefined);
  };

  const handlerErrorEvent = () => {
    console.log("Leave session");
  };

  const handleChangeSessionId = (e) => {
    // TODO : event onChange type set
    setMySessionId(e.target.value);
  };

  const handleChangeUserName = (e) => {
    // TODO : event onChange type set
    setMyUserName(e.target.value);
  };

  const joinSession = async (event) => {
    event.preventDefault();
    if (mySessionId && myUserName) {
      const token = await getToken();
      setToken(token);
      setSession(true);
    }
  };

  const getToken = async () => {
    const sessionId = await createSession(mySessionId);
    return await createToken(sessionId);
  };

  const createSession = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions",
      { customSessionId: sessionId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log(response);
    return response.data; // The sessionId
  };

  const createToken = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions/" + sessionId + "/connections",
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The token
  };

  return (
    <div>
      {session === undefined ? (
        <SessionBox>
          <div id="join-dialog">
            <h1> 입장하기 </h1>
            <form onSubmit={joinSession}>
              <p>
                <label>Participant: </label>
                <input
                  type="text"
                  id="userName"
                  value={myUserName}
                  onChange={handleChangeUserName}
                  required
                />
              </p>
              <p>
                <label> Session: </label>
                <input
                  type="text"
                  id="sessionId"
                  value={mySessionId}
                  onChange={handleChangeSessionId}
                  required
                />
              </p>
              <p>
                <input name="commit" type="submit" value="JOIN" />
              </p>
            </form>
          </div>
        </SessionBox>
      ) : (
        <SessionBox>
          <OpenViduSession
            id="opv-session"
            sessionName={mySessionId}
            user={myUserName}
            token={token}
            joinSession={handlerJoinSessionEvent}
            leaveSession={handlerLeaveSessionEvent}
            error={handlerErrorEvent}
          />
        </SessionBox>
      )}
    </div>
  );
}

const SessionBox = styled.div`
  position: absolute;
  margin: auto;
  top: 100px;
  bottom: 0;
  left: 0;
  right: 0;
  width: 390px;
  height: 70%;

  .MuiButtonBase-root {
    width: 150px;
  }

  .MuiSvgIcon-root {
    color: red;
  }

  .buttonsContent {
    height: 250px;
  }
`;
