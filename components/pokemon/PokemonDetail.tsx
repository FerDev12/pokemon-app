import {
  Grid,
  Card,
  Button,
  Container,
  Text,
  Image,
  Progress,
  Spacer,
} from '@nextui-org/react';
import confetti from 'canvas-confetti';
import { FC, useState } from 'react';
import { PokeProps } from '../../interfaces';
import { localFavorites } from '../../utils';

interface Props {
  pokemon: PokeProps;
}

const PokemonDetail: FC<Props> = ({ pokemon }) => {
  const [isInFavorites, setIsInFavorites] = useState(
    localFavorites.existInFavorites(pokemon.id)
  );

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorites((prevFav) => !prevFav);

    if (!isInFavorites) {
      confetti({
        zIndex: 999,
        particleCount: 100,
        spread: 160,
        angle: -135,
        origin: {
          x: 1, // 0 - 1
          y: 0, // 0 - 1
        },
      });
      confetti({
        zIndex: 999,
        particleCount: 100,
        spread: 160,
        angle: -45,
        origin: {
          x: 0, // 0 - 1
          y: 0, // 0 - 1
        },
      });
    }
  };

  return (
    <Grid.Container css={{ marginTop: '5px' }} gap={2}>
      <Grid xs={12} sm={4}>
        <Card isPressable css={{ padding: '30px', height: 'fit-content' }}>
          <Card.Body>
            <Card.Image
              src={
                pokemon.sprites.other?.dream_world.front_default ||
                pokemon.sprites.front_default
              }
              alt={pokemon.name}
              width='100%'
              height={200}
            />
            <Spacer />
            <Container
              justify='space-between'
              display='flex'
              alignItems='center'
            >
              <Text transform='capitalize' h1>
                {pokemon.name}
              </Text>
              <Button
                onPress={onToggleFavorite}
                color='gradient'
                animated
                ghost={!isInFavorites}
              >
                {isInFavorites ? 'Remove from favorites' : 'Add to favorites'}
              </Button>
            </Container>

            {/* <Text size={30} css={{ display: 'inline' }}>
              Types [
              {pokemon.types.map((type) => (
                <Text key={type.type.name} size={20}>
                  {type.type.name}
                </Text>
              ))}
              ]
            </Text> */}
          </Card.Body>
        </Card>
      </Grid>
      <Grid xs={12} sm={8}>
        <Card>
          <Card.Header
            css={{ display: 'flex', justifyContent: 'space-between' }}
          ></Card.Header>
          <Card.Body>
            <Text size={30} h3>
              Stats:
            </Text>
            <Container>
              {pokemon.stats.map(({ base_stat, stat }) => (
                <Grid key={stat.name}>
                  <Text size={20} transform='capitalize'>
                    {stat.name}
                  </Text>
                  <Progress size='sm' color='gradient' value={base_stat} />
                </Grid>
              ))}
            </Container>
            <Spacer />
            <Text size={30} h3>
              Sprites:
            </Text>
            <Container display='flex'>
              <Image
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                width={100}
                height={100}
              />
              <Image
                src={pokemon.sprites.back_default}
                alt={pokemon.name}
                width={100}
                height={100}
              />
              <Image
                src={pokemon.sprites.front_shiny}
                alt={pokemon.name}
                width={100}
                height={100}
              />
              <Image
                src={pokemon.sprites.back_shiny}
                alt={pokemon.name}
                width={100}
                height={100}
              />
            </Container>
            <Spacer />
            <Text size={30} h3>
              Abilities:
            </Text>
            <Container>
              {pokemon.abilitiesDescription.map((ability) => {
                return (
                  <div key={ability.name}>
                    <Text transform='capitalize' size={20}>
                      {ability.name}
                    </Text>
                    <Text size={15}>{ability.description}</Text>
                    <Spacer />
                  </div>
                );
              })}
            </Container>
          </Card.Body>
        </Card>
      </Grid>
    </Grid.Container>
  );
};

export { PokemonDetail };
