import z from "zod";

const allowedRegex = /^[a-zA-Z0-9.,/() \-']+$/;

export const IdSchema = z.object({
  id: z.uuid("ID tidak valid."),
});

export const validatedStringSchema = (min = 5, max = 50) =>
  z
    .string()
    .min(min, `Harus memiliki minimal ${min} karakter.`)
    .max(max, `Tidak boleh melebihi ${max} karakter.`)
    .regex(
      allowedRegex,
      "Gunakan hanya huruf, angka, spasi, titik, koma, atau garis miring.",
    );
