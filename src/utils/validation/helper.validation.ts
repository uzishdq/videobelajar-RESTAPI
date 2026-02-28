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

export const email = z.email({ message: "Email tidak valid" });

export const password = z
  .string()
  .min(6, "Harus memiliki minimal 6 karakter.")
  .max(50, "Tidak boleh melebihi 50 karakter.");

export const phoneSchema = z
  .string()
  .min(10, {
    message: "Nomor telepon harus terdiri dari minimal 10 digit.",
  })
  .max(15, {
    message: "Nomor telepon tidak boleh lebih dari 15 digit.",
  })
  .regex(/^\d+$/, {
    message: "Nomor telepon hanya boleh berisi angka.",
  })
  .refine((value) => value.startsWith("8"), {
    message: "Nomor telepon harus dimulai dengan 8.",
  });
