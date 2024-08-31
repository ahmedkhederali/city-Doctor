import React, { useContext, useEffect, useState } from 'react';
import {
  TextField,
  Button,
  IconButton,
  Grid,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  Box,
  FormControl,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';
import { AddCircle, RemoveCircle, Close } from '@mui/icons-material';
import axios from 'axios';
import { AppContext } from '../../../../contextApi/AppContext';
import "./style.css"
import { fetchSpecialties } from '../../../../redux/Actions/specialActions';
import { useDispatch, useSelector } from 'react-redux';
import { getUserRole, removeTokenWhneStatus401 } from '../../../../Common/Helper/helper';
import { toast } from "react-toastify";
import { fetchUploadImageDoctor } from '../../../../redux/Actions/uploadDoctorImage';
import { fetchDestroyImageDoctor } from '../../../../redux/Actions/destroyDoctorImage';
import { fetchDegrees } from '../../../../redux/Actions/degreeActions';
import { fetchCreateDoctor } from '../../../../redux/Actions/createDoctor';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSingleDoctor } from '../../../../redux/Actions/getSindleDoctor';
import moment from 'moment';
import { fetchUpdateDoctor } from '../../../../redux/Actions/updateDoctor';

const CreateDoctorForm = () => {
  const { drawerFWidth } = useContext(AppContext);
  const [doctorData, setDoctorData] = useState({
    doc_name: '',
    age: '',
    small_desc: '',
    specialties: '',
    rating: '',
    location: '',
    detection_price: '',
    phone: '',
    degree: '',
    time_for_works: [{ day: '', start_time: '', end_time: '' }],
    sex: '',
    full_description: '',
    doctor_img: null,
  });

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [images, setImages] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const { doctor: doctor_edit, status, error } = useSelector((state) => state.singlr_doc);
  const { items, loading: specialtiesLoading } = useSelector((state) => state.yourFeature);
  const { degrees, loading: status_degree, error_degree } = useSelector((state) => state.degrees);
  const { doctor, Status, commentError } = useSelector((state) => state.create_new_doctor);
  const { doctor_img } = useSelector((state) => state.image_upload);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Get doctor ID from URL if editing
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (status === "failed") {
      toast.error(`${error?.payload?.response?.data?.msg}`);
    }
  }, [status, error]);
  useEffect(() => {
    dispatch(fetchSpecialties());
    dispatch(fetchDegrees());
    // Check if we are editing
    if (id) {
      setEditMode(true);
      // Fetch doctor data for editing
      dispatch(fetchSingleDoctor(id)).then((response) => {
        // setDoctorData(doctor_edit);
        // setImages(doctor_edit.doctor_img);
      }).catch((error) => {
        console.error('Error fetching doctor data:', error);
      });
    }
  }, [dispatch, id]);

  useEffect(() => {
    setImages(doctor_img);
  }, [doctor_img])

  useEffect(() => {
    if (doctor_edit) {
      setDoctorData(doctor_edit);
      setImages(doctor_edit.doctor_img);
    }
  }, [doctor_edit])

  const handleChange = (e) => {
    setDoctorData({ ...doctorData, [e.target.name]: e.target.value });
  };

  const handleTimeChange = (index, e) => {
    const newTimeForWorks = doctorData.time_for_works.map((work, workIndex) => {
      if (index === workIndex) {
        return { ...work, [e.target.name]: e.target.value };
      }
      return work;
    });
    setDoctorData({ ...doctorData, time_for_works: newTimeForWorks });
  };

  const handleAddTimeForWork = () => {
    setDoctorData({
      ...doctorData,
      time_for_works: [...doctorData.time_for_works, { day: '', start_time: '', end_time: '' }],
    });
  };
  const handleRemoveTimeForWork = (index) => {
    const newTimeForWorks = doctorData.time_for_works.filter(
      (_, workIndex) => index !== workIndex
    );
    setDoctorData({ ...doctorData, time_for_works: newTimeForWorks });
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      const userRole = getUserRole();
      if (userRole !== 'admin') {
        toast.error(`غير مسموح لك`);
        return;
      }

      const file = e.target.files[0];
      if (!file) return toast.error(`يجب اختيار صورة`);
      if (file.size > 1024 * 1024) return toast.error(`حجم الصورة كبير`);
      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return toast.error(`نوع الفايل غير مطابق`);

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);

      dispatch(fetchUploadImageDoctor(formData)).then((res) => {
        setLoading(false);
        // setImages(doctor_img);
      }).catch((err) => {
        toast.error(err.msg);
        removeTokenWhneStatus401(err.status);
        Number(err.status) === 401 && navigate("/login");
      });
    } catch (error) {
      console.error('Error uploading image', error);
      setLoading(false);
    }
  };

  const handleDestroy = () => {
    try {
      const userRole = getUserRole();
      if (userRole !== 'admin') {
        toast.error(`غير مسموح لك`);
        return;
      }
      dispatch(fetchDestroyImageDoctor(editMode ? doctorData?.doctor_img?.public_id : doctor_img?.public_id)).then(() => {
        setLoading(false);
        setImages(false);
        setDoctorData({ ...doctorData, doctor_img: null });
      }).catch((err) => {
        toast.error(err.msg);
        removeTokenWhneStatus401(err.status);
        Number(err.status) === 401 && navigate("/login");
      });
    } catch (error) {
      console.error('Error deleting image', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (Status === "failed") {
      toast.error(`${commentError?.payload?.response?.data?.msg}`);
    }
  }, [Status, commentError]);

  if (Status === "loading" || !doctor) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...doctorData,
        time_for_works: (doctorData.time_for_works),
      };

      if (doctor_img) {
        payload.doctor_img = doctor_img;
      }

      if (editMode) {
        dispatch(fetchUpdateDoctor(id, payload));
        toast.success("تم تعديل بيانات الطبيب بنجاح");
      } else {
        dispatch(fetchCreateDoctor(payload));
        toast.success("تم أضافة الدكتور بنجاح");
      }
      setDoctorData({
        doc_name: '',
        age: '',
        small_desc: '',
        specialties: '',
        rating: '',
        location: '',
        detection_price: '',
        phone: '',
        degree: '',
        time_for_works: [{ day: '', start_time: '', end_time: '' }],
        subspecialties: '',
        sex: '',
        full_description: '',
        doctor_img: null,
      });
      setImagePreview(null);
      navigate("/view-doctors");

    } catch (err) {
      console.error('Error handling doctor data:', err.message);
    }
  };

  const styleUpload = {
    display: images ? "block" : "none",
  };
  const convertTo24Hour = (time12) => {
    return moment(time12, "h:mm A").format("HH:mm");
  };
  const convertTo12Hour = (time24) => {
    return moment(time24, "HH:mm").format("h:mm A");
  };
  if (status === "loading" || !doctor_edit) {
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
        transition: 'margin 0.3s ease-out',
      }}
    >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="center">
          {/* Image Upload */}
          <Grid item xs={12} md={6}>
            <div className="upload">
              {
                // to upload image
              }
              <input type="file" name="file" id="file_up" onChange={handleUpload} />


              {loading ? (
                <div id="file_img">
                  <CircularProgress />
                </div>
              ) : (
                <div id="file_img" style={styleUpload}>
                  <img src={images ? images.url : ""} alt="" />
                  <span onClick={handleDestroy}>X</span>
                </div>
              )}
            </div>
          </Grid>

          {/* Doctor Name */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="اسم الطبيب"
              name="doc_name"
              variant="outlined"
              value={doctorData?.doc_name}
              onChange={handleChange}
            />
          </Grid>

          {/* Age and Phone */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="العمر"
              name="age"
              variant="outlined"
              type="number"
              value={doctorData?.age}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="رقم الهاتف"
              name="phone"
              variant="outlined"
              value={doctorData?.phone}
              onChange={handleChange}
            />
          </Grid>

          {/* Small Description */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="وصف قصير"
              name="small_desc"
              variant="outlined"
              multiline
              rows={4}
              value={doctorData?.small_desc}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="specialties-label">تخصصات</InputLabel>
              <Select
                labelId="specialties-label"
                label="تخصصات"
                name="specialties"
                value={
                  editMode && doctorData?.specialties?._id
                    ? doctorData.specialties._id
                    : (doctorData?.specialties || '') // Fallback to empty string if undefined
                }
                onChange={handleChange}
              >
                {specialtiesLoading ? (
                  <MenuItem disabled>Loading...</MenuItem>
                ) : (
                  items.map((specialty) => (
                    <MenuItem key={specialty._id} value={specialty._id}>
                      {specialty.specialty_name}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Grid>
          {/* Degree */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="degree-label">الدرجة العلمية</InputLabel>
              <Select
                labelId="degree-label"
                label="الدرجة العلمية"
                name="degree"
                value={
                  editMode && doctorData?.degree?._id
                    ? doctorData.degree._id
                    : (doctorData?.degree || '') // Fallback to empty string if undefined
                }
              
                onChange={handleChange}
              >
                {status_degree ? (
                  <MenuItem disabled>Loading...</MenuItem>
                ) : (
                  degrees.map((specialty) => (
                    <MenuItem key={specialty._id} value={specialty._id}>
                      {specialty.degree_name}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Grid>

          {/* Location */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="الموقع"
              name="location"
              variant="outlined"
              value={doctorData.location}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="سعر الكشف"
              name="detection_price"
              variant="outlined"
              type="number"
              value={doctorData?.detection_price}
              onChange={handleChange}
            />
          </Grid>

          {/* Full Description */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="وصف كامل"
              name="full_description"
              variant="outlined"
              multiline
              rows={4}
              value={doctorData?.full_description}
              onChange={handleChange}
            />
          </Grid>

          {/* Sex */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="sex-label">النوع</InputLabel>
              <Select
                labelId="sex-label"
                label="النوع"
                name="sex"
                value={doctorData?.sex || ''}
                onChange={handleChange}
              >
                <MenuItem value="Male">ذكر</MenuItem>
                <MenuItem value="Female">أنثى</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Time for Works */}
          <Grid item xs={12}>
            <Typography variant="h6">مواعيد العمل</Typography>
            {doctorData?.time_for_works?.length > 0 && doctorData?.time_for_works.map((work, index) => (
              <Grid
                container
                spacing={2}
                key={index}
                sx={{ marginBottom: 2 }}
              >
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="اليوم"
                    name="day"
                    variant="outlined"
                    value={work.day}
                    onChange={(e) => handleTimeChange(index, e)}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="وقت البدء"
                    name="start_time"
                    variant="outlined"
                    type="time"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    // value={work.start_time}
                    value={convertTo24Hour(work.start_time)}
                    onChange={(e) => handleTimeChange(index, { target: { name: 'start_time', value: convertTo12Hour(e.target.value) } })}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="وقت الانتهاء"
                    name="end_time"
                    variant="outlined"
                    type="time"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={convertTo24Hour(work.end_time)}
                    onChange={(e) => handleTimeChange(index, { target: { name: 'end_time', value: convertTo12Hour(e.target.value) } })}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={3}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isMobile ? 'flex-start' : 'center',
                  }}
                >
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveTimeForWork(index)}
                  >
                    <RemoveCircle />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddTimeForWork}
              startIcon={<AddCircle />}
            >
              إضافة موعد جديد
            </Button>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {
                editMode ? " تعديل حساب الطبيب" : "  حساب الطبيب"
              }
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CreateDoctorForm;
