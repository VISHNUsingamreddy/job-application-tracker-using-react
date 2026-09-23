import {getAnalytics, isSupported} from 'firebase/analytics';
import {getAuth} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAhWTcOJwZCyhCtgFia6c1yE46Ui3zNnzc",
  authDomain: "vishnu-62859.firebaseapp.com",
  databaseURL: "https://vishnu-62859-default-rtdb.firebaseio.com",
  projectId: "vishnu-62859",
  storageBucket: "vishnu-62859.firebasestorage.app",
  messagingSenderId: "11553372592",
  appId: "1:11553372592:web:13a655d9f7a460c8e7fe75",
  measurementId: "G-NGRRS2T6R2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);

isSupported().then((supported) => {
  if (supported) getAnalytics(app);
});
