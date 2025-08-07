import z from "zod";

export const BuildingSchema = z.object({
  name: z.string().min(1, 'Nombre requerido'),
  address: z.string().min(1, 'Dirección requerida'),
  totalUnits: z.number().min(1, 'Mínimo 1 unidad'),
  // ...
});

export type Building = z.infer<typeof BuildingSchema>;