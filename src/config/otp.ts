export const otpTypes = {
    RESET_PASSWORD: 'resetPassword',
    VERIFY_EMAIL: 'verifyEmail',
} as const;

export const otpExpirySecs = 300 as const