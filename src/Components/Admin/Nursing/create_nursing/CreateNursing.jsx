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
import "./style.css"
import { fetchSpecialties } from '../../../../redux/Actions/specialActions';
import { useDispatch, useSelector } from 'react-redux';
import { getUserRole, removeTokenWhneStatus401 } from '../../../../Common/Helper/helper';
import { toast } from "react-toastify";
import { fetchUploadImageDoctor } from '../../../../redux/Actions/uploadDoctorImage';
import { fetchDestroyImageDoctor } from '../../../../redux/Actions/destroyDoctorImage';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSingleNursing } from '../../../../redux/Actions/getSindleNursing';
import { fetchCreateNursing } from '../../../../redux/Actions/createNursing';
import { fetchUpdateNursing } from '../../../../redux/Actions/updatenursing';

export default function CreateNursing() {
    const { drawerFWidth } = useContext(AppContext);
    const [nursing, setnursing] = useState({
        name: '',
        address: '',
        phone: '',
        age: '',
        functionality: [],
        sex: '',
        work_place: '',
        degree: '',
        descrption: '',
        image: null,
    });

    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [images, setImages] = useState(false);
    const isMobile = useMediaQuery('(max-width:600px)');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams(); // Get doctor ID from URL if editing
    const [editMode, setEditMode] = useState(false);
    //
    const { doctor_img } = useSelector((state) => state.image_upload);
    const { nrsing:nrsing_edit, status, error } = useSelector((state) => state.single_nursing);
    const { nursing: nursing_create, Status, commentError } = useSelector((state) => state.create_new_doctor);

    useEffect(() => {
        if (status === "failed") {
            toast.error(`${error?.payload?.response?.data?.msg}`);
        }
    }, [status, error]);

    useEffect(() => {
        if (id) {
            setEditMode(true);
            dispatch(fetchSingleNursing(id))
        }
    }, [dispatch, id]);
    console.log("images", images)
    useEffect(() => {
        setImages( doctor_img );
    }, [doctor_img])

    useEffect(() => {
        if (nrsing_edit) {
            setnursing(nrsing_edit);
            setImages(nrsing_edit.image);
        }
    }, [nrsing_edit]);
    const handleChange = (e) => {
        setnursing({ ...nursing, [e.target.name]: e.target.value });
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
    const handleFunctionalityChange = (index, e) => {
        const updatedFunctionality = nursing.functionality.map((func, i) =>
            i === index ? { ...func, [e.target.name]: e.target.value } : func
        );
        setnursing({ ...nursing, functionality: updatedFunctionality });
    };

    const handleAddFunctionality = () => {
        setnursing({
            ...nursing,
            functionality: [...nursing.functionality, { name: '' }]
        });
    };

    const handleRemoveFunctionality = (index) => {
        const updatedFunctionality = nursing.functionality.filter((_, i) => i !== index);
        setnursing({ ...nursing, functionality: updatedFunctionality });
    }
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
                setnursing({ ...doctorData, image: null });
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
    const styleUpload = {
        display: Object.keys(editMode ? nursing.image : doctor_img).length > 0  ? "block" : "none",
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...nursing,
            };

            if (doctor_img) {
                payload.image = doctor_img;
            }

            if (editMode) {
                dispatch(fetchUpdateNursing(id, payload));
                toast.success("تم تعديل بيانات الممرض بنجاح");
            } else {
                dispatch(fetchCreateNursing(payload));
                toast.success("تم أضافة الممرض بنجاح");
            }
            setnursing({
                name: '',
                address: '',
                phone: '',
                age: '',
                functionality: [{ name: '' }],
                sex: '',
                work_place: '',
                degree: '',
                descrption: '',
                image: null,
            });
            setImagePreview(null);
            navigate("/view-nurses");

        } catch (err) {
            console.error('Error handling Nursing data:', err.message);
        }
    };
    if (status === "loading" || !nursing) {
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
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="اسم الممرض"
                            name="name"
                            variant="outlined"
                            value={nursing?.name}
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
                            value={nursing?.age}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="رقم الهاتف"
                            name="phone"
                            variant="outlined"
                            value={nursing?.phone}
                            onChange={handleChange}
                        />
                    </Grid>
                    {/* Address */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="العنوان"
                            name="address"
                            variant="outlined"
                            value={nursing?.address}
                            onChange={handleChange}
                        />
                    </Grid>

                    {/* Workplace */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="مكان العمل"
                            name="work_place"
                            variant="outlined"
                            value={nursing?.work_place}
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
                                value={nursing.sex}
                                onChange={handleChange}
                            >
                                <MenuItem value="male">ذكر</MenuItem>
                                <MenuItem value="female">أنثى</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* Degree */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="الدرجة العلمية"
                            name="degree"
                            variant="outlined"
                            value={nursing?.degree}
                            onChange={handleChange}
                        />
                    </Grid>

                    {/* Full Description */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="وصف كامل"
                            name="descrption"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={nursing?.descrption}
                            onChange={handleChange}
                        />
                    </Grid>
                    {/* Functionality */}
                    <Grid item xs={12}>
                        <Typography variant="h6">الوظائف</Typography>
                        {nursing?.functionality?.length > 0 && nursing?.functionality?.map((func, index) => (
                            <Grid container spacing={2} key={index} sx={{ marginBottom: 2 }}>
                                <Grid item xs={10}>
                                    <TextField
                                        fullWidth
                                        label={`الوظيفة ${index + 1}`}
                                        name="name"
                                        variant="outlined"
                                        value={func.name}
                                        onChange={(e) => handleFunctionalityChange(index, e)}
                                    />
                                </Grid>
                                <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <IconButton color="error" onClick={() => handleRemoveFunctionality(index)}>
                                        <RemoveCircle />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        ))}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddFunctionality}
                            startIcon={<AddCircle />}
                        >
                            إضافة وظيفة جديدة
                        </Button>
                    </Grid>
                    {/* Submit Button */}
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            {editMode ? "تعديل بيانات الممرض" : "إضافة ممرض"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}
