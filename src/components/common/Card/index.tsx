import { Paper, Text, Flex, Button, Box } from "@mantine/core";
import { IconPointFilled, IconStarFilled } from "@tabler/icons-react";
import Image from "next/image";
import { useEffect } from "react";
import { restaurantimage } from "../../../../src/assets";

type TRestaurant = {
  id: string;
  name: string;
  rating: number;
  price: number;
  opened: boolean;
  type_restaurant: string;
};

type Props = {
  restaurant: TRestaurant;
};

export const Card = ({ restaurant }: Props) => {
  // useEffect(() => {
  //   handleGetDate();
  // }, []);

  console.log("restaurant from props", restaurant);

  return (
    <>
      <Flex>
        <Paper>
          <Flex
            direction="column"
            justify="space-between"
            h={305}
            align="center"
          >
            <Image alt="" src={restaurantimage} height={150} width={250} />
            <Flex
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
              gap="xs"
            >
              <Flex direction="column" gap="6px">
                <Text w={250}>{restaurant.name}</Text>
                <Flex>
                  {Array.from(
                    { length: restaurant.rating },
                    (_, index: number) => (
                      <Box sx={(theme) => ({ color: theme.colors.brand })}>
                        <IconStarFilled key={index} size={20} />
                      </Box>
                    )
                  )}
                </Flex>
              </Flex>
              <Flex justify="space-between">
                <Text size="sm">
                  {restaurant.type_restaurant} - {restaurant.price}
                </Text>

                {restaurant.opened === true ? (
                  <>
                    <Flex justify="center" align="center">
                      <IconPointFilled size={18} style={{ color: "green" }} />
                      <Text size="sm">OPEN NOW</Text>
                    </Flex>
                  </>
                ) : (
                  <>
                    <Flex justify="center" align="center">
                      <IconPointFilled size={18} style={{ color: "red" }} />
                      <Text size="sm">CLOSED</Text>
                    </Flex>
                  </>
                )}
              </Flex>
            </Flex>
            <Button w="100%" h="100px" radius={0}>
              LEARN MORE
            </Button>
          </Flex>
        </Paper>
      </Flex>
    </>
  );
};
