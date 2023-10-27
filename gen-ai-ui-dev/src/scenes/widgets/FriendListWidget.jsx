import { ChatBubbleOutlineOutlined } from "@mui/icons-material";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import Chat from "./LiveChat/Chat";
const FriendListWidget = ({ userId, name }) => {
  const [friend, setFriend] = useState("");
  const [room, setRoom] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };
  useEffect(() => {
    getFriends();
  }, []);

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column">
        {friends.map((friend) => {
          return (
            <Box>
              <Box 
              padding="1rem 0"
                display="flex"
                flexDirection="row"
                gap="0.5rem"
                justifyContent="space-between"
              >
                <Friend
                  key={friend._id}
                  friendId={friend._id}
                  name={`${friend.firstName} ${friend.lastName}`}
                  subtitle={friend.occupation}
                  userPicturePath={friend.picturePath}
                />
                <Box>
                  <ChatBubbleOutlineOutlined
                    color={palette.neutral.dark}
                    // onClick={setIsChatOpen(!isChatOpen)}
                    onClick={() => {
                      setIsChatOpen(!isChatOpen);
                      setRoom(friend.id);
                      setFriend(`${friend.firstName} ${friend.lastName}`);
                    }}
                  />
                  <Typography
                    color={palette.neutral.dark}
                    variant="h5"
                    fontWeight="500"
                  >
                    {" "}
                    Chat
                  </Typography>
                </Box>
              </Box>
              <Divider/>
            </Box>
          );
        })}
      </Box>
      {isChatOpen ? <Chat friend={friend} username={name} room={room} /> : ""}
    </WidgetWrapper>
  );
};
export default FriendListWidget;
