import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, connectAuthEmulator, Auth } from "firebase/auth";
import { getStorage, connectStorageEmulator, FirebaseStorage } from "firebase/storage";

// Read envs from Next.js runtime
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID as string,
};

function assertEnv(variable: string | undefined, name: string): asserts variable is string {
  if (!variable) {
    throw new Error(`Missing required env var: ${name}`);
  }
}

assertEnv(firebaseConfig.apiKey, "NEXT_PUBLIC_FIREBASE_API_KEY");
assertEnv(firebaseConfig.authDomain, "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN");
assertEnv(firebaseConfig.projectId, "NEXT_PUBLIC_FIREBASE_PROJECT_ID");
assertEnv(firebaseConfig.storageBucket, "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET");
assertEnv(firebaseConfig.messagingSenderId, "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID");
assertEnv(firebaseConfig.appId, "NEXT_PUBLIC_FIREBASE_APP_ID");

let app: FirebaseApp;
let auth: Auth;
let storage: FirebaseStorage;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]!;
}

auth = getAuth(app);
storage = getStorage(app);

// Emulator support for localhost when flag is enabled
const useEmulator = process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS === "true";
if (useEmulator) {
  const authPort = Number(process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_PORT || 9099);
  const storagePort = Number(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_EMULATOR_PORT || 9199);

  try {
    connectAuthEmulator(auth, `http://localhost:${authPort}`, { disableWarnings: true });
  } catch {}
  try {
    connectStorageEmulator(storage, "localhost", storagePort);
  } catch {}
}

export { app, auth, storage };

