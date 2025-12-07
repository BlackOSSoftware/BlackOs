import { z } from "zod";

export const ImageRefZ = z.object({
  url: z.string().nonempty(),
  public_id: z.string(),
});

export const MinerZ = z.object({
  id: z.string().nonempty(),
  title: z.string().nonempty(),
  brand: z.string().optional().default(""),
  modelname: z.string().optional().default(""),
  description: z.string().optional().default(""),
  outputVoltage: z.string().optional().default(""),
  coolingMethod: z.string().optional().default(""),
  category: z.string().optional().default(""),
  price: z.number(),
  discountPrice: z.number().nonnegative().optional().default(0),
  stockQty: z.number().int().nonnegative().optional().default(0),
  minQty: z.number().int().nonnegative().optional().default(1),
  maxQty: z.number().int().nonnegative().optional().default(10),
  images: z.array(ImageRefZ).optional().default([]),
  grade: z.enum(["New", "Refurbised"]).optional().default("New"),
  topSeller: z.boolean().optional().default(false),
  hotMiner: z.boolean().optional().default(false),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type MinerType = z.infer<typeof MinerZ>;
export type ImageRefType = z.infer<typeof ImageRefZ>;
