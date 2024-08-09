import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Rating,
  TextField,
  Button,
  IconButton,
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
  CircularProgress,
} from "@mui/material";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaMoneyBillWave,
  FaChevronDown,
  FaRegFrownOpen,
} from "react-icons/fa";
import { MdOutlineAccessTime } from "react-icons/md";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleDoctor } from "../../redux/Actions/getSindleDoctor";
import { fetchSingleDoctorComments } from "../../redux/Actions/getSindleDoctorComments";
import { translateDayAndTime } from "../../Common/Helper/helper";

const DoctorProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { doctor, status, error } = useSelector((state) => state.singlr_doc);
  const { comments, commmentStatus, commentError } = useSelector(
    (state) => state.single_comments
  );

  const [comment, setComment] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [visibleComments, setVisibleComments] = useState(1);

  useEffect(() => {
    dispatch(fetchSingleDoctor(id));
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(fetchSingleDoctorComments(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (status === "failed") {
      toast.error(`${error?.payload?.response?.data?.msg}`);
    }
  }, [status, error]);

  if (status === "loading" || !doctor) {
    return (
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
          لا توجد بيانات
        </Typography>
      </Box>
    );
  }

  const handleShowMoreComments = () => {
    setVisibleComments((prev) => prev + 10);
  };

  return (
    <>
      {doctor ? (
        <Box sx={{ padding: 2 }}>
          <Card sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
            {/* First Section: Image on the Right, Name, Short Description, and Rating on the Left */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                maxWidth: "100%", // Ensure content stays within screen bounds
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: { xs: 80, sm: 80 }, // Responsive width: smaller on mobile
                  height: { xs: 80, sm: 80 }, // Responsive height: smaller on mobile
                  borderRadius: "50%",
                  objectFit: "cover",
                  ml: 2, // Margin left to provide spacing between text and image
                }}
                image={doctor.doctor_img?.url}
                alt={doctor.doc_name}
              />
              <CardContent
                sx={{
                  flex: 1,
                  textAlign: "left",
                  maxWidth: "calc(100% - 100px)", // Account for image size plus some margin
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    color: "rgb(0, 112, 205)",
                    fontSize: "1.2rem",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                    mb: 1,
                  }}
                >
                  {doctor.doc_name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "gray",
                    whiteSpace: "wrap",
                    // overflow: "hidden",
                    // textOverflow: "ellipsis",
                    mb: 1,
                  }}
                >
                  {doctor.small_desc}
                </Typography>
                <Rating value={doctor.rating} readOnly precision={0.5} />
              </CardContent>
            </Box>

            {/* Second Section: Full Description */}
            <CardContent sx={{ mb: 2 }}>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {doctor.full_description}
              </Typography>
            </CardContent>

            {/* Third Section: Icons */}
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 2,
                mb: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexBasis: "calc(100% - 16px)",
                }}
              >
                <IconButton size="small" sx={{ color: "red" }}>
                  <FaMapMarkerAlt />
                </IconButton>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {doctor.location}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexBasis: "calc(50% - 16px)",
                }}
              >
                <IconButton size="small" sx={{ color: "blue" }}>
                  <FaMoneyBillWave />
                </IconButton>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  السعر: {doctor.detection_price} جنيه
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexBasis: "calc(50% - 16px)",
                }}
              >
                <IconButton size="small" sx={{ color: "green" }}>
                  <FaPhone />
                </IconButton>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {doctor.phone}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Table Section */}
          <Accordion
            expanded={expanded}
            onChange={() => setExpanded(!expanded)}
          >
            <AccordionSummary expandIcon={<FaChevronDown />}>
              <Typography>
                {expanded ? "اخفاء مواعيد الدكتور" : "إظهار مواعيد عمل الدكتور"}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>اليوم</TableCell>
                      <TableCell>وقت البدء</TableCell>
                      <TableCell>وقت الانتهاء</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {doctor?.time_for_works?.length > 0 &&
                      doctor?.time_for_works.map((time) => {
                        const { translatedDay, translatedTime } =
                          translateDayAndTime(time.day, time.start_time);
                        return (
                          <TableRow key={time._id}>
                            <TableCell>{translatedDay}</TableCell>
                            <TableCell>{translatedTime}</TableCell>
                            <TableCell>
                              {
                                translateDayAndTime(time.day, time.end_time)
                                  .translatedTime
                              }
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>

          {/* Comments Section */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              التعليقات
            </Typography>
            {comments?.length > 0 ? (
              comments.slice(0, visibleComments).map((comment) => (
                <Box
                  key={comment._id}
                  sx={{
                    mb: 2,
                    p: 2,
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        backgroundColor: "#1976d2",
                        fontSize: "1rem",
                        fontWeight: "bold",
                        color: "#fff",
                      }}
                    >
                      {comment.user.name[0]}
                    </Box>
                    <Typography variant="subtitle2">
                      {comment.user.name}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: "gray", ml: 5 }}>
                    {comment.comment}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body1" color="textSecondary">
                لا توجد تعليقات
              </Typography>
            )}
            {comments?.length > visibleComments && (
              <span onClick={handleShowMoreComments}>
                عرض المزيد
              </span>
            )}
          </Box>

          {/* Input for User Comment */}
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="أضف تعليقك"
              multiline
              rows={1}
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Button variant="contained" color="primary">
              إرسال
            </Button>
          </Box>
        </Box>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default DoctorProfile;
