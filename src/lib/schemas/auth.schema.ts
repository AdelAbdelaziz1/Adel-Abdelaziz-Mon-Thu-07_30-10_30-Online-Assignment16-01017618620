import * as z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty("Name is Required")
      .min(3, "min chars is 3")
      .max(10, "max cahrs is 10"),

    email: z.string().nonempty("Email is Required").email("email is not Valid"),
    password: z
      .string()
      .nonempty("password is Required")
      .min(3, "min chars is 3")
      .max(10, "max chars is 10"),

    rePassword: z.string().nonempty("password is Required"),
    phone: z.string().nonempty("Phone is Required"),
    terms: z.boolean().refine((val) => val === true, {
      message: 'You must accept the terms and conditions',
    }),
  })
  .refine(
    (data) => {
      return data.password === data.rePassword;
    },
    { path: ["rePassword"], message: "Passwords Not Match" },
  );

export const loginSchema = z.object({
  email: z.string().nonempty("Email is Required").email("email is not Valid"),
  password: z
    .string()
    .nonempty("password is Required")
    .min(3, "min chars is 3")
    .max(10, "max chars is 10"),
});

export type registerSchemaType = z.infer<typeof registerSchema>;
export type loginSchemaType = z.infer<typeof loginSchema>;