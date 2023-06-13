import * as React from "react";
import HomeIcon from "@mui/icons-material/Home";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Container from "@mui/material/Container";
import AppBarWrapper from "../../components/AppBarWrapper";
import ProductTable from "../../components/ProductTable";

export default function ProductPage(): JSX.Element {
  return (
    <AppBarWrapper
      pageName="Product Dashboard"
      buttonIcon={<HomeIcon />}
      buttonPath="">
      <Container component="main" maxWidth='xl'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
          }}>
          <ProductTable />
        </Box>
      </Container>
    </AppBarWrapper>
  );
}
