const admin = require('firebase-admin');

let firebaseApp = null;

const initializeFirebase = () => {
  try {
    if (!firebaseApp) {
      const serviceAccount = {
        type: "service_account",
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
      };

      firebaseApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: process.env.FIREBASE_PROJECT_ID,
      });

      console.log('✅ Firebase Admin initialized successfully');
    }
    return firebaseApp;
  } catch (error) {
    console.error('❌ Firebase initialization error:', error.message);
    throw new Error('Failed to initialize Firebase Admin SDK');
  }
};

const verifyFirebaseToken = async (idToken) => {
  try {
    if (!firebaseApp) {
      throw new Error('Firebase not initialized');
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    return decodedToken;
  } catch (error) {
    console.error('❌ Firebase token verification error:', error.message);
    throw new Error('Invalid Firebase token');
  }
};

const createCustomToken = async (uid, additionalClaims = {}) => {
  try {
    if (!firebaseApp) {
      throw new Error('Firebase not initialized');
    }

    const customToken = await admin.auth().createCustomToken(uid, additionalClaims);
    return customToken;
  } catch (error) {
    console.error('❌ Custom token creation error:', error.message);
    throw new Error('Failed to create custom token');
  }
};

const getUserByEmail = async (email) => {
  try {
    if (!firebaseApp) {
      throw new Error('Firebase not initialized');
    }

    const userRecord = await admin.auth().getUserByEmail(email);
    return userRecord;
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      return null;
    }
    console.error('❌ Get user by email error:', error.message);
    throw new Error('Failed to get user by email');
  }
};

const createFirebaseUser = async (email, password, displayName) => {
  try {
    if (!firebaseApp) {
      throw new Error('Firebase not initialized');
    }

    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName,
      emailVerified: false,
    });

    return userRecord;
  } catch (error) {
    console.error('❌ Create Firebase user error:', error.message);
    throw new Error('Failed to create Firebase user');
  }
};

const updateFirebaseUser = async (uid, updateData) => {
  try {
    if (!firebaseApp) {
      throw new Error('Firebase not initialized');
    }

    const userRecord = await admin.auth().updateUser(uid, updateData);
    return userRecord;
  } catch (error) {
    console.error('❌ Update Firebase user error:', error.message);
    throw new Error('Failed to update Firebase user');
  }
};

const deleteFirebaseUser = async (uid) => {
  try {
    if (!firebaseApp) {
      throw new Error('Firebase not initialized');
    }

    await admin.auth().deleteUser(uid);
    return true;
  } catch (error) {
    console.error('❌ Delete Firebase user error:', error.message);
    throw new Error('Failed to delete Firebase user');
  }
};

const setCustomUserClaims = async (uid, customClaims) => {
  try {
    if (!firebaseApp) {
      throw new Error('Firebase not initialized');
    }

    await admin.auth().setCustomUserClaims(uid, customClaims);
    return true;
  } catch (error) {
    console.error('❌ Set custom claims error:', error.message);
    throw new Error('Failed to set custom user claims');
  }
};

module.exports = {
  initializeFirebase,
  verifyFirebaseToken,
  createCustomToken,
  getUserByEmail,
  createFirebaseUser,
  updateFirebaseUser,
  deleteFirebaseUser,
  setCustomUserClaims,
  admin
};
