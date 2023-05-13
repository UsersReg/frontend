import { z } from "zod";

export const validName = (name: string) => {
  const nameSchema = z
    .string({ required_error: "Name is required!" })
    .min(2, "Name must be at least 2 characters!");

  nameSchema.parse(name);
};
export const validEmail = (email: string) => {
  const emailSchema = z
    .string({ required_error: "Email is required!" })
    .min(7, "Email must be at least 7 characters!")
    .email("Email is not valid!");

  emailSchema.parse(email);
};
export const validOldPassword = (oldPassword: string) => {
  const passwordSchema = z.string({
    required_error: "Old password is required if you want to update a user!",
  });

  passwordSchema.parse(oldPassword);
};
export const validPassword = (password: string) => {
  const passwordSchema = z
    .string({ required_error: "Password is required!" })
    .min(8, "Password must be at least 8 characters!");

  passwordSchema.parse(password);
};
export const validConfirmPassword = (
  confirmPassword: string,
  originalPassword: string
) => {
  console.log(confirmPassword, originalPassword);
  const confirmPasswordSchema = z
    .string({ required_error: "Please, confirm the password!" })
    .min(1, "Please, confirm the password!")
    .refine(
      (_confirmPassword) => _confirmPassword === originalPassword,
      "Password and confirm password does not match!"
    );

  confirmPasswordSchema.parse(confirmPassword);
};
