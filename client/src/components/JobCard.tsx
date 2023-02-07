import { Box, Text, Icon, Flex, Button, Image } from "@chakra-ui/react";
import React from "react";
import { GoLocation, GoLinkExternal } from "react-icons/go";
import { BiTime } from "react-icons/bi";

const JobCard = () => {
  return (
    <Box rounded="md" dropShadow={"md"} bg={"white"} p="4">
      <Image
        boxSize="100px"
        objectFit="cover"
        src="https://bit.ly/dan-abramov"
        alt="Dan Abramov"
      />
      <Text
        mt={3}
        cursor={"pointer"}
        fontWeight={"semibold"}
        color="blue.500"
        fontSize={"2xl"}
      >
        Job Title
      </Text>
      <Text fontSize={"lg"} mt={3}>
        Job Company
      </Text>

      <Flex mt={3} alignItems={"center"} gap={2}>
        <Icon fontSize={"lg"} mt={1} as={GoLocation} />
        <Text fontSize={"lg"} mt={1} fontWeight={"semibold"}>
          Location
        </Text>
      </Flex>
      <Flex alignItems={"center"} gap={2}>
        <Icon fontSize={"lg"} mt={1} as={BiTime} />
        <Text fontSize={"lg"} mt={1} fontWeight={"semibold"}>
          6 days ago
        </Text>
      </Flex>
      <Button
        mt={5}
        lineHeight={"10"}
        colorScheme="blue"
        rightIcon={<Icon fontSize={"xl"} as={GoLinkExternal} />}
      >
        Apply Now
      </Button>
    </Box>
  );
};

export default JobCard;
