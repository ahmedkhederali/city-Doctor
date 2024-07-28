import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صالح"),
  password: z.string().min(6, "يجب أن تكون كلمة المرور مكونة من 6 أحرف على الأقل"),
});

export const signupSchema = z.object({
  name: z.string().min(1, "حقل مطلوب"),
  email: z.string().email("البريد الإلكتروني غير صالح"),
  password: z.string().min(6, "يجب أن تكون كلمة المرور مكونة من 6 أحرف على الأقل"),
  mobile: z.string().min(10, "يجب أن يكون رقم الهاتف مكونًا من 10 أرقام على الأقل"),
  confirmPassword: z.string().min(6, "يجب أن تكون كلمة المرور مكونة من 6 أحرف على الأقل"),
}).refine(data => data.password === data.confirmPassword, {
  message: "كلمات المرور غير متطابقة",
  path: ["confirmPassword"],
});

export const forgetPasswordSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صالح"),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(6, "يجب أن تكون كلمة المرور مكونة من 6 أحرف على الأقل"),
  confirmPassword: z.string().min(6, "يجب أن تكون كلمة المرور مكونة من 6 أحرف على الأقل"),
}).refine(data => data.password === data.confirmPassword, {
  message: "كلمات المرور غير متطابقة",
  path: ["confirmPassword"],
});
