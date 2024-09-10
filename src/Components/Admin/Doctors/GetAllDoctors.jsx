import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Box,
    Typography,
    CircularProgress,
    IconButton,
    TextField,
    MenuItem,
    Grid,
    Stack,
    Pagination,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchAllDoctor } from '../../../redux/Actions/getAllDoctors';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { convertDecimalToArabicNumerals, convertToArabicNumerals } from '../../../Common/Helper/helper';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { fetchDeleSingleDoctor } from '../../../redux/Actions/deleteSindleDoctor';
import { useNavigate } from 'react-router-dom';



export default function GetAllDoctors() {
    const dispatch = useDispatch();
    const { doctors, status, error ,totalPages, currentPage } = useSelector((state) => state.all_doctors?.doctors);
    // Step 1: Add filter state
    const [nameFilter, setNameFilter] = useState('');
    const [specialtyFilter, setSpecialtyFilter] = useState('');
    const [degreeFilter, setDegreeFilter] = useState('');
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    useEffect(() => {
        setLoading(true); 
        dispatch(fetchAllDoctor(page)).finally(() => {
            setLoading(false); // Set loading to false once data is fetched
        });
    }, [dispatch,page]);

    useEffect(() => {
        if (status === "failed") {
            toast.error(`${error?.payload?.response?.data?.msg}`);
        }
    }, [status, error]);

    if (status === "loading" || !doctors || loading) {
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

    //change page
    const handlePageChange = (event, value) => {
        setPage(value);
       
    };

    // Step 2: Extract unique specialties and degrees
    const uniqueSpecialties = [...new Set(doctors.map((doctor) => doctor.specialties.specialty_name))];
    const uniqueDegrees = [...new Set(doctors.map((doctor) => doctor?.degree?.degree_name))];

    // Step 3: Apply filters
    const filteredDoctors = doctors.filter((doctor) => {
        return (
            doctor.doc_name.toLowerCase().includes(nameFilter.toLowerCase()) &&
            (specialtyFilter ? doctor.specialties.specialty_name === specialtyFilter : true) &&
            (degreeFilter ? doctor.degree.degree_name === degreeFilter : true)
        );
    });

    const handleDelete = (doctor) => {
        Swal.fire({
            title: `هل تريد حذف ${doctor.doc_name}؟`,
            text: "لن تتمكن من التراجع عن هذا!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'نعم، احذفه!',
            cancelButtonText: 'إلغاء' // Custom cancel button text
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(fetchDeleSingleDoctor(doctor._id))
                .then(() => {
                    // Display success message
                    toast.success(`تم حذف ${doctor.doc_name} بنجاح.`);
                    // Fetch all doctors again to update the list
                    dispatch(fetchAllDoctor());
                })
                .catch((error) => {
                    // Display error message
                    toast.error(`حدث خطأ أثناء حذف ${doctor.doc_name}.`);
                });
            }
        });
    };
    const handleEdit = (doctor) => {
        // Navigate to the edit page with the doctor's ID
        navigate(`/edit-doctor/${doctor._id}`);
      };
    return (
        <Box>
            {/* Step 4: Create filter inputs */}
            <Grid container spacing={2} mb={2}>
                <Grid item xs={12} sm={4} m={1}>
                    <TextField
                        label="بحث بالاسم"
                        variant="outlined"
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={4} m={1}>
                    <TextField
                        label="بحث بالتخصص"
                        select
                        variant="outlined"
                        value={specialtyFilter}
                        onChange={(e) => setSpecialtyFilter(e.target.value)}
                        fullWidth
                    >
                        <MenuItem value="">الكل</MenuItem>
                        {uniqueSpecialties.map((specialty, index) => (
                            <MenuItem key={index} value={specialty}>
                                {specialty}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={4} m={1}>
                    <TextField
                        label="بحث بالدرجة العلمية"
                        select
                        variant="outlined"
                        value={degreeFilter}
                        onChange={(e) => setDegreeFilter(e.target.value)}
                        fullWidth
                    >
                        <MenuItem value="">الكل</MenuItem>
                        {uniqueDegrees.map((degree, index) => (
                            <MenuItem key={index} value={degree}>
                                {degree}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="Doctors Table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>الطبيب</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>التخصص</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>الموقع</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>السعر</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>رقم الهاتف</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold',whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} >الدرجة العلمية</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>التقييم</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>إجراءات</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredDoctors.length === 0 && <Box sx={{margin:'auto'}}>لا يوجد بيانات </Box>}
                        {filteredDoctors.map((doctor) => (
                            <TableRow key={doctor._id}>
                                <TableCell component="th" scope="row">
                                    <Box display="flex" alignItems="center" width="100%">
                                        <Avatar alt={doctor.doc_name} src={doctor.doctor_img.url} />
                                        <Box ml={2} width="100%">
                                            <Typography variant="body1" noWrap>{doctor.doc_name}</Typography>
                                        </Box>
                                    </Box>
                                </TableCell>

                                <TableCell align="center" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{doctor.specialties.specialty_name}</TableCell>

                                <TableCell align="center" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {doctor.location}
                                </TableCell>

                                <TableCell align="center" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {doctor.detection_price} جنيه
                                </TableCell>

                                <TableCell align="center">{convertToArabicNumerals(doctor.phone)}</TableCell>
                                <TableCell align="center">{doctor?.degree?.degree_name}</TableCell>
                                <TableCell align="center">{convertDecimalToArabicNumerals(doctor.rating)}</TableCell>

                                <TableCell align="center" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    <IconButton color="primary" aria-label="edit doctor" onClick={() => handleEdit(doctor)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="secondary" aria-label="delete doctor" onClick={() => handleDelete(doctor)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
            {/* Pagination Controls */}
            <Stack
                spacing={2}
                sx={{
                    display: "flex",
                    justifyContent: "center", // Centers the pagination horizontally
                    alignItems: "center", // Centers the pagination items vertically (optional)
                    mt: 4,
                }}
            >
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Stack>
        </Box>
    );
}
