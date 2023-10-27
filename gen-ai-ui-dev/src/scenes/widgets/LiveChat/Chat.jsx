import "./LiveChat.css";
import MinimizeOutlinedIcon from "@mui/icons-material/MinimizeOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import io from "socket.io-client";
import { Box, InputBase, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
const socket = io.connect("http://localhost:3001");

function Chat({ username, room, friend }) {
  const { palette } = useTheme();
  const alt = palette.background.alt;
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const primaryDark = palette.primary.dark;
  const primaryLight = palette.primary.light;
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [showChatBody, setShowChatBody] = useState(true);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <WidgetWrapper>
      <div className="chat-window">
        <FlexBetween className="chat-header" backgroundColor={medium}>
          <Typography
            sx={{ color: "white", margin: "0.5rem 0", pl: "1rem" }}
            onClick={() => setShowChatBody(true)}
          >
            {friend}
          </Typography>
          <Box width="4.25rem" display="flex" justifyContent="space-between">
            <VideocamOutlinedIcon />
            <MinimizeOutlinedIcon
              onClick={() => setShowChatBody(!showChatBody)}
            />
          </Box>
        </FlexBetween>
        {showChatBody ? (
          <div>
            <Box className="chat-body" backgroundColor={alt}>
              <ScrollToBottom className="message-container">
                {messageList.map((messageContent) => {
                  return (
                    <div
                      className="message"
                      id={username === messageContent.author ? "you" : "other"}
                    >
                      <div>
                        <div className="message-content">
                          <p>{messageContent.message}</p>
                        </div>
                        <div className="message-meta">
                          <p id="time">{messageContent.time}</p>
                          <p id="author">{messageContent.author}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </ScrollToBottom>
            </Box>
            <Box
              className="chat-footer"
              // backgroundColor={`${medium} !important`}
            >
              <InputBase
                width="12.7rem"
                type="text"
                value={currentMessage}
                placeholder="Hey..."
                onChange={(event) => {
                  setCurrentMessage(event.target.value);
                }}
                onKeyPress={(event) => {
                  event.key === "Enter" && sendMessage();
                }}
              />
              <button onClick={sendMessage}>&#9658;</button>
            </Box>
          </div>
        ) : (
          ""
        )}
      </div>
    </WidgetWrapper>
  );
}

export default Chat;
