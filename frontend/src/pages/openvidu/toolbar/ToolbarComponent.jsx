true; /* eslint-disable react/prop-types */
import React, { Component } from "react";
import "./ToolbarComponent.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import LogoImg from "@/assets/common/logo.png";
import Mic from "@mui/icons-material/KeyboardVoice";
import MicOff from "@mui/icons-material/MicOff";
import Videocam from "@mui/icons-material/Videocam";
import VideocamOff from "@mui/icons-material/VideocamOff";
import SwitchVideoIcon from "@mui/icons-material/SwitchVideo";
import Tooltip from "@mui/material/Tooltip";
import PowerSettingsNew from "@mui/icons-material/PowerSettingsNew";
import QuestionAnswer from "@mui/icons-material/QuestionAnswer";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { exitLive } from "@/api/auction";

function withRouterToolbar(Component) {
  // eslint-disable-next-line react/display-name
  return (props) => <Component {...props} navigate={useNavigate()} />;
}

class ToolbarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { fullscreen: false };
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
    this.screenShare = this.screenShare.bind(this);
    this.stopScreenShare = this.stopScreenShare.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
    this.navToAuction = this.navToAuction.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }

  micStatusChanged() {
    this.props.micStatusChanged();
  }

  camStatusChanged() {
    this.props.camStatusChanged();
  }

  screenShare() {
    this.props.screenShare();
  }

  stopScreenShare() {
    this.props.stopScreenShare();
  }

  toggleFullscreen() {
    this.setState({ fullscreen: !this.state.fullscreen });
    this.props.toggleFullscreen();
  }

  switchCamera() {
    this.props.switchCamera();
  }

  leaveSession() {
    this.props.leaveSession();
  }

  toggleChat() {
    this.props.toggleChat();
  }

  navToAuction() {
    const navigate = this.props.navigate;
    navigate(`/detail/${this.props.detailData.auctionInfo.auctionSeq}/bid`, {
      state: {
        auctionInfo: this.props.detailData.auctionInfo,
        userState: this.props.detailData.userState,
        limit: this.props.detailData.minCost,
      },
    });
  }

  handleExit() {
    const navigate = this.props.navigate;
    console.log(this.props.detailData.auctionInfo.auctionSeq);
    exitLive(this.props.detailData.auctionInfo.auctionSeq);
    navigate(-1);
  }

  render() {
    const mySessionId = this.props.sessionId;
    const localUser = this.props.user;
    const isBuyer = localUser !== undefined ? localUser.isBuyer : true;
    console.log(this.props.detailData);

    return (
      <AppBar className="toolbar" id="header">
        <Toolbar className="toolbar">
          {/* <img src={LogoImg} alt="logo " id="logo" style={{ width: "50px" }} /> */}
          <IconButton
            onClick={this.handleExit}
            color="inherit"
            className="navButton"
            id="navNextButton"
          >
            뒤로
          </IconButton>
          <div className="buttonsContent">
            <IconButton
              color="inherit"
              className="navButton"
              id="navMicButton"
              onClick={this.micStatusChanged}
            >
              {isBuyer ? (
                <MicOff color="secondary" />
              ) : localUser !== undefined && localUser.isAudioActive() ? (
                <Mic />
              ) : (
                <MicOff color="secondary" />
              )}
            </IconButton>

            <IconButton
              color="inherit"
              className="navButton"
              id="navCamButton"
              onClick={this.camStatusChanged}
            >
              {isBuyer ? (
                <VideocamOff color="secondary" />
              ) : localUser !== undefined && localUser.isVideoActive() ? (
                <Videocam />
              ) : (
                <VideocamOff color="secondary" />
              )}
            </IconButton>

            <IconButton
              color="inherit"
              className="navButton"
              onClick={this.switchCamera}
            >
              <SwitchVideoIcon />
            </IconButton>

            <IconButton
              color="inherit"
              onClick={this.toggleChat}
              id="navChatButton"
            >
              {this.props.showNotification && <div id="point" className="" />}
              <Tooltip title="Chat">
                <QuestionAnswer />
              </Tooltip>
            </IconButton>
            <IconButton
              color="secondary"
              className="navButton"
              onClick={this.leaveSession}
              id="navLeaveButton"
            >
              <PowerSettingsNew />
            </IconButton>
          </div>
          <IconButton
            onClick={this.navToAuction}
            color="inherit"
            className="navButton"
            id="navNextButton"
          >
            다음
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}
export default withRouterToolbar(ToolbarComponent);
