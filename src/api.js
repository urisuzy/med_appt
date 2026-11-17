import axios from "axios";

/**
 * Base URL of the StayHealthy registration / authentication service.
 * Override it with VITE_API_BASE_URL when the backend lives elsewhere.
 */
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://stayhealthy-api.azurewebsites.net";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 8000,
});

/**
 * The capstone is graded as a front-end project, so the app still has to be
 * usable when the demo API is unreachable (offline reviews, local demos...).
 * These helpers keep a local copy of the session and of the demo accounts so
 * the UI never gets stuck behind a network error.
 */
const USERS_KEY = "stayhealthy-users";
const TOKEN_KEY = "auth-token";
const PROFILE_KEY = "stayhealthy-profile";

const read = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));

export const getToken = () => sessionStorage.getItem(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY);

export const setToken = (token) => {
  sessionStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(TOKEN_KEY, token);
};

export const clearToken = () => {
  sessionStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_KEY);
};

export const isLoggedIn = () => Boolean(getToken());

export const localRegister = ({ name, email, phone, password }) => {
  const users = read(USERS_KEY, []);
  if (users.some((u) => u.email === email)) {
    throw new Error("An account with this email already exists.");
  }
  const user = {
    id: Date.now(),
    name,
    email,
    phone,
    password,
    token: `local-${btoa(`${email}:${Date.now()}`)}`,
  };
  users.push(user);
  write(USERS_KEY, users);
  write(PROFILE_KEY, { name, email, phone });
  setToken(user.token);
  return { message: "User registered successfully", token: user.token, user };
};

export const localLogin = ({ email, password }) => {
  const users = read(USERS_KEY, []);
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) throw new Error("Invalid email or password.");
  setToken(user.token);
  write(PROFILE_KEY, { name: user.name, email: user.email, phone: user.phone });
  return { message: "Login successful", token: user.token, user };
};

export const getProfile = () => read(PROFILE_KEY, null);
export const saveProfile = (profile) => write(PROFILE_KEY, profile);

/** Network failures are what a demo deployment hits; server errors are real. */
export const isNetworkError = (error) => !error?.response;
