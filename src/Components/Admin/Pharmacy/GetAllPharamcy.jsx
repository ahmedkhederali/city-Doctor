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
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { consvertToArName, convertDecimalToArabicNumerals, convertToArabicNumerals } from '../../../Common/Helper/helper';
import { fetchDeleSinglePharamcy } from '../../../redux/Actions/deleteSindlePharamcy';
import { fetchAllPharamcy } from '../../../redux/Actions/getAllPharmacy';

export default function GetAllPharamcy() {
    const dispatch = useDispatch();
    const { pharamcies, status, error, totalPages, currentPage } = useSelector((state) => state.all_pharamcy);
    const [nameFilter, setNameFilter] = useState('');
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    useEffect(() => {
        setLoading(true); 
        dispatch(fetchAllPharamcy(page)).finally(() => {
            setLoading(false); // Set loading to false once data is fetched
        });
    }, [dispatch, page]);

    useEffect(() => {
        if (status === "failed") {
            toast.error(`${error?.payload?.response?.data?.msg}`);
        }
    }, [status, error]);

    if (status === "loading" || !pharamcies?.pharmacies || loading) {
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

    // Apply filters
    const filteredPhamacy = pharamcies?.pharmacies.filter((pharmac) => {
        return (
          pharmac.name.toLowerCase().includes(nameFilter.toLowerCase()) );
    });

    const handleDelete = (lab) => {
        Swal.fire({
            title: `هل تريد حذف ${lab.name}؟`,
            text: "لن تتمكن من التراجع عن هذا!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'نعم، احذفه!',
            cancelButtonText: 'إلغاء' // Custom cancel button text
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(fetchDeleSinglePharamcy(lab._id))
                    .then(() => {
                        // Display success message
                        toast.success(`تم حذف ${lab.name} بنجاح.`);
                        // Fetch all labs again to update the list
                        dispatch(fetchAllPharamcy(page));
                    })
                    .catch((error) => {
                        // Display error message
                        toast.error(`حدث خطأ أثناء حذف ${lab.name}.`);
                    });
            }
        });
    };

    return (
        <Box>
            {/* Filter inputs */}
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

            </Grid>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="Medical Labs Table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>الصيدلية</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>الموقع</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>رقم الهاتف</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>التقييم</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>إجراءات</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredPhamacy.length === 0 && (
                            <Box sx={{ margin: 'auto' }}>لا يوجد بيانات</Box>
                        )}
                        {filteredPhamacy.map((lab) => (
                            <TableRow key={lab._id}>
                                <TableCell component="th" scope="row">
                                    <Box display="flex" alignItems="center" width="100%">
                                        <Typography variant="body1" noWrap>{lab.name}</Typography>
                                    </Box>
                                </TableCell>

                                <TableCell align="center" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {lab.location}
                                </TableCell>

                                <TableCell align="center">{convertToArabicNumerals(lab.phone)}</TableCell>
                                <TableCell align="center" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{convertDecimalToArabicNumerals(lab.ratings?.reduce((acc, cur) => acc + cur.rating, 0) / lab.ratings.length || 0)}</TableCell>

                                <TableCell align="center" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    <IconButton color="primary" aria-label="edit lab">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="secondary" aria-label="delete lab" onClick={() => handleDelete(lab)}>
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
                    count={pharamcies?.totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Stack>
        </Box>
    );
}
