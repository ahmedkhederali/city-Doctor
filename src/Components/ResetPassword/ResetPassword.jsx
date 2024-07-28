import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Form, Field } from 'react-final-form';
import { resetPasswordSchema } from '../../Services/Validation/validationSchema'; // Import the Zod schema

export default function ResetPassword() {
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
            إعادة تعيين كلمة المرور
          </Typography>
          <Form
            onSubmit={onSubmit}
            validate={(values) => {
              try {
                resetPasswordSchema.parse(values);
                return {};
              } catch (error) {
                return error.formErrors.fieldErrors;
              }
            }}
            render={({ handleSubmit, submitting }) => (
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                      autoComplete="new-password"
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={submitting}
                >
                  إعادة تعيين
                </Button>
              </Box>
            )}
          />
        </Box>
      </Container>
  );
}
