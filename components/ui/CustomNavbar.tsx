import { FC, useRef } from 'react';

import Image from 'next/image';
import NextLink from 'next/link';

import { Input, Link, Navbar, Spacer, Text } from '@nextui-org/react';

interface Props {
  onQueryChange?: (search: string) => string;
}

const CustomNavbar: FC<Props> = ({ onQueryChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onSearch = () => {
    if (inputRef.current !== null) onQueryChange!(inputRef.current.value);
  };

  return (
    <Navbar isBordered shouldHideOnScroll variant='floating'>
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

      {onQueryChange && (
        <Navbar.Content>
          <Navbar.Item>
            <Input
              aria-label='search-input'
              ref={inputRef}
              type='search'
              onChange={onSearch}
              clearable
              underlined
              placeholder='Search pokemon'
            />
          </Navbar.Item>
        </Navbar.Content>
      )}

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
