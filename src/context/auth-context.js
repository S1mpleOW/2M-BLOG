import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from 'components/loading';
import { auth } from 'firebaseSrc/firebase-config';
const AuthContext = createContext();

const AuthProvider = (props) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const unsubcribed = auth.onAuthStateChanged((user) => {
			if (user) {
				setUser(user);
			}
			setLoading(false);
		});
		return () => {
			setLoading(true);
			unsubcribed();
		};
	}, [navigate]);

	return (
		<AuthContext.Provider value={{ user, setUser }} {...props}>
			{loading ? <LoadingSpinner /> : props.children}
		</AuthContext.Provider>
	);
};

const useAuth = () => {
	const context = useContext(AuthContext);
	if (typeof context === 'undefined') {
		throw new Error('useAuth must be used within a AuthProvider');
	}
	return context;
};

export { AuthProvider, useAuth };
