import * as React from "react";
import HomeIcon from "@mui/icons-material/Home";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import AppBarWrapper from "../../components/AppBarWrapper";
import Tabs from "../../components/Tabs";

export default function Dashboard(): JSX.Element {
  return (
    <AppBarWrapper
      pageName="Dashboard"
      buttonIcon={<HomeIcon />}
      buttonPath="">
      <Container component="main" maxWidth='xl'>
        <CssBaseline />
        <Tabs/>
      </Container>
    </AppBarWrapper>
  );
}
