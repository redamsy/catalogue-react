import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBarWrapper from "../../components/AppBarWrapper";

const theme = createTheme();

export default function Home(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <AppBarWrapper
        pageName="Home"
        buttonIcon={<ListAltIcon />}
        buttonPath="products">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <HomeIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Home
            </Typography>
          </Box>
        </Container>
      </AppBarWrapper>
    </ThemeProvider>
  );
}
