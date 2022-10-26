import { getDocs, limit, onSnapshot, query, startAfter, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ITEMS_PER_PAGE } from 'utils/constants';
export default function useFirebaseManage(colRef) {
	const [data, setData] = useState([]);
	const [total, setTotal] = useState(0);
	const [isEmpty, setIsEmpty] = useState(false);
	const [lastDoc, setLastDoc] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [filter, setFilter] = useState('');

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			setIsEmpty(false);
			onSnapshot(colRef, (snapshot) => {
				setTotal(snapshot.size);
			});
			const queryRef = filter
				? query(
						colRef,
						where('displayName', '>=', filter),
						where('displayName', '<=', filter + '\uf8ff'),
						limit(ITEMS_PER_PAGE)
				  )
				: query(colRef, limit(ITEMS_PER_PAGE));
			const documentSnapshots = await getDocs(queryRef);
			const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

			setLastDoc(lastVisible);
			onSnapshot(queryRef, (snapshot) => {
				const items = [];
				snapshot.forEach((doc) => {
					items.push({
						id: doc.id,
						...doc.data(),
					});
				});

				setIsLoading(false);
				console.log(items);
				if (items.length === 0) {
					setIsEmpty(true);
					return;
				}
				setData(
					items.sort((userA, userB) => {
						return userA?.updatedAt?.seconds - userB?.updatedAt?.seconds <= 0 ? true : false;
					})
				);
			});
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filter]);

	const handleFetchData = async () => {
		setIsLoading(true);
		if (!lastDoc) {
			setIsLoading(false);
			setIsEmpty(true);
			return;
		}
		const queryRef = filter
			? query(
					colRef,
					where('name', '>=', filter),
					where('name', '<=', filter + '\uf8ff'),
					startAfter(lastDoc),
					limit(ITEMS_PER_PAGE)
			  )
			: query(colRef, startAfter(lastDoc), limit(ITEMS_PER_PAGE));
		const documentSnapshots = await getDocs(queryRef);
		const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
		setLastDoc(lastVisible);
		onSnapshot(queryRef, (snapshot) => {
			const items = [];
			snapshot.forEach((doc) => {
				console.log(doc);
				if (doc.empty) {
					console.log('empty');
				}
				items.push({
					id: doc.id,
					...doc.data(),
				});
			});
			setIsLoading(false);
			if (items.length === 0) {
				setIsEmpty(true);
				return;
			}
			setData((prevState) =>
				[...prevState, ...items].sort(
					(itemA, itemB) => itemA.updatedAt.seconds < itemB.updatedAt.seconds
				)
			);
		});
	};

	return { handleFetchData, data, total, isEmpty, isLoading, setFilter, filter };
}
