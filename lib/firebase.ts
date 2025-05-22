// lib/firebase.ts
import { initializeApp, getApps, getApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { initializeApp as initializeClientApp, getApps as getClientApps } from "firebase/app";
import { getFunctions } from "firebase/functions";

// Firebase Admin 初期化（サーバーサイド）
if (!getApps().length) {
  initializeApp();
}

export const db = getFirestore();
export const auth = getAuth();

// Firebase Client 初期化（クライアントサイド）
const clientConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const clientApp = getClientApps().length ? getClientApps()[0] : initializeClientApp(clientConfig);

export const functions = getFunctions(clientApp, "asia-northeast1");
