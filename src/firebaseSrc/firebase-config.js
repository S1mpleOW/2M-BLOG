import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyDKaqKygu-f5SKUSjhktL9CiqUHR20fu3Y',
	authDomain: 'monkey-blogging-f78a1.firebaseapp.com',
	projectId: 'monkey-blogging-f78a1',
	storageBucket: 'monkey-blogging-f78a1.appspot.com',
	messagingSenderId: '745384294711',
	appId: '1:745384294711:web:c9c5eb6307e3e3e01cc2b2',
};
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);

// connectFirestoreEmulator(db, 'localhost', 8080);
// connectAuthEmulator(auth, 'http://localhost:9099');
// connectStorageEmulator(storage, 'localhost', 9199);
export { app, db, auth, storage };
