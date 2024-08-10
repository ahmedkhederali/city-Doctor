import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  Modal,
  Fade,
  Backdrop,
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
import { createComment } from "../../redux/Actions/createComment";
import { AppContext } from "../../contextApi/AppContext";
import Comment from "../../Common/Comment/Comments";
import { calculateAverageRating } from "../../Common/Helper/helper"; // Helper function to calculate average rating
import { rateDoctor } from "../../redux/Actions/ratingDoctors";

const DoctorProfile = () => {
  const { drawerFWidth, setDrawerFWidth } = useContext(AppContext);

  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const dispatch = useDispatch();
  const { doctor, status, error } = useSelector((state) => state.singlr_doc);
  const { comments, commmentStatus, commentError } = useSelector(
    (state) => state.single_comments
  );

  const [comment, setComment] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [visibleComments, setVisibleComments] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [rating, setRating] = useState(0);

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

  const handleShowMoreComments = () => {
    setVisibleComments((prev) => prev + 5);
  };

  const handleCreatComment = () => {
    if (!localStorage.getItem("token")) {
      toast.warning("يجب تسجيل الدخول");
      navigate("/login");
      return;
    }
    if (comment.trim() === "") {
      toast.error("يرجى كتابة تعليق قبل الإرسال");
      return;
    }

    dispatch(createComment(id, "Doctor", comment))
      .then((res) => {
        toast.success("تم أضافة تعليقك بنجاح");
        setComment(""); // Clear the comment input field
        dispatch(fetchSingleDoctorComments(id)); // Refresh the comments
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleSubmitRating = () => {
    if (!localStorage.getItem("token")) {
      toast.warning("يجب تسجيل الدخول");
      navigate("/login");
      return;
    }
    if (rating === 0) {
      toast.error("يرجى تحديد تقييم قبل الإرسال");
      return;
    }

    // Dispatch an action to submit the rating
    dispatch(rateDoctor(id, rating))
      .then(() => {
        toast.success("تم أضافة تقييمك بنجاح");
        setOpenModal(false);
        dispatch(fetchSingleDoctor(id)); // Refresh the doctor data
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  const averageRating = doctor?.ratings?.length
    ? calculateAverageRating(doctor.ratings)
    : 0;

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
        width: { xs: "100%", md: "70%" }, // Full width on mobile, 70% width on large screens
      }}
    >
      {doctor ? (
        <Box sx={{ padding: 2 }}>
          <Card sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
            {/* First Section: Image on the Right, Name, Short Description, and Rating on the Left */}
            <Box
              sx={{
                display: "flex",
                alignItems: "start",
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
                    mb: 1,
                  }}
                >
                  {doctor.small_desc}
                </Typography>
                <Rating value={averageRating} readOnly precision={0.5} />
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
              </Typography>{" "}
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer component={Paper}>
                <Table>
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

          {/* Comment Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
              التعليقات
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                mb: 1,
               
                cursor: "pointer", // Change cursor to pointer to indicate it's clickable
                transition: "background-color 0.3s ease", // Smooth transition for background color
                "&:hover": {
                  backgroundColor: "rgba(0, 150, 180, 0.1)", // Change background color on hover (example color)
                  borderRadius: "4px", // Optional: adds rounded corners on hover
                },
              }}
              onClick={handleOpenModal}
            >
              تقييم الدكتور
            </Typography>
          </Box>
          {comments?.length > 0 ? (
            comments
              .slice(0, visibleComments)
              .map((comment) => <Comment key={comment._id} comment={comment} />)
          ) : (
            <Typography variant="body1" color="textSecondary" sx={{mb:1}}>
              لا توجد تعليقات
            </Typography>
          )}

          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              multiline
              rows={1}
              variant="outlined"
              label="اكتب تعليقك هنا"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreatComment}
              sx={{ mt: 1 }}
            >
              أضف تعليق
            </Button>
          </Box>

          {comments.length > visibleComments && (
            <Button onClick={handleShowMoreComments} variant="text">
              عرض المزيد
            </Button>
          )}

          {/* Rating Modal */}
          <Modal
            open={openModal}
            onClose={handleCloseModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openModal}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 300,
                  bgcolor: "background.paper",
                  border: "2px solid #fff",
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Rating
                    name="doctor-rating"
                    value={rating}
                    onChange={(event, newValue) => setRating(newValue)}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmitRating}
                    sx={{ mt: 2 }}
                  >
                    إرسال التقييم
                  </Button>
                </Box>
              </Box>
            </Fade>
          </Modal>
        </Box>
      ) : (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <FaRegFrownOpen size={50} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            لم يتم العثور على معلومات الطبيب.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default DoctorProfile;
