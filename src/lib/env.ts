function readEnv(name: string) {
  const value = process.env[name];
  return value ?? "";
}

export const env = {
  mongoUri: readEnv("MONGODB_URI"),
  jwtSecret: readEnv("JWT_SECRET") || "dev-only-huts4u-secret",
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  adminEmail: process.env.ADMIN_EMAIL?.toLowerCase() ?? "admin@huts4u.com",
};

export function isDatabaseConfigured() {
  return Boolean(env.mongoUri);
}
