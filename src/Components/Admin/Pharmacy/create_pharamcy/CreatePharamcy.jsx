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
    FormControlLabel,
    Switch,
} from '@mui/material';
import { AppContext } from '../../../../contextApi/AppContext';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCreatePharamcy } from '../../../../redux/Actions/createPharamcy';
import { fetchUpdatePharamcy } from '../../../../redux/Actions/updatePharamcy';
import { fetchSinglePharamacy } from '../../../../redux/Actions/getSindlePharamacy';

export default function CreatePharamcy() {
    const { drawerFWidth } = useContext(AppContext);
    const [pharamcyData, setPharamcy] = useState({
        name: '',
        location: '',
        phone: '',
        fullTime: false,
    });
    const isMobile = useMediaQuery('(max-width:600px)');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams(); // Get doctor ID from URL if editing
    const [editMode, setEditMode] = useState(false);
    //
    const { pharamacy: pharamacy_edit, status, error } = useSelector((state) => state.single_pharamcy);
    const { pharamcyNew, Status, commentError } = useSelector((state) => state.create_new_pharamcy);

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
            dispatch(fetchSinglePharamacy(id))
        }
    }, [dispatch, id]);

 

    useEffect(() => {
        if (pharamacy_edit) {
            setPharamcy(pharamacy_edit);
        }
    }, [pharamacy_edit]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setPharamcy(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...pharamcyData,
            };

            if (editMode) {
                dispatch(fetchUpdatePharamcy(id, payload));
                toast.success("تم تعديل بيانات الصيدلية بنجاح");
            } else {
                dispatch(fetchCreatePharamcy(payload));
                toast.success("تم أضافة الصيدلية بنجاح");
            }
            setPharamcy({
                name: '',
                location: '',
                phone: '',
                fullTime: '',
            });
            navigate("/view-pharmacies");

        } catch (err) {
            console.error('Error handling Pharmacy Lab data:', err.message);
        }
    };



    if (Status === "loading" || status === "loading" || !pharamcyData) {
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
                            label="اسم الصيدلية"
                            name="name"
                            variant="outlined"
                            value={pharamcyData?.name}
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
                            value={pharamcyData?.location}
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
                            value={pharamcyData?.phone}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={pharamcyData?.fullTime}
                                    onChange={handleChange}
                                    name="fullTime"
                                    color="primary"
                                />
                            }
                            label="دوام كامل"
                        />
                    </Grid>
                    {/* Submit Button */}
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            {editMode ? "تعديل بيانات الصيدلية" : "إضافة الصيدلية"}
                        </Button>
                    </Grid>
                </Grid>

            </form>
        </Box>
    );
}
