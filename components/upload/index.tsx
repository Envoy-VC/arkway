import React from 'react';

import { Button } from '@nextui-org/react';
import { PaperPlus } from 'react-iconly';

const Upload = () => {
	return (
		<Button
			auto
			light
			icon={<PaperPlus set='bold' primaryColor='#000000' size={24} />}
			className='font-medium py-6 z-0'
		>
			Add file
		</Button>
	);
};

export default Upload;
