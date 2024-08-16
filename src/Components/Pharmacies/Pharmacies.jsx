import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  TextField,
  Button,
  Grid,
  Container,
  Box,
  Rating,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FaRegFrownOpen } from "react-icons/fa";
import {
  calculateAverageRating,
  convertToArabicNumerals,
} from "../../Common/Helper/helper";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchPharamacy } from "../../redux/Actions/pharamacyActions";
import PhoneIcon from "@mui/icons-material/Phone";

const Pharmacies = () => {
  const [nameFilter, setNameFilter] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pharamacy } = useSelector((state) => state.pharamacy);
  const status = useSelector((state) => state.pharamacy.status);
  const error = useSelector((state) => state.pharamacy.error);

  useEffect(() => {
    dispatch(fetchPharamacy()); // Fetch new data
  }, [dispatch]);
  useEffect(() => {
    if (status === "failed") {
      toast.error(`${error?.payload?.response?.data?.msg}`);
    }
  }, [status, error]);

  // Ensure `pharamacy` is an array
  const filteredLabs = Array.isArray(pharamacy)
    ? pharamacy.filter((lab) =>
        lab.name.toLowerCase().includes(nameFilter.toLowerCase())
      )
    : [];

  const handleRating = (ratings) => {
    return ratings?.length ? calculateAverageRating(ratings) : 0;
  };

  if (status === "loading") {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh", // Adjust as needed to center vertically
          textAlign: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <h1>الصيدليات</h1>
      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        <TextField
          label="بحث بالاسم"
          variant="outlined"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          fullWidth
        />
      </Box>
      <Grid container spacing={3}>
        {filteredLabs.length > 0 ? (
          filteredLabs.map((lab) => (
            <Grid item xs={12} sm={6} md={4} key={lab._id}>
              <Card
                sx={{ maxWidth: 345 }}
                onClick={() => navigate(`/pharamcy_profile/${lab._id}`)}
              >
                <CardActionArea>
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Typography gutterBottom variant="h5" component="div">
                        صيدلية{" "}{lab.name}
                      </Typography>
                      <Rating
                        value={handleRating(lab.ratings)}
                        readOnly
                        precision={0.5}
                      />
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      paragraph
                    >
                      الصيدلية توفر خدمات صحية متميزة، مع توصيل سريع وموثوق
                      للأدوية
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <LocationOnIcon sx={{ color: "blue" }} />{" "}
                      {/* Blue color for location icon */}
                      <Typography
                        variant="body2"
                        color="text.primary"
                        sx={{ ml: 1 }}
                      >
                        {lab.location}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <PhoneIcon sx={{ color: "green" }} />{" "}
                      {/* Green color for phone icon */}
                      <Typography
                        variant="body2"
                        color="text.primary"
                        sx={{ ml: 1 }}
                      >
                        {convertToArabicNumerals(lab.phone)}
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/medical_profile/${lab._id}`)}
                  >
                    تفاصيل أكثر
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <Box textAlign="center" sx={{ width: "100%" }}>
            <FaRegFrownOpen style={{ fontSize: 100, color: "gray" }} />
            <Typography variant="h4" color="gray" sx={{ mt: 2 }}>
              لا يتوافر صيدليات
            </Typography>
          </Box>
        )}
      </Grid>
    </Container>
  );
};

export default Pharmacies;
