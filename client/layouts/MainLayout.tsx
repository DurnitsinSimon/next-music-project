import React, { FC } from 'react';
import Navbar from '../components/Navbar';
import Player from '../components/Player';
import Head from 'next/head';
import { title } from 'process';

interface MainLayoutProps {
	title?: string;
	description?: string;
	keywords?: string;
}

// tslint:disable-next-line: no-shadowed-variable
const MainLayout: FC<MainLayoutProps> = ({ children, title, description, keywords }) => {
	return (
		<>
			<Head>
				<title>{title || 'Музыкальная  площадка'}</title>
				<meta
					name={'description'}
					content={'Музыкальная площадка. Здесь вы можете делиться своим творчеством' + description}
				/>
				<meta name='robots' content='index, follow'/>
				<meta name='keywords' content={keywords || 'Музыка, треки, артисты'}/>
				<meta name='viewport' content='width=device-width, initial-scale=1 '/>
			</Head>
			<Navbar />
			<div style={{ margin: '90px 0' }}>{children}</div>
			<Player />
		</>
	);
};

export default MainLayout;
