import React, { useEffect } from "react";
import Slider from "react-slick";
import { Card, CardContent, CardMedia, Typography, Box, CircularProgress } from "@mui/material";
import image1 from "../../assets/gldia.jfif";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { imageMap } from "../../Common/Helper/helper";
import "./slider.css";
import { fetchSpecialties } from "../../redux/Actions/specialActions";
import { useNavigate } from "react-router-dom";

// Custom Arrow Component
const CustomArrow = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{
      ...style,
      background: '#1976d2',
      borderRadius: '50%',
      width: 30,
      height: 30,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1,
    }}
    onClick={onClick}
  />
);

// Slider settings
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  autoplaySpeed: 3000,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: false
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
        arrows: true // Show arrows on mobile
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true // Show arrows on mobile
      }
    }
  ],
  prevArrow: <CustomArrow className="slick-prev" />,
  nextArrow: <CustomArrow className="slick-next" />,
};

function Responsive() {
  const dispatch = useDispatch();
  const specialties = useSelector((state) => state.yourFeature.items);
  const status = useSelector((state) => state.yourFeature.status);
  const error = useSelector((state) => state.yourFeature.error);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (status === 'idle' || status === undefined) {
      dispatch(fetchSpecialties());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (status === 'failed') {
      toast.error(`Error: ${error}`);
    }
  }, [status, error]);

  const handleCardClick = (id) => {
    navigate(`/specialties/${id}`); // Navigate to /id when a card is clicked
  };

  if (status === 'loading') return <CircularProgress />;

  const slides = specialties.map((specialty, index) => ({
    id: specialty._id,
    title: specialty.specialty_name,  // Replace name with image label based on index
    image: imageMap[index] || image1 // Default to image1 if index is out of bounds
  }));

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {slides.map((slide) => (
          <Box key={slide.id} sx={{ padding: 2 }}>
            <Card
              onClick={() => handleCardClick(slide.id)} // Handle click event
              sx={{ height: 270, width: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
            >
              <CardMedia
                component="img"
                height="85%"
                image={slide.image}
                alt={slide.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ height: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h5" component="div" align="center">
                  {slide.title}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Slider>
    </div>
  );
}

export default Responsive;
