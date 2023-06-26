import { NextSeo } from 'next-seo';

const SEO = () => (
	<>
		<NextSeo
			title='Arkway'
			description='Redefining File Storage. Store, Encrypt, and Access Your Documents Anytime, Anywhere.'
			openGraph={{
				url: 'https://arkway.vercel.app',
				title: 'Arkway - where content finds freedom',
				description:
					'Redefining File Storage. Store, Encrypt, and Access Your Documents Anytime, Anywhere.',
				images: [
					{
						url: 'https://ipfs.io/ipfs/QmWmkAk9U78S2Q5Y2BpuyEsH6jy8rq3L5xN56KJP2UjvzK',
						width: 1200,
						height: 630,
						alt: 'Arkway Open Graph Image',
						type: 'image/png',
					},
				],
				siteName: 'Arkway',
			}}
			twitter={{
				handle: '@Envoy_1084',
				cardType: 'summary_large_image',
			}}
		/>
	</>
);

export default SEO;
