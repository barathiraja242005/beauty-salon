import { SessionOptions } from "iron-session";

export interface SessionData {
  isAdmin: boolean;
}

export function getSessionOptions(): SessionOptions {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    // Provide a default for dev so the app doesn't crash — change in production!
    console.warn("[glamour-studio] SESSION_SECRET not set or too short. Using fallback.");
  }
  return {
    password: secret ?? "glamour-studio-dev-secret-key-32chars!!",
    cookieName: "glamour-studio-admin",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    },
  };
}

// Backwards-compat export used by existing imports
export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET ?? "glamour-studio-dev-secret-key-32chars!!",
  cookieName: "glamour-studio-admin",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  },
};
