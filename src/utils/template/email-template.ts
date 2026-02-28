export function verificationEmailTemplate(name: string, token: string) {
  const verifyUrl = `${process.env.FE_URL}/verify-email?token=${token}`;

  return `
    <div style="font-family: -apple-system, BlinkMacOSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 32px 20px; color: #1f2937;">
  <h2 style="margin: 0 0 24px; color: #111827;">Halo ${name},</h2>
  
  <p style="margin: 0 0 20px; line-height: 1.6;">
    Terima kasih sudah bergabung! 🎉<br>
    Tinggal satu langkah lagi nih — yuk verifikasi alamat email kamu.
  </p>

  <div style="text-align: center; margin: 32px 0;">
    <a href="${verifyUrl}" 
       style="background: #f97316; color: white; font-weight: 600;
              padding: 14px 32px; border-radius: 8px; text-decoration: none;
              display: inline-block; font-size: 16px; box-shadow: 0 2px 8px rgba(249,115,22,0.25);">
      Verifikasi Email Sekarang
    </a>
  </div>

  <p style="margin: 32px 0 20px; line-height: 1.6; font-size: 15px;">
    Atau kalau tombol di atas tidak berfungsi, kamu bisa copy-paste link ini ke browser:<br>
    <a href="${verifyUrl}" style="color: #f97316; word-break: break-all;">${verifyUrl}</a>
  </p>

  <p style="color: #6b7280; font-size: 13px; line-height: 1.5; margin: 32px 0 0; border-top: 1px solid #e5e7eb; padding-top: 20px;">
    • Link ini akan kadaluarsa dalam 60 menit<br>
    • Kalau kamu tidak mendaftar akun ini, silakan abaikan email ini saja
  </p>

  <p style="color: #9ca3af; font-size: 12px; margin-top: 24px; text-align: center;">
    © ${new Date().getFullYear()} videobelajarmu. Semua hak dilindungi.
  </p>
</div>
  `;
}
