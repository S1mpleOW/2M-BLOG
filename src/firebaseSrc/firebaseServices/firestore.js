import {
	collection,
	doc as document,
	query,
	onSnapshot,
	serverTimestamp,
	orderBy,
	limit,
	addDoc,
	setDoc,
	getDocs,
	getDoc,
} from 'firebase/firestore';
import { db } from 'firebaseSrc/firebase-config';

export const addDocument = async (path, data) => {
	try {
		return await addDoc(collection(db, path), {
			...data,
			createdAt: serverTimestamp(),
			updatedAt: serverTimestamp(),
		});
	} catch (err) {
		console.log(err);
	}
};

export const setDocument = async (collection, doc, data) => {
	console.log(data);
	const documentData = { ...data, updatedAt: serverTimestamp(), createdAt: serverTimestamp() };
	try {
		return await setDoc(document(db, collection, doc), documentData);
	} catch (err) {
		console.log(err);
	}
};

export const getCollection = (path) => getDocs(collection(db, path));

export const getDocument = (collection, doc) => getDoc(document(db, collection, doc));

export const listenCollection = (path, constraints, callback) => {
	const collectionRef = collection(db, path);
	const collectionQuery = getQuery(collectionRef, constraints);
	return onSnapshot(collectionQuery, callback);
};

export const listenDocument = (coll, doc, constraints, callback) => {
	const documentRef = document(db, coll, doc);
	const documentQuery = getQuery(documentRef, constraints);
	return onSnapshot(documentQuery, callback);
};

export const getQuery = (ref, constraints) => {
	if (!constraints) return query(ref);
	const { field, direction, limit: limitConstraint } = constraints;
	const orderQuery = field ? orderBy(field, direction) : null;
	const limitQuery = limitConstraint ? limit(limitConstraint) : null;
	const filteredConstraints = [orderQuery, limitQuery].filter(Boolean);
	return query(ref, ...filteredConstraints);
};
