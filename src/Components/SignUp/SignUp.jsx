import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Form, Field } from 'react-final-form';
import { signupSchema } from '../../Services/Validation/validationSchema'; // Import the Zod schema
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import ArrowBackIcon
import { signupAuthAction } from '../../redux/Actions/registerAuthActions';
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';

export default function SignUp() {
  const navigate = useNavigate(); // Initialize useNavigate
  const dispatch = useDispatch(); // Initialize useDispatch

  const onSubmit = async (values) => {
    try {
      // Dispatch the login action with email and password
      const res=await dispatch(signupAuthAction(values));
      if(res.accessToken){
        toast.success('تم انشاء حساب  بنجاح');
        navigate('/'); // Redirect to the desired route after login
        localStorage.setItem("token",res.accessToken)
        localStorage.setItem("userId",res.user._id)
      }
    } catch (error) {
      // Handle the error by showing a toaster with the error message
      toast.error(error?.response?.data?.msg || 'حدث خطأ');
    }
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Button
            onClick={() => navigate(-1)}
            startIcon={<ArrowBackIcon />}
            sx={{ alignSelf: 'flex-start' }}
          >
            العوده للخلف
          </Button>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            تسجيل حساب
          </Typography>
          <Form
            onSubmit={onSubmit}
            validate={(values) => {
              try {
                signupSchema.parse(values);
                return {};
              } catch (error) {
                return error.formErrors.fieldErrors;
              }
            }}
            render={({ handleSubmit, submitting }) => (
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <Field name="name">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      margin="normal"
                      required
                      fullWidth
                      id="name"
                      label="الاسم"
                      name="name"
                      autoComplete="name"
                    //   autoFocus
                      error={meta.touched && meta.error}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
                <Field name="email">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="البريد الإلكتروني"
                      name="email"
                      autoComplete="email"
                      error={meta.touched && meta.error}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
                <Field name="password">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="كلمة المرور"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      error={meta.touched && meta.error}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
                <Field name="confirmPassword">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      margin="normal"
                      required
                      fullWidth
                      name="confirmPassword"
                      label="تأكيد كلمة المرور"
                      type="password"
                      id="confirmPassword"
                      autoComplete="new-password"
                      error={meta.touched && meta.error}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
                <Field name="phone">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      margin="normal"
                      required
                      fullWidth
                      name="phone"
                      label="رقم الهاتف"
                      type="tel"
                      id="phone"
                      autoComplete="tel"
                      error={meta.touched && meta.error}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="أريد تلقي الإشعارات والتحديثات عبر البريد الإلكتروني"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={submitting}
                >
                  تسجيل
                </Button>
                <Grid container>
                  <Grid item xs>
                  <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                      {"هل لديك حساب؟ تسجيل الدخول"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            )}
          />
        </Box>
      </Container>
  );
}
