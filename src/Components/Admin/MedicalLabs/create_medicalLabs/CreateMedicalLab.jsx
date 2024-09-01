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
import { AppContext } from '../../../../contextApi/AppContext';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCreateMedical } from '../../../../redux/Actions/createMedicalLab';
import { fetchUpdateMedicalLab } from '../../../../redux/Actions/updateMedicalLab';
import { fetchSingleMedicalLab } from '../../../../redux/Actions/getSindleMedicalLab';
import moment from 'moment';

export default function CreateMedicalLab() {
    const { drawerFWidth } = useContext(AppContext);
    const [medicalLab, setMedicalLab] = useState({
        name: '',
        time_for_works: [{ day: '', start_time: '', end_time: '' }],
        medical_desc: '',
        location: '',
        phone: '',
        medicaltest: [{ name: '', desc: '' }],
        medicallab_type: ''
    });
    const isMobile = useMediaQuery('(max-width:600px)');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams(); // Get doctor ID from URL if editing
    const [editMode, setEditMode] = useState(false);
    //
    const { medicalLabsData: medicalLab_edit, status, error } = useSelector((state) => state.singlr_medicalLab);
    const { medicalLabNew, Status, commentError } = useSelector((state) => state.create_new_medicalLab);

    useEffect(() => {
        if (status === "failed") {
            toast.error(`${error?.payload?.response?.data?.msg}`);
        }
    }, [status, error]);

    useEffect(() => {
        if (Status === "failed") {
            toast.error(`${commentError?.payload?.response?.data?.msg}`);
        }
    }, [Status, commentError]);

    useEffect(() => {
        if (id) {
            setEditMode(true);
            dispatch(fetchSingleMedicalLab(id))
        }
    }, [dispatch, id]);

    const convertTo24Hour = (time12) => {
        return moment(time12, "h:mm A").format("HH:mm");
    };
    const convertTo12Hour = (time24) => {
        return moment(time24, "HH:mm").format("h:mm A");
    };

    useEffect(() => {
        if (medicalLab_edit) {
            setMedicalLab(medicalLab_edit);
        }
    }, [medicalLab_edit]);

    const handleChange = (e) => {
        setMedicalLab({ ...medicalLab, [e.target.name]: e.target.value });
    };

    const handleTimeChange = (index, e) => {
        const newTimeForWorks = medicalLab.time_for_works.map((work, workIndex) => {
            if (index === workIndex) {
                return { ...work, [e.target.name]: e.target.value };
            }
            return work;
        });
        setMedicalLab({ ...medicalLab, time_for_works: newTimeForWorks });
    };

    const handleAddTimeForWork = () => {
        setMedicalLab({
            ...medicalLab,
            time_for_works: [...medicalLab.time_for_works, { day: '', start_time: '', end_time: '' }],
        });
    };
    const handleRemoveTimeForWork = (index) => {
        const newTimeForWorks = medicalLab.time_for_works.filter(
            (_, workIndex) => index !== workIndex
        );
        setMedicalLab({ ...medicalLab, time_for_works: newTimeForWorks });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...medicalLab,
            };



            if (editMode) {
                dispatch(fetchUpdateMedicalLab(id, payload));
                toast.success("تم تعديل بيانات المركز بنجاح");
            } else {
                dispatch(fetchCreateMedical(payload));
                toast.success("تم أضافة المركز بنجاح");
            }
            setMedicalLab({
                name: '',
                time_for_works: [{ day: '', start_time: '', end_time: '' }],
                medical_desc: '',
                location: '',
                phone: '',
                medicaltest: [{ name: '', desc: '' }],
                medicallab_type: ''
            });
            navigate("/view-labs");

        } catch (err) {
            console.error('Error handling Medical Lab data:', err.message);
        }
    };
    const handleAddMedicalTest = () => {
        setMedicalLab({
            ...medicalLab,
            medicaltest: [...medicalLab.medicaltest, { name: '', desc: '' }],
        });
    };

    const handleMedicalTestChange = (index, event) => {
        const newMedicalTests = medicalLab.medicaltest.map((test, testIndex) => {
            if (index === testIndex) {
                return { ...test, [event.target.name]: event.target.value };
            }
            return test;
        });
        setMedicalLab({ ...medicalLab, medicaltest: newMedicalTests });
    };

    const handleRemoveMedicalTest = (index) => {
        const newMedicalTests = medicalLab.medicaltest.filter((_, testIndex) => index !== testIndex);
        setMedicalLab({ ...medicalLab, medicaltest: newMedicalTests });
    };
    if (Status === "loading" || status === "loading" || !medicalLab) {
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
                    {/* Name */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="اسم المركز"
                            name="name"
                            variant="outlined"
                            value={medicalLab?.name}
                            onChange={handleChange}
                        />
                    </Grid>
                    {/* Location */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="الموقع"
                            name="location"
                            variant="outlined"
                            value={medicalLab?.location}
                            onChange={handleChange}
                        />
                    </Grid>
                    {/* Phone */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="رقم الهاتف"
                            name="phone"
                            variant="outlined"
                            value={medicalLab?.phone}
                            onChange={handleChange}
                        />
                    </Grid>
                    {/* Medical Description */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="الوصف الطبي"
                            name="medical_desc"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={medicalLab?.medical_desc}
                            onChange={handleChange}
                        />
                    </Grid>
                    {/* Medical Lab Type */}
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="medicallab-type-label">نوع المختبر الطبي</InputLabel>
                            <Select
                                labelId="medicallab-type-label"
                                label="نوع المختبر الطبي"
                                name="medicallab_type"
                                value={medicalLab?.medicallab_type}
                                onChange={handleChange}
                            >
                                <MenuItem value="central">مركز اشعة</MenuItem>
                                <MenuItem value="medical">معمل طبي</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* Time for Works */}
                    <Grid item xs={12}>
                        <Typography variant="h6">مواعيد العمل</Typography>
                        {medicalLab?.time_for_works?.length > 0 && medicalLab?.time_for_works.map((work, index) => (
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
                    {/* Medical Tests */}
                    <Grid item xs={12}>
                        <Typography variant="h6">التحاليل الطبية</Typography>
                        {medicalLab?.medicaltest?.length > 0 && medicalLab?.medicaltest.map((test, index) => (
                            <Grid container spacing={2} key={index} sx={{ marginBottom: 2 }}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label={`اسم التحليل ${index + 1}`}
                                        name="name"
                                        variant="outlined"
                                        value={test.name}
                                        onChange={(e) => handleMedicalTestChange(index, e)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="وصف التحليل"
                                        name="desc"
                                        variant="outlined"
                                        value={test.desc}
                                        onChange={(e) => handleMedicalTestChange(index, e)}
                                    />
                                </Grid>
                                <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <IconButton color="error" onClick={() => handleRemoveMedicalTest(index)}>
                                        <RemoveCircle />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        ))}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddMedicalTest}
                            startIcon={<AddCircle />}
                        >
                            إضافة تحليل جديد
                        </Button>
                    </Grid>
                    {/* Submit Button */}
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            {editMode ? "تعديل بيانات المركز" : "إضافة مركز"}
                        </Button>
                    </Grid>
                </Grid>

            </form>
        </Box>
    );
}
