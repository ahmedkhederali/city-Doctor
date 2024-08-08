import React, { useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid"; // Import Grid component
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  CircularProgress,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Rating,
  IconButton,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
} from "@mui/material";
import { toast } from "react-toastify";
import { fetchSpecialties } from "../../redux/Actions/doctoBasedonSpecialist";
import { AppContext } from "../../contextApi/AppContext";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaPhone,
  FaRegFrownOpen,
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

  useEffect(() => {
    dispatch(fetchSpecialties(id)); // Dispatch the action to fetch doctors based on specialty ID
  }, [id, dispatch]);

  useEffect(() => {
    if (status === "failed") {
      toast.error(`${error?.payload?.response?.data?.msg}`);
    }
  }, [status, error]);

  if (status === "loading") return <CircularProgress />;

  return (
    <Box
      sx={{
        marginLeft: { xs: 0, sm: `${drawerFWidth - 10}px` },
        padding: 2,
        transition: "margin 0.3s ease-out",
      }}
    >
      {doctors ? (
        <>
          <Box display="flex" alignItems="center" mb={2}>
            <Typography variant="h4" gutterBottom color="gray" sx={{ textAlign: "center", fontSize:"2rem" }}>
              الأطباء المتخصصون في {doctors?.length > 0 && specialistName}
            </Typography>
            <Badge
              badgeContent={doctors?.length}
              color="primary"
              sx={{ marginLeft: 2,top:"-5px" }}
            />
          </Box>

          {doctors?.length === 0 ? (
            <Box sx={{ textAlign: "center", marginTop: 4 }}>
              <FaRegFrownOpen style={{ fontSize: 100, color: "gray" }} />
              <Typography variant="h6">
                لم يتم العثور على أطباء لهذا التخصص.
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {doctors?.map((doctor) => (
                <Card
                  key={doctor._id}
                  sx={{
                    width: { xs: "100%", sm: "calc(50% - 16px)" }, // Full width on mobile, half width on larger screens
                    p: 2,
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Add box shadow
                    borderRadius: 2, // Optional: Add border radius
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/${doctor._id}`)} // Redirect on click
                >
                  {/* Responsive Layout with Grid */}
                  <Grid container spacing={2}>
                    {/* First Column */}
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
                              الانتظار: {30} دقيقة
                            </Typography>
                          </Box>
                        </CardContent>
                      </Box>
                    </Grid>

                    {/* Divider between columns */}
                    <Divider orientation="vertical" flexItem />

                    {/* Second Column (Table) */}
                    <Grid item xs={12} md={5}>
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
                                    {
                                      translateDayAndTime(
                                        time.day,
                                        time.end_time
                                      ).translatedTime
                                    }
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  </Grid>
                </Card>
              ))}
            </Box>
          )}
        </>
      ) : (
        <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          textAlign: "center",
        }}
      >
        <FaRegFrownOpen style={{ fontSize: 100, color: "gray" }} />
        <Typography variant="h4" color="gray" sx={{ mt: 2 }}>
          لا توجد دكاتره
        </Typography>
      </Box>
      )}
    </Box>
  );
};

export default SpecialistDoctor;
