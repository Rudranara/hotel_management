function readEnv(name: string) {
  const value = process.env[name];
  return value ?? "";
}

export const env = {
  mongoUri: readEnv("MONGODB_URI"),
  jwtSecret: readEnv("JWT_SECRET") || "dev-only-huts4u-secret",
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  adminEmail: process.env.ADMIN_EMAIL?.toLowerCase() ?? "admin@huts4u.com",
  resendApiKey: readEnv("RESEND_API_KEY"),
  resendFrom: process.env.RESEND_FROM ?? "Huts4u <bookings@huts4u.com>",
  razorpayKeyId: readEnv("RAZORPAY_KEY_ID"),
  razorpayKeySecret: readEnv("RAZORPAY_KEY_SECRET"),
};

export function isDatabaseConfigured() {
  return Boolean(env.mongoUri);
}

export function isEmailConfigured() {
  return Boolean(env.resendApiKey);
}

export function isRazorpayConfigured() {
  // Razorpay key IDs are exactly rzp_test_ or rzp_live_ followed by 14 alphanumeric chars
  return /^rzp_(test|live)_[A-Za-z0-9]{14}$/.test(env.razorpayKeyId) &&
    env.razorpayKeySecret.length > 0 &&
    !env.razorpayKeySecret.includes("replace");
}
