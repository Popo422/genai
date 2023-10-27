import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "@/scenes/navbar";
import "@/scenes/homePage/index.css";
import WidgetWrapper from "@/components/WidgetWrapper";
import FlexBetween from "../../components/FlexBetween";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath, firstName, lastName } = useSelector((state) => state.user);
  return (
    <Box>
      <Navbar />
      <FlexBetween>
        <Box hei></Box>
      <Box display="grid">
        <WidgetWrapper className="suggestions">test</WidgetWrapper>
        <WidgetWrapper className="suggestions">test</WidgetWrapper>
        <WidgetWrapper className="suggestions">test</WidgetWrapper>
      </Box>
      </FlexBetween>
    </Box>
  );
};

export default HomePage;
