import React, { useContext } from "react";
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
  CircularProgress,
  Image,
  Center,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query"
import Search from "../components/Search";
import JobCard from "../components/JobCard";
import { getJobPosts } from "../api/jobs";
import { Job } from "../types/JobType"
import logo from "../assets/logo.png"
import { AuthenticationContext } from "../context/AuthenticationContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
  const { user, loading, tokens } = useContext(AuthenticationContext)

  const jobsQuery = useQuery({
    queryKey: ["jobs"],
    queryFn: () => getJobPosts(),
  })
  return (
    <Box bgColor="gray.100" minH={"100vh"}>
      <Navbar />
      {loading ?
        <Center mt={10}>
          <CircularProgress isIndeterminate color="orange" />
        </Center> : <Box>
          <Box py="2" px="2">
            <Flex>
              <Box flex={"1.5"} p="4">
                <Box>
                  <Card variant={"elevated"} boxShadow={"md"}>
                    <CardBody>
                      {tokens.access == "" ? (
                        <Flex flexDir={"column"} gap={5}>
                          <Text textAlign={"justify"} fontSize={"xl"}>You need to be logged in to access the full range of features on this site. Please log in or sign up for an account to get started.
                          </Text>
                          <Button colorScheme="blue" onClick={() => navigate("/login")}>Sign In</Button>
                        </Flex>
                      ) : <Flex
                        flexDir={"column"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        gap={4}
                      >
                        <Avatar
                          size="2xl"
                          name="Segun Adebayo"
                          src={user.profile_img}
                        />
                        <Text fontWeight={"bold"} fontSize={"3xl"}>
                          {user.user_full_name}
                        </Text>
                        <Text color="gray.400" fontSize={"xl"}>
                          {user.position}
                        </Text>
                        <Button
                          onClick={() => navigate("/edit-profile")}
                          mt={5}
                          w="70%"
                          colorScheme="blue"
                          size="lg"
                          color="white"
                          fontSize="xl"
                        >
                          Edit Profile
                        </Button>
                      </Flex>}
                    </CardBody>
                  </Card>
                  {tokens.access != "" && <Card mt={5} variant={"elevated"} boxShadow={"md"}>
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
                  </Card>}
                </Box>
              </Box>
              <Box flex={"4"} p="4">
                <Search jobsRefetch={jobsQuery.refetch} />
                {jobsQuery.isLoading ? (<Center mt={10}><CircularProgress isIndeterminate color='orange.400' thickness='12px' /></Center>) : jobsQuery.data?.length >= 1 ? <SimpleGrid mt={5} columns={3} gap={5}>
                  {
                    jobsQuery.data?.map((job: Job) => (<JobCard key={job.id} {...job} />))
                  }

                </SimpleGrid> : (<div>No results...</div>)}
              </Box>
            </Flex>
          </Box>

          <Box py={5}>
            <Flex
              align={'center'}
              _before={{
                content: '""',
                borderBottom: '1px solid',
                flexGrow: 1,
                mr: 8,
              }}
              _after={{
                content: '""',
                borderBottom: '1px solid',
                flexGrow: 1,
                ml: 8,
              }}>
              <Image src={logo} width={"150px"} />
            </Flex>
            <Center textAlign={"center"}>

              <footer>
                <div>Logo generated by <a href="https://www.designevo.com/" title="Free Online Logo Maker">DesignEvo free logo designer</a></div>
                <Text>© 2023 Ng Ju Peng. All rights reserved</Text>
              </footer>
            </Center>
          </Box>
        </Box>}
    </Box>
  );
};

export default Home;
