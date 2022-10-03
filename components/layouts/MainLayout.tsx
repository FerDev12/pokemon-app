import { FC, PropsWithChildren } from 'react';
import Head from 'next/head';
import { Navbar, Text } from '@nextui-org/react';
import Image from 'next/image';
import { CustomNavbar } from '../ui';

type Props = PropsWithChildren & {
  title?: string;
};

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
