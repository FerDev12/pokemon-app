import { useState } from 'react';

import Image from 'next/image';
import NextLink from 'next/link';

import { Link, Navbar, Spacer, Text } from '@nextui-org/react';

const CustomNavbar = () => {
  const [image, setImage] = useState('');

  return (
    <Navbar isBordered shouldHideOnScroll variant='sticky'>
      <Navbar.Brand>
        <NextLink href='/' passHref>
          <Link>
            <Image
              src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg'
              alt='icono de la app'
              width={40}
              height={40}
            />
            <Spacer x={0.5} />
            <Text color='white' h2>
              P
            </Text>
            <Text color='white' h3>
              okémon
            </Text>
          </Link>
        </NextLink>
      </Navbar.Brand>

      <Navbar.Content>
        <Navbar.Link underline href='/favorites'>
          <Text color='white' h4>
            Favorites
          </Text>
        </Navbar.Link>
      </Navbar.Content>
    </Navbar>
  );
};

export { CustomNavbar };
