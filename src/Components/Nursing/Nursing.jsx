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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FaRegFrownOpen } from "react-icons/fa";
import {
  calculateAverageRating,
  convertToArabicNumerals,
} from "../../Common/Helper/helper";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMedicalLabs } from "../../redux/Actions/medicalLabsActions";
import { toast } from "react-toastify";
import { Phone } from "@mui/icons-material";
import { fetchNursings } from "../../redux/Actions/nursingActions";
import {
  Home as HomeIcon,
  School as SchoolIcon,
  LocationOn as LocationOnIcon,
  Phone as PhoneIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";
const Nursing = () => {
  const [nameFilter, setNameFilter] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [genderFilter, setGenderFilter] = useState(""); // State for gender filter

  const { nursingData } = useSelector((state) => state.all_nursing);
  const status = useSelector((state) => state.all_nursing.status);
  const error = useSelector((state) => state.all_nursing.error);

  useEffect(() => {
    dispatch(fetchNursings()); // Fetch new data
  }, [dispatch]);

  useEffect(() => {
    if (status === "failed") {
      toast.error(`${error?.payload?.response?.data?.msg}`);
    }
  }, [status, error]);

  // Ensure `nursingData` is an array
  const filteredLabs = Array.isArray(nursingData)
  ? nursingData.filter((nursingPerson) =>
      nursingPerson.name.toLowerCase().includes(nameFilter.toLowerCase())
    ).filter((nursingPerson) =>
      genderFilter === "" || nursingPerson.sex === genderFilter
    )
  : [];
  console.log("nursingData", nursingData);
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
  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };
  return (
    <Container>
      <h1>قسم التمريض</h1>
      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        <TextField
          label="بحث بالاسم"
          variant="outlined"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          fullWidth
        />
        <FormControl fullWidth variant="outlined">
          <InputLabel>تصفية حسب الجنس</InputLabel>
          <Select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            label="تصفية حسب الجنس"
          >
            <MenuItem value="">الكل</MenuItem>
            <MenuItem value="male">ذكر</MenuItem>
            <MenuItem value="female">أنثى</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={3}>
        {filteredLabs.length > 0 ? (
          filteredLabs.map((nursingPerson) => (
            <Grid item xs={12} sm={6} md={4} key={nursingPerson._id}>
              <Card
                sx={{ maxWidth: 345 }}
                onClick={() =>
                  navigate(`/nursing_profile/${nursingPerson._id}`)
                }
              >
                <CardActionArea>
                  <CardContent>
                    {/* Name and Rating */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Typography gutterBottom variant="h5" component="div">
                        {nursingPerson.name}
                      </Typography>
                      <Rating
                        value={handleRating(nursingPerson.ratings)}
                        readOnly
                        precision={0.5}
                      />
                    </Box>

                    {/* Image */}
                    <Box
                      sx={{ display: "flex", justifyContent: "center", mb: 2 }}
                    >
                      <img
                        src={nursingPerson.image.url}
                        alt={nursingPerson.name}
                        style={{
                          width: "100%",
                          height: "auto",
                          borderRadius: "8px",
                        }}
                      />
                    </Box>

                    {/* Description */}
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <DescriptionIcon color="action" />
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ ml: 1 }}
                      >
                        {nursingPerson.descrption}
                      </Typography>
                    </Box>

                    {/* Workplace and Degree */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 2,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <HomeIcon color="action" />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ ml: 1 }}
                        >
                          {nursingPerson.work_place}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <SchoolIcon color="action" />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ ml: 1 }}
                        >
                          {nursingPerson.degree}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Address and Phone */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 2,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <LocationOnIcon color="action" />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ ml: 1 }}
                        >
                          {nursingPerson.address}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <PhoneIcon color="action" />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ ml: 1 }}
                        >
                          {convertToArabicNumerals(nursingPerson.phone)}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </CardActionArea>

                {/* More Details Button */}
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      navigate(`/nursing_profile/${nursingPerson._id}`)
                    }
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
              لا يوجد ممرضين
            </Typography>
          </Box>
        )}
      </Grid>
    </Container>
  );
};

export default Nursing;
