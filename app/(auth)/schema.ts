import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z
  .object({
    firstName: z.string().min(1, "Please enter your first name"),
    lastName: z.string().min(1, "Please enter your last name"),
    email: z.string().email("Invalid email").min(1, "Email is required"),
    // userName: z.string().min(1, "Please enter your unique username"), // Uncomment if needed
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain uppercase, lowercase, number, and special character"
      )
      .min(1, "Password is required"),
    passwordConfirm: z.string().min(1, "Confirm Password is required"),
  })
  .refine((schema) => schema.password === schema.passwordConfirm, {
    message: "Passwords must match",
    path: ["passwordConfirm"],
  });

export const newPasswordSchema = z
  .object({
    password: z.string().min(1, "Password is required"),
    passwordConfirm: z.string().min(1, "Confirm Password is required"),
  })
  .refine((schema) => schema.password === schema.passwordConfirm, {
    message: "Passwords must match",
    path: ["passwordConfirm"],
  });
