import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Badge, SimpleGrid, Image, Heading } from "@chakra-ui/react";

const Home = ({ propertiesForSale, propertiesForRent }) => {
  const [data, setData] = useState([]);
  console.log(propertiesForSale, propertiesForRent);
  var options = {
    method: "GET",
    url: "https://bayut.p.rapidapi.com/properties/list",
    params: {
      locationExternalIDs: "5002,6020",
      purpose: "for-rent",
      hitsPerPage: "25",
      page: "0",
      lang: "en",
      sort: "city-level-score",
      rentFrequency: "monthly",
      categoryExternalID: "4",
    },
    headers: {
      "x-rapidapi-host": "bayut.p.rapidapi.com",
      "x-rapidapi-key": "f14362c2f9msh256b7ee1078a2eap1c6fcejsn569f7774bf22",
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        setData(response.data.hits);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Heading
        as="h2"
        size="xl"
        isTruncated
        style={{ textAlign: "center", marginTop: "20px" }}
      >
        Rental House
      </Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={10}>
        {data.map((item) => (
          <Box
            style={{ marginLeft: "20px", marginTop: "40px" }}
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
          >
            <Image
              src={item.coverPhoto.url}
              style={{ height: "270px", width: "100%" }}
              alt="home"
            />
            <Box p="6">
              <Box display="flex" alignItems="baseline">
                <Badge borderRadius="full" px="2" colorScheme="teal">
                  {item.state}
                </Badge>
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textTransform="uppercase"
                  ml="2"
                >
                  {item.rooms} room &bull; {item.baths}
                  baths
                </Box>
              </Box>

              <Box
                mt="1"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
              >
                {item.agency.name}
              </Box>
              <Box>
                <Box as="span" color="gray.600" fontSize="sm">
                  {item.price}/week
                </Box>
              </Box>
              <Box>
                <Box
                  mt="1"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                  isTruncated
                >
                  {item.furnishingStatus}. mobile
                  {item.phoneNumber.mobile}
                </Box>
                <span
                  mt="1"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                  isTruncated
                ></span>
              </Box>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
};

export default Home;
