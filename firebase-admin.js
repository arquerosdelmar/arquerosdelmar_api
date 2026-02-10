const { initializeApp, applicationDefault } = require("firebase-admin/app")
const { getAuth } = require("firebase-admin/auth")
const { getFirestore } = require("firebase-admin/firestore")

function initFirebase() {
    initializeApp({
        credential: applicationDefault(),
        projectId: process.env.FIREBASE_PROJECT_ID,
    });
}

module.exports = {
    initFirebase,
    auth: () => getAuth(),
    db: () => getFirestore(),
};