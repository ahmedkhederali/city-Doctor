import * as React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import ArrowBackIcon
import { Form, Field } from 'react-final-form';
import { loginSchema } from '../../Services/Validation/validationSchema'; // Import the Zod schema
import { loginAuthActions } from "../../redux/Actions/loginAuthActions"
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";

export default function SignIn() {
  const navigate = useNavigate(); // Initialize useNavigate
  const dispatch = useDispatch(); // Initialize useDispatch

  const onSubmit = async (values) => {
    try {
      // Dispatch the login action with email and password
      const res=await dispatch(loginAuthActions(values.email, values.password));
      if(res.accessToken){
        toast.success('تم تسجيل الدخول بنجاح');
      navigate('/'); // Redirect to the desired route after login
      localStorage.setItem("token",res.accessToken)
      localStorage.setItem("userId",res.user._id)

      }
    } catch (error) {
      // Handle the error by showing a toaster with the error message
      toast.error(error?.response?.data?.msg || 'حدث خطأ أثناء تسجيل الدخول');
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
            تسجيل الدخول
          </Typography>
          <Form
            onSubmit={onSubmit}
            validate={(values) => {
              try {
                loginSchema.parse(values);
                return {};
              } catch (error) {
                return error.formErrors.fieldErrors;
              }
            }}
            render={({ handleSubmit, submitting }) => (
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                      // autoFocus
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
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="تذكرني"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={submitting}
                >
                  تسجيل الدخول
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link to="/forget_password" style={{ textDecoration: 'none', color: 'inherit' }}>
                      نسيت كلمة المرور؟
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>
                      {"ليس لديك حساب؟ سجل الآن"}
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
