const { Container, Text, Image } = require('@nextui-org/react');

const NoFavorites = () => {
  return (
    <Container
      css={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh -100px)',
        alignItems: 'center',
        alignSelf: 'center',
      }}
    >
      <Text h1>No hay favoritos guardados</Text>
      <Image
        src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg'
        alt='charmander image'
        width={250}
        height={250}
        css={{ opacity: 0.1 }}
      />
    </Container>
  );
};

export { NoFavorites };
