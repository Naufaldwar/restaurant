import { Box, Container, Flex, Grid, Text } from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/router";
import { restaurantimage, user } from "../../assets";
import axios from "axios";
import { useEffect, useState } from "react";
import { IconStarFilled } from "@tabler/icons-react";

type TReview = {
  id: string;
  name: string;
  text: string;
  rating: number;
};

type TDetailRestaurant = {
  id: string;
  name: string;
  maps: string;
  rating: number;
  review: TReview[];
};

// const handleGetDate = async () => {
//   const response = await axios.get<TDetailRestaurant[]>(
//     "https://645e73a512e0a87ac0f0ba10.mockapi.io/api/v1/detail"
//   );

//   // console.log("response", response.data);

//   return response.data;
// };

export default function DetailPage() {
  const [detailData, setDetailData] = useState<TDetailRestaurant[]>([]);

  useEffect(() => {
    const handleGetDate = async () => {
      try {
        const response = await axios.get<TDetailRestaurant[]>(
          "https://645e73a512e0a87ac0f0ba10.mockapi.io/api/v1/detail"
        );
        console.log("response", response.data);
        // tslint:disable-next-line:no-unsafe-any
        setDetailData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    void handleGetDate();
  }, []);
  const router = useRouter();
  const id = parseInt(router.query.id as string);
  return (
    <Container size="lg">
      {/* {detailData[id - 1]?.id} */}

      <Image
        alt=""
        src={restaurantimage}
        height={300}
        style={{ width: "100%", objectFit: "cover" }}
      />
      <Grid mt="md">
        <Grid.Col span={8}>
          <Flex gap="md">
            <Text size="xl" fw="bold">
              {detailData[id - 1]?.name}
            </Text>
            <Flex align="center" justify="center">
              {Array.from(
                { length: detailData[id - 1]?.rating || 0 },
                (_, index: number) => (
                  <Box
                    sx={(theme) => ({
                      color: theme.colors.brand,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignContent: "center",
                    })}
                  >
                    <IconStarFilled key={index} size={20} />
                  </Box>
                )
              )}
            </Flex>
          </Flex>
          <Text fz="lg" fw="inherit" mt="lg">
            Reviews
          </Text>
          <Flex wrap="wrap" gap="md">
            {detailData[id - 1]?.review.map((item) => (
              <Flex
                key={item.id}
                direction="column"
                p="sm"
                style={{
                  border: "1px  ",
                  borderStyle: "solid",
                  borderColor: "#e0e0e0",
                  borderRadius: "4px",
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  width: "150px",
                }}
              >
                <Image
                  alt=""
                  src={user}
                  height={120}
                  style={{ width: "100%", objectFit: "cover" }}
                />
                <Text>{item.name}</Text>
                <Flex align="center">
                  {Array.from({ length: item.rating }, (_, index: number) => (
                    <Box
                      sx={(theme) => ({
                        color: theme.colors.brand,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignContent: "center",
                      })}
                    >
                      <IconStarFilled key={index} size={20} />
                    </Box>
                  ))}
                </Flex>
                <Text>{item.text}</Text>
              </Flex>
            ))}
          </Flex>
        </Grid.Col>
        <Grid.Col span={"auto"}>
          <Text fz="lg" fw="bolder" mb="md">
            Maps
          </Text>
          <iframe
            src={detailData[id - 1]?.maps}
            width="100%"
            height="300"
            loading="lazy"
          ></iframe>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
