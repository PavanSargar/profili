export const getOtpTemplate = ({ otp }: { otp: string | number }) => {
  return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset OTP</title>
    </head>

    
    <body style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Password Reset OTP</h2>
        <p>Your OTP for resetting your password is: <strong>${otp}</strong></p>
        <p>Please use this OTP to reset your password. Do not share this OTP with anyone.</p>
        <p>If you did not request this password reset, please ignore this email.</p>
        <p>Thank you!</p>
    </body>
    
    </html>
    `;
};
