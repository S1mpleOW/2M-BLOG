import React from 'react';
import './styles/index.scss';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './utils/constants';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { createRoot } from 'react-dom/client';
const container = document.querySelector('#root');
const root = createRoot(container);

root.render(
	<ThemeProvider theme={theme}>
		<GlobalStyles></GlobalStyles>
		<BrowserRouter>
			<App />
			<ToastContainer />
		</BrowserRouter>
	</ThemeProvider>
);
