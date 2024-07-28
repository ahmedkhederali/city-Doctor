import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Form, Field } from 'react-final-form';
import { signupSchema } from '../../Services/Validation/validationSchema'; // Import the Zod schema

export default function SignUp() {
  const onSubmit = async (values) => {
    console.log(values);
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
                <Field name="mobile">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      margin="normal"
                      required
                      fullWidth
                      name="mobile"
                      label="رقم الهاتف"
                      type="tel"
                      id="mobile"
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
                    <Link href="#" variant="body2">
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
