import { date, z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  description: z.string().min(1, "Description is required"),
  datetime: z.string().min(1, "Date and time are required"),
  leadSource: z.string().min(1),
  handler: z.string().min(1),
  response: z.string().min(1),
  notes: z.string().optional(),
  sowGiven: z.boolean(),
  finalPrice: z.number().nonnegative(),
  terms: z.number().min(1),
  meetingSchedule: z.string().optional(),
  payments: z.array(z.number().nonnegative()),
});

export type LeadInput = z.infer<typeof leadSchema>;
