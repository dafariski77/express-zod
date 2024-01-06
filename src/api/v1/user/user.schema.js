import { z } from "zod";

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required!",
      })
      .email("Email not valid!"),
    password: z.string({ required_error: "Password is required!" }),
  }),
});

export const registerSchema = z.object({
  body: z.object({
    fullName: z.string({
      required_error: "Fullname required!",
    }),
    email: z
      .string({
        required_error: "Email is required!",
      })
      .email("Email not valid!"),
    password: z.string({ required_error: "Password is required!" }),
    passwordConfirmation: z.string({
      required_error: "Password confirmation is required!",
    }),
  }),
});

export const verifySchema = z.object({
  body: z.object({
    otp: z
      .number({
        required_error: "OTP is required!",
      })
      .int() // Make sure it's an integer
      .gte(100000) // Greater than or equal to the smallest 5 digit int
      .lte(999999),
    email: z
      .string({
        required_error: "Email is required!",
      })
      .email("Email not valid!"),
  }),
});
