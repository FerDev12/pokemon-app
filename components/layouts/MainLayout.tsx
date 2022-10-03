import { FC, PropsWithChildren, useState } from 'react';

import Head from 'next/head';

import { CustomNavbar } from '../ui';

type Props = PropsWithChildren & {
  title?: string;
};

const origin = typeof window === 'undefined' ? '' : window.location;

const MainLayout: FC<Props> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || 'Pokemon App'}</title>
        <meta name='author' content='FerDev12' />
        <meta
          name='description'
          content={`Informacion sobre el pokemon ${title}`}
        />
        <meta name='keywords' content={`${title}, pokemon, pokedex`} />

        {/* og meta tags */}
        <meta property='og:title' content={`Información sobre ${title}`} />
        <meta
          property='og:description'
          content={`Esta es la página sobre ${title}`}
        />
        <meta property='og:image' content={`${origin}/img/banner.png`} />
      </Head>

      <CustomNavbar />

      <main
        style={{
          padding: '0 20px',
        }}
      >
        {children}
      </main>
    </>
  );
};

export { MainLayout };
