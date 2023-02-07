import { Box, Text, Icon, Flex, Button, Image } from "@chakra-ui/react";
import React from "react";
import { GoLocation, GoLinkExternal } from "react-icons/go";
import { BiTime } from "react-icons/bi";
import { Job } from "../types/JobType";


const JobCard = ({ company_logo_url,
  id, job_company, job_link, job_location, job_title, post_time }: Job) => {
  return (
    <Flex flexDirection={"column"} justifyContent={"space-between"} rounded="md" dropShadow={"md"} bg={"white"} p="4">
      <Box>
        <Image
          boxSize="100px"
          objectFit="cover"
          src={company_logo_url}
          alt="Dan Abramov"
        />
        <Text
          onClick={() => window.open(job_link, "_blank")}
          mt={3}
          cursor={"pointer"}
          fontWeight={"semibold"}
          color="blue.500"
          fontSize={"2xl"}
        >
          {job_title}
        </Text>
        <Text fontSize={"lg"} mt={3}>
          {job_company}
        </Text>

        <Flex mt={3} alignItems={"center"} gap={2}>
          <Icon fontSize={"lg"} mt={1} as={GoLocation} />
          <Text fontSize={"lg"} mt={1} fontWeight={"semibold"}>
            {job_location}
          </Text>
        </Flex>
        <Flex alignItems={"center"} gap={2}>
          <Icon fontSize={"lg"} mt={1} as={BiTime} />
          <Text fontSize={"lg"} mt={1} fontWeight={"semibold"}>
            {post_time}
          </Text>
        </Flex>
      </Box>
      <Button
        onClick={() => window.open(job_link, "_blank")}
        mt={5}
        lineHeight={"10"}
        colorScheme="blue"
        rightIcon={<Icon fontSize={"xl"} as={GoLinkExternal} />}
      >
        Apply Now
      </Button>
    </Flex>
  );
};

export default JobCard;
