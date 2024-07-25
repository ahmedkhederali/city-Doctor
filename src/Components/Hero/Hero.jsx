import * as React from "react";
import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import heroImage from "../../assets/hero.jfif"; // Adjust the path
export default function Hero() {
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: "100%",
        height: "50vh", // Full viewport height
        position: "relative",
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: alpha(theme.palette.common.black, 0.5), // Overlay color and opacity
          zIndex: 1,
        },
        "& > *": {
          position: "relative",
          zIndex: 2,
        },
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%", // Ensure container takes full height
          pt: { xs: 5, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: "100%", sm: "70%" } }}>
          <Typography
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
              fontSize: "clamp(3.5rem, 10vw, 4rem)",
              color: "white", // Text color to stand out against the overlay
            }}
          >
            اهتم &nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                fontSize: "clamp(3rem, 10vw, 4rem)",
                color: "white", // Ensure text color remains white
              }}
            >
              بصحتك
            </Typography>
          </Typography>
          <Typography
            textAlign="center"
            color="white" // Text color to stand out against the overlay
            sx={{ alignSelf: "center", width: { sm: "100%", md: "80%" } }}
          >
            رعاية صحية لحياة أفضل ليك
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
