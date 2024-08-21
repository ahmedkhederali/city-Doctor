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
    Grid,
    MenuItem,
    TextField,
    Stack,
    Pagination,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { fetchAllNursing } from '../../../redux/Actions/getAllNursing';
import { convertToArabicNumerals } from '../../../Common/Helper/helper';
import { fetchDeleSingleNursing } from '../../../redux/Actions/deleteSindleNursing';

export default function GetAllNurses() {
    const dispatch = useDispatch();
    const { nurses, status, error, totalPages, currentPage } = useSelector((state) => state.all_nursing_data);
    
    const [nameFilter, setNameFilter] = useState('');
    const [degreeFilter, setDegreeFilter] = useState('');
    const [page, setPage] = useState(currentPage);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true); 
        dispatch(fetchAllNursing(page)).finally(() => {
          setLoading(false); // Set loading to false once data is fetched
      });
    }, [dispatch, page]);

    useEffect(() => {
        if (status === "failed") {
            toast.error(`${error}`);
        }
    }, [status, error]);

    if (status === "loading" || loading) {
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

    const uniqueDegrees = [...new Set(nurses.map((nurse) => nurse.degree))];

    const filteredNurses = nurses.filter((nurse) => {
        return (
            nurse.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
            (degreeFilter ? nurse.degree === degreeFilter : true)
        );
    });

    const handleDelete = (nurse) => {
        Swal.fire({
            title: `هل تريد حذف ${nurse.name}؟`,
            text: "لن تتمكن من التراجع عن هذا!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'نعم، احذفه!',
            cancelButtonText: 'إلغاء'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(fetchDeleSingleNursing(nurse._id))
                .then(() => {
                    toast.success(`تم حذف ${nurse.name} بنجاح.`);
                    dispatch(fetchAllNursing(page));
                })
                .catch((error) => {
                    toast.error(`حدث خطأ أثناء حذف ${nurse.name}.`);
                });
            }
        });
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <Box>
            <Grid container spacing={2} mb={2}>
                <Grid item xs={12} sm={6} m={1}>
                    <TextField
                        label="بحث بالاسم"
                        variant="outlined"
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} m={1}>
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
                <Table sx={{ minWidth: 650 }} aria-label="Nurses Table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>الممرض</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>العنوان</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>رقم الهاتف</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>العمر</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>مكان العمل</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>الدرجة العلمية</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>الإجراءات</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredNurses.length === 0 && <Box sx={{ margin: 'auto' }}>لا يوجد بيانات</Box>}
                        {filteredNurses.map((nurse) => (
                            <TableRow key={nurse._id}>
                                <TableCell component="th" scope="row">
                                    <Box display="flex" alignItems="center" width="100%">
                                        <Avatar alt={nurse.name} src={nurse.image.url} />
                                        <Box ml={2} width="100%">
                                            <Typography variant="body1" noWrap>{nurse.name}</Typography>
                                        </Box>
                                    </Box>
                                </TableCell>

                                <TableCell align="center" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{nurse.address}</TableCell>
                                <TableCell align="center">{convertToArabicNumerals(nurse.phone)}</TableCell>
                                <TableCell align="center">{convertToArabicNumerals(nurse.age)}</TableCell>
                                <TableCell align="center" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{nurse.work_place}</TableCell>
                                <TableCell align="center" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{nurse.degree}</TableCell>
                                <TableCell align="center" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    <IconButton color="primary" aria-label="edit" component="label">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error" aria-label="delete" onClick={() => handleDelete(nurse)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Stack spacing={2} mt={2} alignItems="center">
                <Pagination
                    count={filteredNurses?.length < 10 ? 1 :totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Stack>
        </Box>
    );
}
