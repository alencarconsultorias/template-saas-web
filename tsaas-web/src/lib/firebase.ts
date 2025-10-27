import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth as getFirebaseAuth, connectAuthEmulator, Auth } from "firebase/auth";
import { getStorage as getFirebaseStorage, connectStorageEmulator, FirebaseStorage } from "firebase/storage";

// Initialize Firebase instances
let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;
let _storage: FirebaseStorage | null = null;

function initializeFirebase() {
  if (_app && _auth && _storage) {
    return { app: _app, auth: _auth, storage: _storage };
  }

  // Determine environment - DEV by default, PROD if NODE_ENV is production
  const isProd = process.env.NODE_ENV === "production";
  const envSuffix = isProd ? "PROD" : "DEV";

  // Read environment variables - handle missing values gracefully
  const apiKey = process.env[`NEXT_PUBLIC_FIREBASE_API_KEY_${envSuffix}`];
  const authDomain = process.env[`NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN_${envSuffix}`];
  const projectId = process.env[`NEXT_PUBLIC_FIREBASE_PROJECT_ID_${envSuffix}`];
  const storageBucket = process.env[`NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_${envSuffix}`];
  const messagingSenderId = process.env[`NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID_${envSuffix}`];
  const appId = process.env[`NEXT_PUBLIC_FIREBASE_APP_ID_${envSuffix}`];

  if (!apiKey || !authDomain || !projectId || !storageBucket || !messagingSenderId || !appId) {
    throw new Error(`Missing required Firebase environment variables for ${envSuffix} environment`);
  }

  const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
  };

  if (!getApps().length) {
    _app = initializeApp(firebaseConfig);
  } else {
    _app = getApps()[0]!;
  }

  _auth = getFirebaseAuth(_app);
  _storage = getFirebaseStorage(_app);

  // Emulator support for localhost when flag is enabled
  const useEmulator = process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS === "true";
  if (useEmulator) {
    const authPort = Number(process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_PORT || 9099);
    const storagePort = Number(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_EMULATOR_PORT || 9199);

    try {
      connectAuthEmulator(_auth, `http://localhost:${authPort}`, { disableWarnings: true });
    } catch {}
    try {
      connectStorageEmulator(_storage, "localhost", storagePort);
    } catch {}
  }

  return { app: _app, auth: _auth, storage: _storage };
}

// Initialize Firebase immediately (lazy initialization handled in initializeFirebase function)
const instances = initializeFirebase();

export const app = instances.app;
export const auth = instances.auth;
export const storage = instances.storage;

