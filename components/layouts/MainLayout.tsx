import { FC, PropsWithChildren, useState } from 'react';

import Head from 'next/head';

import { CustomNavbar } from '../ui';

type Props = PropsWithChildren & {
  title?: string;
  onNavbarQueryChange?: (search: string) => string;
};

const origin = typeof window === 'undefined' ? '' : window.location;

const MainLayout: FC<Props> = ({ title, onNavbarQueryChange, children }) => {
  return (
    <>
      <Head>
        <title>{title || 'Pokemon App'}</title>
        <meta name='author' content='FerDev12' />
        <meta name='description' content={`Information of pokemon ${title}`} />
        <meta name='keywords' content={`${title}, pokemon, pokedex`} />

        {/* og meta tags */}
        <meta property='og:title' content={`Information about ${title}`} />
        <meta property='og:description' content={`Page for ${title}`} />
        <meta
          property='og:image'
          content={`${origin}/banner-img/banner/banner.png`}
        />
      </Head>

      <CustomNavbar onQueryChange={onNavbarQueryChange} />

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
