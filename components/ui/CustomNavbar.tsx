import { FC, useRef } from 'react';

import Image from 'next/image';
import NextLink from 'next/link';

import {
  Container,
  Input,
  Link,
  Navbar,
  Spacer,
  Text,
} from '@nextui-org/react';
import { SearchIcon } from '.';

interface Props {
  onQueryChange?: (search: string) => string;
}

const CustomNavbar: FC<Props> = ({ onQueryChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onSearch = () => {
    if (inputRef.current !== null) onQueryChange!(inputRef.current.value);
  };

  return (
    <Navbar isBordered shouldHideOnScroll variant='sticky'>
      <Navbar.Brand>
        <NextLink href='/' passHref>
          <Link>
            <Image
              src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg'
              alt='icono de la app'
              width={27}
              height={27}
            />
            <Spacer x={0.5} />
            <Text
              color='white'
              css={{
                '@xsMax': {
                  fontSize: 25,
                },
                '@mdMax': {
                  fontSize: 30,
                },
              }}
              h2
            >
              P
            </Text>
            <Text
              color='white'
              css={{
                '@xsMax': {
                  fontSize: 18,
                },
                '@smMax': {
                  fontSize: 22,
                },
              }}
              h3
            >
              okémon
            </Text>
          </Link>
        </NextLink>
      </Navbar.Brand>

      {onQueryChange && (
        <Navbar.Content>
          <Navbar.Item>
            <Input
              contentLeft={
                <SearchIcon fill='var(--nextui-colors-accents6)' size={16} />
              }
              // contentLeftStyling={false}
              aria-label='search input'
              ref={inputRef}
              clearable
              onChange={onSearch}
              bordered
              placeholder='Search pokemon'
              css={{
                width: 'auto',
              }}
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
