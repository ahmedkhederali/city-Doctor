import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Form, Field } from 'react-final-form';
import { forgetPasswordSchema } from '../../Services/Validation/validationSchema'; // Import the Zod schema

export default function ForgetPassword() {
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
            نسيت كلمة المرور
          </Typography>
          <Form
            onSubmit={onSubmit}
            validate={(values) => {
              try {
                forgetPasswordSchema.parse(values);
                return {};
              } catch (error) {
                return error.formErrors.fieldErrors;
              }
            }}
            render={({ handleSubmit, submitting }) => (
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <Field name="email">
                  {({ input, meta }) => (
                     <Field name="email">
                     {({ input }) => (
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
                  )}
                </Field>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={submitting}
                >
                  إرسال
                </Button>
                <Grid container>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"تذكرت كلمة المرور؟ تسجيل الدخول"}
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
