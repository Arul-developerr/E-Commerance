import { z } from "zod";

export const checkoutSchema = z.object({
  email: z.string().email("Invalid email address"),
  fullName: z.string().min(2, "Full name is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  zip: z.string().min(5, "Valid zip code required"),
  phone: z.string().min(10, "Phone number is required"),
  paymentMethod: z.enum(["card", "paypal", "cod"]),
  cardNumber: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
