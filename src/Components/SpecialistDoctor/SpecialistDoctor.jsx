import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Rating,
  IconButton,
  Badge,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { fetchSpecialties } from "../../redux/Actions/doctoBasedonSpecialist";
import { AppContext } from "../../contextApi/AppContext";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaPhone,
  FaRegFrownOpen,
  FaChevronDown, // Icon for accordion
} from "react-icons/fa";
import { MdOutlineAccessTime } from "react-icons/md";
import { convertToArabicNumerals, translateDayAndTime } from "../../Common/Helper/helper";

const SpecialistDoctor = () => {
  const { id } = useParams(); // Get the specialty ID from URL parameters
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { drawerFWidth } = useContext(AppContext);

  const { doctors, specialistName } = useSelector(
    (state) => state.doctor_specfic.items
  );
  const status = useSelector((state) => state.doctor_specfic.status);
  const error = useSelector((state) => state.doctor_specfic.error);
  const [expanded, setExpanded] = useState(false); // Track accordion expansion

  const [searchQuery, setSearchQuery] = useState(""); // State to manage the search query

  useEffect(() => {
    dispatch(fetchSpecialties(id)); // Dispatch the action to fetch doctors based on specialty ID
  }, [id, dispatch]);

  useEffect(() => {
    if (status === "failed") {
      toast.error(`${error?.payload?.response?.data?.msg}`);
    }
  }, [status, error]);

  // Filtered doctors list based on search query
  const filteredDoctors = doctors?.filter((doctor) =>
    doctor.doc_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Replace CircularProgress with a Not Found Message
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
    <Box
      sx={{
        marginLeft: { xs: 0, sm: `${drawerFWidth - 10}px` },
        padding: 2,
        transition: "margin 0.3s ease-out",
      }}
    >
      <Box display="flex" flexDirection="column" mb={2}>
        <Typography variant="h4" gutterBottom color="gray">
          الأطباء المتخصصون في {specialistName}
          {/* <Badge badgeContent={filteredDoctors.length} color="primary" sx={{ marginRight: 1 }} /> */}
        </Typography>
        
        {/* Search Bar */}
        <TextField
          label="بحث عن الطبيب"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ marginBottom: 2, padding: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaSearch />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {filteredDoctors?.length > 0 ? (
        <Grid container spacing={2}>
          {filteredDoctors.map((doctor) => (
            <Grid item xs={12} sm={6} md={4} key={doctor._id}>
              <Card
                sx={{
                  width: "100%", // Full width
                  minHeight: 330, // Set minimum width for the card
                  p: 2,
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Add box shadow
                  borderRadius: 2, // Optional: Add border radius
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/doctor_profile/${doctor._id}`)} // Redirect on click
              >
                <Box sx={{ display: "flex" }}>
                  <CardMedia
                    component="img"
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                    image={
                      doctor.doctor_img?.url || "default-doctor-image.jpg"
                    }
                    alt={doctor.doc_name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        color: "rgb(0, 112, 205)", // Set name color
                        fontSize: 18, // Increase font size
                      }}
                    >
                      {doctor.doc_name}
                    </Typography>
                    <Rating
                      value={doctor.rating}
                      readOnly
                      precision={0.5}
                      sx={{ mt: 1 }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ fontSize: 16, fontWeight: 500 }} // Increase font size and weight
                      color="textSecondary"
                    >
                      {doctor.small_desc?.length > 100
                        ? `${doctor.small_desc.slice(0, 100)}...`
                        : doctor.small_desc}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 1,
                      }}
                    >
                      <IconButton
                        size="small"
                        sx={{ color: "red" }} // Set icon color
                      >
                        <FaMapMarkerAlt />
                      </IconButton>
                      <Typography variant="body2">
                        {doctor.location}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 1,
                      }}
                    >
                      <IconButton
                        size="small"
                        sx={{ color: "green" }} // Set icon color
                      >
                        <FaPhone />
                      </IconButton>
                      <Typography variant="body2">
                        {convertToArabicNumerals(doctor.phone)}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 1,
                      }}
                    >
                      <IconButton
                        size="small"
                        sx={{ color: "blue" }} // Set icon color
                      >
                        <FaMoneyBillWave />
                      </IconButton>
                      <Typography variant="body2">
                        السعر: {convertToArabicNumerals(doctor.detection_price)} جنيه
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 1,
                      }}
                    >
                      <IconButton
                        size="small"
                        sx={{ color: "purple" }} // Set icon color
                      >
                        <MdOutlineAccessTime />
                      </IconButton>
                      <Typography variant="body2">
                        الانتظار: {convertToArabicNumerals(30)} دقيقة
                      </Typography>
                    </Box>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh",
          }}
        >
          <Box textAlign="center">
            <FaRegFrownOpen style={{ fontSize: 100, color: "gray" }} />
            <Typography variant="h4" color="gray" sx={{ mt: 2 }}>
              لا توجد بيانات
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SpecialistDoctor;
