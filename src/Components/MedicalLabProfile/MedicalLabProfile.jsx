import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Rating,
  Container,
  Grid,
  Button,
  TableRow,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Paper,
  CircularProgress,
  Modal,
  Fade,
  Backdrop,
  TextField,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegFrownOpen } from "react-icons/fa";
import {
  calculateAverageRating,
  convertToArabicNumerals,
  translateDayAndTime,
} from "../../Common/Helper/helper";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import { toast } from "react-toastify";
import { fetchSingleMedicalLab } from "../../redux/Actions/getSindleMedicalLab";
import { useDispatch, useSelector } from "react-redux";
import { rateMedicalLabs } from "../../redux/Actions/ratingMedicalLabs";
import { Phone } from "@mui/icons-material";
import { createComment } from "../../redux/Actions/createComment";
import { fetchSingleMedicalLabComments } from "../../redux/Actions/getSindleMedicalLabComments";
import Comment from "../../Common/Comment/Comments";

const MedicalLabProfile = () => {
  const { id } = useParams(); // Get the lab ID from URL params
  const navigate = useNavigate(); // Initialize useNavigate
  const dispatch = useDispatch();
  const { medicalLabsData, status, error } = useSelector(
    (state) => state.singlr_medicalLab
  );
  const { comments, commmentStatus, commentError } = useSelector(
    (state) => state.singlr_medicalLab_comment
  );
  const [comment, setComment] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [visibleComments, setVisibleComments] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [visibleTests, setVisibleTests] = useState(1); // Initially show 5 items
  const [searchQuery, setSearchQuery] = useState(''); // For search functionality
  // to get MedicalLab Data
  useEffect(() => {
    dispatch(fetchSingleMedicalLab(id));
  }, [id, dispatch]);

  //to get Comment of Medical Lab
  useEffect(() => {
    dispatch(fetchSingleMedicalLabComments(id));
  }, [id, dispatch]);

  // show more Comment
  const handleShowMoreComments = () => {
    setVisibleComments((prev) => prev + 5);
  };

  // Set user's previous rating if available
  useEffect(() => {
    if (medicalLabsData && medicalLabsData.ratings && localStorage.getItem("userId")) {
      const userId = localStorage.getItem("userId");
      const userRating = medicalLabsData.ratings.find(
        (rating) => rating.user === userId
      );
      if (userRating) {
        setRating(userRating.rating); // Set the rating state to the user's previous rating
      }
    }
  }, [medicalLabsData, openModal]);

  useEffect(() => {
    if (status === "failed") {
      toast.error(`${error?.payload?.response?.data?.msg}`);
    }
  }, [status, error]);

  // for create Comment
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

    dispatch(createComment(id, "MedicalLab", comment))
      .then((res) => {
        toast.success("تم أضافة تعليقك بنجاح");
        setComment(""); // Clear the comment input field
        dispatch(fetchSingleMedicalLabComments(id)); // Refresh the comments
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  if (!medicalLabsData) {
    return (
      <Container>
        <Box textAlign="center" sx={{ width: "100%" }}>
          <FaRegFrownOpen style={{ fontSize: 100, color: "gray" }} />
          <Typography variant="h4" color="gray" sx={{ mt: 2 }}>
            لم يتم العثور على المختبر
          </Typography>
        </Box>
      </Container>
    );
  }

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
    dispatch(rateMedicalLabs(id, rating))
      .then(() => {
        toast.success("تم أضافة تقييمك بنجاح");
        setOpenModal(false);
        dispatch(fetchSingleMedicalLab(id)); // Refresh the doctor data
      })
      .catch((err) => {
        console.log("errr",err)
        toast.error(err.message);
      });
  };
  // calculate rating
  const averageRating = medicalLabsData?.ratings?.length
    ? calculateAverageRating(medicalLabsData.ratings)
    : 0;

  if (status === "loading" || !medicalLabsData) {
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
  // Filtered tests based on search query
  const filteredTests = medicalLabsData.medicaltest?.filter(test =>
    test.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Show more items handler
  const handleShowMore = () => {
    setVisibleTests(prevVisibleTests => prevVisibleTests + 5);
  };
  return (
    <Container>
      <Box 
         sx={{
          display:'flex',
          justifyContent:'space-between',
          alignItems:'center'
         }}
      >
        <h1> معمل {medicalLabsData.name}</h1>
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
          تقييم المعمل
        </Typography>
      </Box>
      <Card>
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
                {medicalLabsData.name}
              </Typography>
              <Rating value={averageRating} readOnly precision={0.5} />
            </Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              {medicalLabsData.medical_desc}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <LocationOnIcon color="action" />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                {medicalLabsData.location}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Phone color="action" />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                {convertToArabicNumerals(medicalLabsData.phone)}
              </Typography>
            </Box>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>ساعات العمل</Typography>
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
                      {medicalLabsData.time_for_works?.length > 0 &&
                        medicalLabsData?.time_for_works.map((time) => {
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
          </CardContent>
        </CardActionArea>
      </Card>
      {/* Medical Tests Section */}
      <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        التحاليل الطبية المتاحة
      </Typography>

      {/* Search Field */}
      <TextField
        label="بحث"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Display Accordions */}
      {filteredTests?.length > 0 ? (
        filteredTests.slice(0, visibleTests).map((test, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LocalPharmacyIcon sx={{ mr: 1, color: "#1976d2" }} />
                <Typography>{test.name}</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{test.desc}</Typography>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          لا توجد فحوصات متاحة.
        </Typography>
      )}

      {/* Show More Button */}
      {visibleTests < filteredTests.length && (
        <Button onClick={handleShowMore} sx={{ mt: 2 }}>
          عرض المزيد
        </Button>
      )}
    </Box>
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
      </Box>
      {comments?.length > 0 ? (
        comments
          .slice(0, visibleComments)
          .map((comment) => <Comment key={comment._id} comment={comment} />)
      ) : (
        <Typography variant="body1" color="textSecondary" sx={{ mb: 1 }}>
          لا توجد تعليقات
        </Typography>
      )}

      {comments.length > visibleComments && (
        <Button onClick={handleShowMoreComments} variant="text">
          عرض المزيد
        </Button>
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

    </Container>
  );
};

export default MedicalLabProfile;
