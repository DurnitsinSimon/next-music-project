import { Container } from '@mui/material';
import React, { FC } from 'react';
import Navbar from '../components/Navbar';
import Player from '../components/Player';

const MainLayout: FC = ({ children }) => {
	return (
		<>
			<Navbar />
			<div style={{margin: '90px 0'}}>{children}</div>
			<Player />
		</>
	);
};

export default MainLayout;
