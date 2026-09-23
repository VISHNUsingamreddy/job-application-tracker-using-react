import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import {get, ref, set} from 'firebase/database';
import {auth, database} from './firebase';

function normalizeEmail(email) {
  return email.trim().toLocaleLowerCase();
}

function toAuthUser(user, profile = {}) {
  return {id: user.uid, fullName: profile.fullName || user.displayName || '', email: user.email};
}

function firebaseMessage(error, fallback) {
  if (error.code === 'auth/email-already-in-use') return 'An account with this email already exists.';
  if (error.code === 'auth/invalid-credential' || error.code === 'auth/invalid-login-credentials') {
    return 'Email or password is incorrect.';
  }
  return fallback;
}

export async function registerUser(input) {
  try {
    const email = normalizeEmail(input.email);
    const credential = await createUserWithEmailAndPassword(auth, email, input.password);
    const fullName = input.fullName.trim();
    await updateProfile(credential.user, {displayName: fullName});
    await set(ref(database, `users/${credential.user.uid}`), {fullName, email});
    return {success: true, user: toAuthUser(credential.user, {fullName})};
  } catch (error) {
    return {success: false, message: firebaseMessage(error, 'Your account could not be created.')};
  }
}

export async function loginUser(input) {
  try {
    await setPersistence(auth, input.rememberMe ? browserLocalPersistence : browserSessionPersistence);
    const credential = await signInWithEmailAndPassword(auth, normalizeEmail(input.email), input.password);
    const snapshot = await get(ref(database, `users/${credential.user.uid}`));
    return {success: true, user: toAuthUser(credential.user, snapshot.val() || {})};
  } catch (error) {
    return {success: false, message: firebaseMessage(error, 'Email or password is incorrect.')};
  }
}

export function logoutUser() {
  return signOut(auth);
}

export function subscribeToAuth(callback) {
  return onAuthStateChanged(auth, async (user) => {
    if (!user) {
      callback(null);
      return;
    }

    try {
      const snapshot = await get(ref(database, `users/${user.uid}`));
      callback(toAuthUser(user, snapshot.val() || {}));
    } catch {
      callback(toAuthUser(user));
    }
  });
}
