import React, { useEffect, useState } from 'react';
import {
  Card, CardContent, Typography, CardActionArea,
  TextField, Button, Grid, Container, Box, Rating,
  Accordion, AccordionSummary, AccordionDetails,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FaRegFrownOpen } from 'react-icons/fa';
import { calculateAverageRating, convertToArabicNumerals } from '../../Common/Helper/helper';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {  fetchMedicalLabs } from '../../redux/Actions/medicalLabsActions';
import { toast } from "react-toastify";
import { Phone } from '@mui/icons-material';

const MedicalLabs = () => {
  const [nameFilter, setNameFilter] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { medicalLabsData } = useSelector((state) => state.medical_lab);
  const status = useSelector((state) => state.medical_lab.status);
  const error = useSelector((state) => state.medical_lab.error);
  const [page,setPage]=useState(1)
  useEffect(() => {
    dispatch(fetchMedicalLabs(selectedType,page)); // Fetch new data
  }, [dispatch, selectedType,page]);

  useEffect(() => {
    if (status === "failed") {
      toast.error(`${error?.payload?.response?.data?.msg}`);
    }
  }, [status, error]);

  // Ensure `medicalLabsData` is an array
  const filteredLabs = Array.isArray(medicalLabsData?.medicalLabs) 
    ? medicalLabsData?.medicalLabs.filter(lab => lab.name.toLowerCase().includes(nameFilter.toLowerCase())) 
    : [];

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
  // change page in pagination  
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  return (
    <Container>
      <h1>المختبرات الطبية</h1>
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField
          label="بحث بالاسم"
          variant="outlined"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>نوع المعمل</InputLabel>
          <Select
            value={selectedType}
            onChange={handleTypeChange}
            label="نوع المعمل"
          >
            <MenuItem value="">الكل</MenuItem>
            <MenuItem value="medical">معمل طبي</MenuItem>
            <MenuItem value="central">مركز أشعة</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={3}>
        {filteredLabs.length > 0 ? (
          filteredLabs.map((lab) => (
            <Grid item xs={12} sm={6} md={4} key={lab._id}>
              <Card sx={{ maxWidth: 345 }} onClick={() => navigate(`/medical_profile/${lab._id}`)} >
                <CardActionArea>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography gutterBottom variant="h5" component="div">
                        {lab.name}
                      </Typography>
                      <Rating value={handleRating(lab.ratings)} readOnly precision={0.5} />
                    </Box>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {lab.medical_desc}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <LocationOnIcon color="action" />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        {lab.location}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Phone color="action" />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        {convertToArabicNumerals(lab.phone)}
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/medical_profile/${lab._id}`)}
                  >
                    تفاصيل أكثر
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <Box textAlign="center" sx={{ width: '100%' }}>
            <FaRegFrownOpen style={{ fontSize: 100, color: "gray" }} />
            <Typography variant="h4" color="gray" sx={{ mt: 2 }}>
              لا يوجد معامل
            </Typography>
          </Box>
        )}
      </Grid>
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination 
          count={medicalLabsData?.totalPages} 
          page={medicalLabsData?.currentPage} 
          onChange={handlePageChange} 
          color="primary" 
        />
      </Box>
    </Container>
  );
};

export default MedicalLabs;
