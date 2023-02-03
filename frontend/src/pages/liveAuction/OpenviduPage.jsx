import React, { useState } from "react";
import "regenerator-runtime/runtime";
import OpenViduSession from "openvidu-react";
import axios from "axios";

const APPLICATION_SERVER_URL = "http://localhost:5000/";

export default function AppFunc() {
  const [state, setState] = useState({
    session: undefined,
    mySessionId: "SessionA",
    myUserName: "OpenVidu_User_" + Math.floor(Math.random() * 100),
    token: undefined,
  });

  function handlerJoinSessionEvent() {
    console.log("Join session");
  }

  function handlerLeaveSessionEvent() {
    console.log("Leave session");
    setState((prev) => ({ ...prev, session: undefined }));
  }

  function handlerErrorEvent() {
    console.log("Leave session");
  }

  function handleChangeSessionId(e) {
    setState((prev) => ({ ...prev, mySessionId: e.target.value }));
  }

  function handleChangeUserName(e) {
    setState((prev) => ({ ...prev, myUserName: e.target.value }));
  }

  async function joinSession(event) {
    event.preventDefault();
    if (state.mySessionId && state.myUserName) {
      const token = await getToken();
      setState((prev) => ({ ...prev, token, session: true }));
    }
  }

  async function getToken() {
    const sessionId = await createSession(state.mySessionId);
    return await createToken(sessionId);
  }

  async function createSession(sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions",
      { customSessionId: sessionId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The sessionId
  }

  async function createToken(sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions/" + sessionId + "/connections",
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The token
  }

  return (
    <div>
      {state.session === undefined ? (
        <div id="join">
          <div id="join-dialog">
            <h1> Join a video session </h1>
            <form onSubmit={joinSession}>
              <p>
                <label>Participant: </label>
                <input
                  type="text"
                  id="userName"
                  value={state.myUserName}
                  onChange={handleChangeUserName}
                  required
                />
              </p>
              <p>
                <label> Session: </label>
                <input
                  type="text"
                  id="sessionId"
                  value={state.mySessionId}
                  onChange={handleChangeSessionId}
                  required
                />
              </p>
              <p>
                <input name="commit" type="submit" value="JOIN" />
              </p>
            </form>
          </div>
        </div>
      ) : (
        <div id="session">
          <OpenViduSession
            id="opv-session"
            sessionName={state.mySessionId}
            user={state.myUserName}
            token={state.token}
            joinSession={handlerJoinSessionEvent}
            leaveSession={handlerLeaveSessionEvent}
            error={handlerErrorEvent}
          />
        </div>
      )}
    </div>
  );
}
