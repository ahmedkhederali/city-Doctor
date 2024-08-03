import {  Divider, Stack, Typography } from "@mui/material";
import React from "react";
import "./footer.css";



export const CopyRights= () => {
  return (
    <Stack className="footer-copy-rights">
      <Divider
        variant="fullWidth"
        flexItem
        sx={{
          maxWidth: "80vw",
          margin: "0 auto",
          opacity: 0.2,
        }}
      />
      <Stack>
        <Typography className="copy-rights-text">3lolo © Copyright 2024, All Rights Reserved</Typography>
        {/* <Box>
          <Typography>Designed By </Typography>
          <Typography> IMMRSV</Typography>
        </Box> */}
      </Stack>
    </Stack>
  );
};
