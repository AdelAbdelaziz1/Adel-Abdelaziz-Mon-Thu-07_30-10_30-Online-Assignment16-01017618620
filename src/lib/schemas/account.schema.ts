import * as z from "zod";

const phoneRegex = /^01[0125][0-9]{8}$/;
const phoneMessage = "Enter a valid Egyptian phone number (e.g. 01012345678)";

export const profileSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().regex(phoneRegex, phoneMessage),
});
export type ProfileSchemaType = z.infer<typeof profileSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    rePassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((d) => d.password === d.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  })
  .refine((d) => d.password !== d.currentPassword, {
    message: "New password must be different from the current one",
    path: ["password"],
  });
export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;

export const addressSchema = z.object({
  name: z.string().trim().min(2, "Address name must be at least 2 characters"),
  city: z.string().trim().min(2, "City must be at least 2 characters"),
  details: z
    .string()
    .trim()
    .min(10, "Please add more details (street, building, floor)"),
  phone: z.string().trim().regex(phoneRegex, phoneMessage),
});
export type AddressSchemaType = z.infer<typeof addressSchema>;