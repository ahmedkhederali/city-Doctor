import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Box,
  Rating,
  Container,
  Button,
  CircularProgress,
  Modal,
  Fade,
  Backdrop,
  TextField,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegFrownOpen } from "react-icons/fa";
import {
  calculateAverageRating,
  convertToArabicNumerals,
  removeTokenWhneStatus401,
} from "../../Common/Helper/helper";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { ratePharamacy } from "../../redux/Actions/ratingPharamacy";
import { fetchSinglePharamacy } from "../../redux/Actions/getSindlePharamacy";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import Comment from "../../Common/Comment/Comments";
import { fetchSinglePharamcyComments } from "../../redux/Actions/getSindlePharamcyComments";
import { createComment } from "../../redux/Actions/createComment";
import PhoneIcon from "@mui/icons-material/Phone";

const PharamacyProfile = () => {
  const { id } = useParams(); // Get the lab ID from URL params
  const navigate = useNavigate(); // Initialize useNavigate
  const dispatch = useDispatch();
  const { pharamacy, status, error } = useSelector(
    (state) => state.single_pharamcy
  );

  const [comment, setComment] = useState("");
  const [visibleComments, setVisibleComments] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [rating, setRating] = useState(0);
  const { comments, commmentStatus, commentError } = useSelector(
    (state) => state.singlr_pharamcy_comment
  );
  // to get MedicalLab Data
  useEffect(() => {
    dispatch(fetchSinglePharamacy(id));
  }, [id, dispatch]);

  //   to get Comment of Pharamcy
  useEffect(() => {
    dispatch(fetchSinglePharamcyComments(id));
  }, [id, dispatch]);

  // show more Comment
  const handleShowMoreComments = () => {
    setVisibleComments((prev) => prev + 5);
  };

  // Set user's previous rating if available
  useEffect(() => {
    if (pharamacy && pharamacy.ratings && localStorage.getItem("userId")) {
      const userId = localStorage.getItem("userId");
      const userRating = pharamacy.ratings.find(
        (rating) => rating.user === userId
      );
      if (userRating) {
        setRating(userRating.rating); // Set the rating state to the user's previous rating
      }
    }
  }, [pharamacy, openModal]);

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

    dispatch(createComment(id, "Pharmacy", comment))
      .then((res) => {
        toast.success("تم أضافة تعليقك بنجاح");
        setComment(""); // Clear the comment input field
        dispatch(fetchSinglePharamcyComments(id)); // Refresh the comments
      })
      .catch((err) => {
        toast.error(err.message);
        removeTokenWhneStatus401(err.status)
        Number(err.status)===401 && navigate("/login");
      });
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  if (!pharamacy) {
    return (
      <Container>
        <Box textAlign="center" sx={{ width: "100%" }}>
          <FaRegFrownOpen style={{ fontSize: 100, color: "gray" }} />
          <Typography variant="h4" color="gray" sx={{ mt: 2 }}>
            لم يتم العثور على صيدلية
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
    dispatch(ratePharamacy(id, rating))
      .then(() => {
        toast.success("تم أضافة تقييمك بنجاح");
        setOpenModal(false);
        dispatch(fetchSinglePharamacy(id)); // Refresh the doctor data
      })
      .catch((err) => {
        toast.error(err.message);
        removeTokenWhneStatus401(err.status)
        Number(err.status)===401 && navigate("/login");
      });
  };

  // calculate rating
  const averageRating = pharamacy?.ratings?.length
    ? calculateAverageRating(pharamacy.ratings)
    : 0;

  if (status === "loading" || !pharamacy) {
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
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1> صيدلية {pharamacy.name}</h1>
        <Typography
          variant="h6"
          sx={{
            mt: 2,
            mb: 1,
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(0, 150, 180, 0.1)",
              borderRadius: "4px",
            },
          }}
          onClick={handleOpenModal}
        >
          {rating > 0 ? (
            <StarIcon
              sx={{
                fontSize: 30, // Adjust size as needed
                color: "#faaf00", // Adjust color as needed
              }}
            />
          ) : (
            <StarBorderIcon
              sx={{
                fontSize: 30, // Adjust size as needed
                color: "black", // Adjust color as needed
              }}
            />
          )}
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
                {pharamacy.name}
              </Typography>
              <Rating value={averageRating} readOnly precision={0.5} />
            </Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              {pharamacy.medical_desc}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <PhoneIcon sx={{ color: "green" }} />{" "}
              {/* Green color for phone icon */}
              <Typography variant="body2" color="text.primary" sx={{ ml: 1 }}>
                {convertToArabicNumerals(pharamacy?.phone)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <LocationOnIcon color="action" />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                {pharamacy.location}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
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

export default PharamacyProfile;
