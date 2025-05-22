// 修正後
import { initializeApp, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

if (!getApps().length) {
  initializeApp(); // 環境変数や Firebase サービスアカウントにより自動構成
}

export const db = getFirestore();
