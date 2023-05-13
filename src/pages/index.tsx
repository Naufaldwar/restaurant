import { Card } from "~/components/common/Card";
import { Container, Flex, Text } from "@mantine/core";
import axios from "axios";

type TRestaurant = {
  id: string;
  name: string;
  rating: number;
  price: number;
  opened: boolean;
  categories: string;
};

const handleGetDate = async () => {
  const response = await axios.get<TRestaurant[]>(
    "https://645e73a512e0a87ac0f0ba10.mockapi.io/api/v1/restaurant"
  );

  console.log("response", response.data);

  return response.data;
};

type Props = {
  restaurants: TRestaurant[];
};

export async function getStaticProps() {
  const restaurants = await handleGetDate();
  return {
    props: {
      restaurants,
    },
  };
}

export default function Home({ restaurants }: Props) {
  return (
    <>
      <Container size="lg">
        <Text size="xl" my="xl">
          All Restaurant
        </Text>
        <Flex wrap="wrap" gap="md">
          {restaurants.map((restaurant, index) => (
            <Card key={index} restaurant={restaurant} />
          ))}
        </Flex>
      </Container>
    </>
  );
}
