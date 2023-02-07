import React from "react";
import Navbar from "../components/Navbar";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Text,
  Tag,
  TagLabel,
  SimpleGrid,
} from "@chakra-ui/react";
import Search from "../components/Search";
import JobCard from "../components/JobCard";

const Home = () => {
  return (
    <Box bgColor="gray.100" minH={"100vh"}>
      <Navbar />
      <Box py="5" px="2">
        <Flex>
          <Box flex={"1.5"} p="4">
            <Box>
              <Card variant={"elevated"} boxShadow={"md"}>
                <CardBody>
                  <Flex
                    flexDir={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    gap={4}
                  >
                    <Avatar
                      size="2xl"
                      name="Segun Adebayo"
                      src="https://bit.ly/sage-adebayo"
                    />
                    <Text fontWeight={"bold"} fontSize={"3xl"}>
                      John Doe
                    </Text>
                    <Text color="gray.400" fontSize={"xl"}>
                      Junior Website Developer
                    </Text>
                    <Button
                      mt={5}
                      w="70%"
                      colorScheme="blue"
                      size="lg"
                      color="white"
                      fontSize="xl"
                    >
                      Edit Profile
                    </Button>
                  </Flex>
                </CardBody>
              </Card>
              <Card mt={5} variant={"elevated"} boxShadow={"md"}>
                <CardBody>
                  <Box>
                    <Text fontWeight="bold" fontSize="xl">
                      Skills
                    </Text>
                    <SimpleGrid mt={3} columns={3} gap={4}>
                      <Tag size="lg" colorScheme="red" borderRadius="full">
                        <TagLabel px={2} textAlign="center" w="full">
                          React
                        </TagLabel>
                      </Tag> <Tag size="lg" colorScheme="red" borderRadius="full">
                        <TagLabel px={2} textAlign="center" w="full">
                          Django
                        </TagLabel>
                      </Tag>
                    </SimpleGrid>
                  </Box>
                  <Box mt={10}>
                    <Text fontWeight="bold" fontSize="xl">
                      Desired work location
                    </Text>
                    <SimpleGrid mt={3} columns={3} gap={4}>
                      <Tag size="lg" bgColor="#ffc0f9" borderRadius="full">
                        <TagLabel px={2} textAlign="center" w="full">
                          Kuala Lumpur
                        </TagLabel>
                      </Tag>
                      <Tag size="lg" bgColor="#ffc0f9" borderRadius="full">
                        <TagLabel px={2} textAlign="center" w="full">
                          Johor
                        </TagLabel>
                      </Tag>
                    </SimpleGrid>
                  </Box>
                </CardBody>
              </Card>
            </Box>
          </Box>
          <Box flex={"4"} p="4">
            <Search />
            <SimpleGrid mt={5} columns={3} gap={5}>
              <JobCard />
              <JobCard />
              <JobCard />
              <JobCard />
            </SimpleGrid>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Home;
