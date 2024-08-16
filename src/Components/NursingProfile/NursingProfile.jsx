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
  Avatar,
} from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import {
  Home as HomeIcon,
  School as SchoolIcon,
  Phone as PhoneIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegFrownOpen } from "react-icons/fa";
import {
  calculateAverageRating,
  convertToArabicNumerals,
  translateDayAndTime,
} from "../../Common/Helper/helper";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
// import { rateNurse } from "../../redux/Actions/ratingNurse";
import { Phone } from "@mui/icons-material";
import { createComment } from "../../redux/Actions/createComment";
import Comment from "../../Common/Comment/Comments";
import { fetchSingleNursing } from "../../redux/Actions/getSindleNursing";
import { fetchSingleNursingComments } from "../../redux/Actions/getSindleNursingComments";
import { rateNursing } from "../../redux/Actions/ratingNursing";

const NursingProfile = () => {
  const { id } = useParams(); // Get the nurse ID from URL params
  const navigate = useNavigate(); // Initialize useNavigate
  const dispatch = useDispatch();
  const { nrsing, status, error } = useSelector(
    (state) => state.single_nursing
  );
  const { comments, commentStatus, commentError } = useSelector(
    (state) => state.single_nurse_comment
  );
  const [comment, setComment] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [visibleComments, setVisibleComments] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    dispatch(fetchSingleNursing(id));
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(fetchSingleNursingComments(id));
  }, [id, dispatch]);

  const handleShowMoreComments = () => {
    setVisibleComments((prev) => prev + 5);
  };

  useEffect(() => {
    if (nrsing && nrsing.ratings && localStorage.getItem("userId")) {
      const userId = localStorage.getItem("userId");
      const userRating = nrsing.ratings.find(
        (rating) => rating.user === userId
      );
      if (userRating) {
        setRating(userRating.rating);
      }
    }
  }, [nrsing, openModal]);
  useEffect(() => {
    if (status === "failed") {
      toast.error(`${error?.payload?.response?.data?.msg}`);
    }
  }, [status, error]);

  const handleCreateComment = () => {
    if (!localStorage.getItem("token")) {
      toast.warning("يجب تسجيل الدخول");
      navigate("/login");
      return;
    }
    if (comment.trim() === "") {
      toast.error("يرجى كتابة تعليق قبل الإرسال");
      return;
    }

    dispatch(createComment(id, "Nursing", comment))
      .then((res) => {
        toast.success("تم أضافة تعليقك بنجاح");
        setComment("");
        dispatch(fetchSingleNurseComments(id));
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  if (!nrsing) {
    return (
      <Container>
        <Box textAlign="center" sx={{ width: "100%" }}>
          <FaRegFrownOpen style={{ fontSize: 100, color: "gray" }} />
          <Typography variant="h4" color="gray" sx={{ mt: 2 }}>
            لم يتم العثور على الممرضة
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

    dispatch(rateNursing(id, rating))
      .then(() => {
        toast.success("تم أضافة تقييمك بنجاح");
        setOpenModal(false);
        dispatch(fetchSingleNursing(id));
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

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

    dispatch(createComment(id, "Nursing", comment))
      .then((res) => {
        toast.success("تم أضافة تعليقك بنجاح");
        setComment(""); // Clear the comment input field
        dispatch(fetchSingleNursingComments(id)); // Refresh the comments
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  const averageRating = nrsing?.ratings?.length
    ? calculateAverageRating(nrsing.ratings)
    : 0;

  if (status === "loading" || !nrsing) {
    return (
      <Box
        sx={{
          display: "flex",
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
  const changeGenderToAR = (gender) => {
    if (gender === "male") {
      return "ذكر";
    }
    return "أنثي";
  };
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1> {nrsing.name}</h1>
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
          تقييم الممرض
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
              <Box sx={{ marginTop: "80px" }}>
                <Avatar
                  src={nrsing?.image?.url} // Assuming image URL is stored in nrsing.imageUrl
                  sx={{
                    width: 80,
                    height: 80,
                    position: "absolute",
                    top: 0,
                    left: 16,
                  }}
                />
              </Box>

              <Rating value={averageRating} readOnly precision={0.5} />
            </Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              {nrsing.descrption}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <LocationOnIcon color="action" />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                {nrsing.address}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                {nrsing.sex === "male" ? (
                    <MaleIcon color="action" />
                ) : (
                    <FemaleIcon color="action"  />
                )}
                </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                {changeGenderToAR(nrsing.sex)}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <SchoolIcon color="action" />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                {nrsing.degree}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Phone color="action" />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                {convertToArabicNumerals(nrsing.phone)}
              </Typography>
            </Box>
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                المهمات
              </Typography>
              {nrsing?.functionality?.map((specialty) => (
                <Box
                  key={specialty._id}
                  sx={{
                    mr: 1,
                    mb: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Button variant="contained" color="primary">
                    {specialty.name}
                  </Button>
                </Box>
              ))}
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
          <Box sx={modalStyle}>
            <Typography variant="h6" component="h2">
              تقييم الممرض
            </Typography>
            <Box
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Rating
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
                precision={0.5}
              />
            </Box>
            <Button
              onClick={handleSubmitRating}
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              إرسال تقييم
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

export default NursingProfile;
