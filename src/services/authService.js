import {readStorage, removeStorage, writeStorage} from '../utils/storage';

const USERS_KEY = 'job_tracker_users_v1';
const SESSION_KEY = 'job_tracker_auth_session_v1';

function normalizeEmail(email) {
  return email.trim().toLocaleLowerCase();
}

function getUsers() {
  const users = readStorage(USERS_KEY, []);
  if (!Array.isArray(users)) return [];

  return users.filter((user) => {
    if (!user || typeof user !== 'object') return false;
    const candidate = user;
    return (
      typeof candidate.id === 'string' &&
      typeof candidate.fullName === 'string' &&
      typeof candidate.email === 'string' &&
      typeof candidate.password === 'string'
    );
  });
}

function toAuthUser(user) {
  return {id: user.id, fullName: user.fullName, email: user.email};
}

function createUserId() {
  return typeof crypto.randomUUID === 'function'
    ? `user_${crypto.randomUUID()}`
    : `user_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

export function registerUser(input) {
  const users = getUsers();
  const email = normalizeEmail(input.email);

  if (users.some((user) => normalizeEmail(user.email) === email)) {
    return {success: false, message: 'An account with this email already exists.'};
  }

  // Demo only: passwords are intentionally stored as plain text in localStorage.
  // Replace this service with a backend before using authentication in production.
  const user = {
    id: createUserId(),
    fullName: input.fullName.trim(),
    email,
    password: input.password,
  };

  if (!writeStorage(USERS_KEY, [...users, user])) {
    return {success: false, message: 'Your browser could not save this account.'};
  }

  return {success: true, user: toAuthUser(user)};
}

export function loginUser(input) {
  const email = normalizeEmail(input.email);
  const user = getUsers().find(
    (candidate) => normalizeEmail(candidate.email) === email && candidate.password === input.password,
  );

  if (!user) {
    return {success: false, message: 'Email or password is incorrect.'};
  }

  const authUser = toAuthUser(user);
  logoutUser();
  const target = input.rememberMe ? localStorage : sessionStorage;
  if (!writeStorage(SESSION_KEY, authUser, target)) {
    return {success: false, message: 'Your browser could not start a session.'};
  }

  return {success: true, user: authUser};
}

export function logoutUser() {
  removeStorage(SESSION_KEY, localStorage);
  removeStorage(SESSION_KEY, sessionStorage);
}

export function getCurrentUser() {
  const user = readStorage(SESSION_KEY, null, localStorage)
    ?? readStorage(SESSION_KEY, null, sessionStorage);

  return user && typeof user.id === 'string' && typeof user.email === 'string' ? user : null;
}

export function isLoggedIn() {
  return getCurrentUser() !== null;
}
