// import Head from 'next/head'
import Image from "next/image";
// import { Inter } from '@next/font/google'
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { Button, Text, Flex, Box } from "@chakra-ui/react";
import { fetchApi, BASE_URL } from "../utils/fetchAPI";
import Property from "../components/Property";
export const Banner = ({
  purpose,
  title1,
  title2,
  desc1,
  desc2,
  btnText,
  linkName,
  imgUrl,
}) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
    <Image src={imgUrl} width={500} height={300} alt="banner" />
    <Box p="5">
      <Text fontSize="sm" fontWeight="medium" color="gray.500">
        {purpose}
      </Text>
      <Text fontSize="3xl" fontWeight="bold">
        {title1} <br />
        {title2}
      </Text>
      <Text fontSize="lg" paddingBottom="3" paddingTop="3" color="gray.700">
        {desc1} <br />
        {desc2}
      </Text>
      <Button colorScheme="blue" fontSize="xl">
        <Link href={linkName}>{btnText}</Link>
      </Button>
    </Box>
  </Flex>
);

export default function Home({ propertiesForSale, propertiesForRent }) {
  console.log(propertiesForSale, propertiesForRent);
  return (
    <Box>
      <Banner
        purpose="RENT A HOME"
        title1="Rental Homes for"
        title2="Everyone"
        linkName="/search?purpose=for-rent"
        imgUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
        btnText="Explore Renting"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more"
      />
      <Flex flexWrap="wrap">
        {propertiesForRent.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
      <Banner
        purpose="BUY A HOME"
        title1=" Find, Buy & Own Your"
        title2="Dream Home"
        desc1=" Explore from Apartments, land, builder floors,"
        desc2=" villas and more"
        btnText="Explore Buying"
        linkName="/search?purpose=for-sale"
        imgUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
      />
      <Flex flexWrap="wrap">
        {propertiesForSale.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
    </Box>
  );
}

export async function getStaticProps() {
  const propertyForSale = await fetchApi(
    `${BASE_URL}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
  );
  const propertyForRent = await fetchApi(
    `${BASE_URL}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
  );

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    },
  };
}
