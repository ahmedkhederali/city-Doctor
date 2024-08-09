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
  Divider,
  TextField,
  InputAdornment,
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
import { translateDayAndTime } from "../../Common/Helper/helper";

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
  if (status === "loading" || !doctors) {
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
        <FaRegFrownOpen style={{ fontSize: 100, color: "gray" }} />
        <Typography variant="h4" color="gray" sx={{ mt: 2 }}>
          لا توجد بيانات
        </Typography>
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
          الأطباء المتخصصون في {specialistName}{" "}
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
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {filteredDoctors.map((doctor) => (
            <Card
              key={doctor._id}
              sx={{
                width: { xs: "100%", sm: "calc(50% - 16px)" }, // Full width on mobile, half width on larger screens
                p: 2,
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Add box shadow
                borderRadius: 2, // Optional: Add border radius
                cursor: "pointer",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
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
                        onClick={() => navigate(`/doctor_profile/${doctor._id}`)} // Redirect on click

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
                          {doctor.phone}
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
                          السعر: {doctor.detection_price} جنيه
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
                          الانتظار: {doctor.wait_time} دقيقة
                        </Typography>
                      </Box>
                    </CardContent>
                  </Box>
                </Grid>

                {/* Divider between columns */}
                <Divider orientation="vertical" flexItem />

                {/* Second Column with Accordion */}
                <Grid item xs={12} md={5}>
                <Accordion
                    expanded={expanded === doctor._id}
                    onChange={() =>
                      setExpanded(expanded === doctor._id ? false : doctor._id)
                    }
                  >
                    <AccordionSummary
                      expandIcon={<FaChevronDown />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>
                        {expanded === doctor._id
                          ? "اخفاء مواعيد الدكتور"
                          : "إظهار مواعيد عمل الدكتور"}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <TableContainer component={Paper}>
                        <Table size="small" aria-label="doctor working hours">
                          <TableHead>
                            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                              <TableCell>اليوم</TableCell>
                              <TableCell>وقت البدء</TableCell>
                              <TableCell>وقت الانتهاء</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                          {doctor.time_for_works.map((time) => {
                          const {
                            translatedDay,
                            translatedTime,
                          } = translateDayAndTime(
                            time.day,
                            time.start_time
                          );
                          return (
                            <TableRow key={time._id}>
                              <TableCell>{translatedDay}</TableCell>
                              <TableCell>{translatedTime}</TableCell>
                              <TableCell>
                                {translateDayAndTime(
                                  time.day,
                                  time.end_time
                                ).translatedTime}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </Grid>
            </Card>
          ))}
        </Box>
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







