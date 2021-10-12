import React, { FC } from 'react';
import MainLayout from '../layouts/MainLayout';

const Index: FC = () => {
	return (
		<>
			<MainLayout>
				<div className='center'>
					<h1>Добро пожаловать!</h1>
					<h3>Здесь лучшие треки!</h3>
				</div>
			</MainLayout>

			<style jsx>
				{`
					.center {
						margin: 150px 0 0 0;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
					}
				`}
			</style>
		</>
	);
};

export default Index;
