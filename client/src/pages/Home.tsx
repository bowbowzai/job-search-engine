import { useContext, useCallback, useRef, useEffect } from "react";
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
  Link,
  Center,
  Skeleton,
  Icon,
} from "@chakra-ui/react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query"
import Search from "../components/Search";
import JobCard from "../components/JobCard";
import { getJobPosts, getRecommendedJob } from "../api/jobs";
import { Job } from "../types/JobType"
import logo from "../assets/logo.png"
import { AuthenticationContext } from "../context/AuthenticationContext";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { AiOutlineUser } from "react-icons/ai";
import { FaRegSadCry } from "react-icons/fa"

const Home = () => {
  const navigate = useNavigate()
  const { user, loading, tokens } = useContext(AuthenticationContext)
  const observerElem = useRef(null)

  const jobsQuery = useInfiniteQuery({
    queryKey: ["jobs"],
    queryFn: ({ pageParam = 1 }) => getJobPosts(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.next == null) {
        return undefined
      } else {
        return allPages.length + 1
      }
    },
  })
  const recommendedJobsQuery = useQuery({
    queryKey: ["recommendedJobs"],
    queryFn: () => getRecommendedJob(tokens.access),
    enabled: tokens.access != null && tokens.access != "",
  })

  const handleObserver = useCallback((entries: any) => {
    const [target] = entries
    if (target.isIntersecting) {
      jobsQuery.fetchNextPage()
    }
  }, [jobsQuery.fetchNextPage, jobsQuery.hasNextPage])

  useEffect(() => {
    if (observerElem.current) {
      const element = (observerElem.current) as Element
      const option = { threshold: 0 }
      const observer = new IntersectionObserver(handleObserver, option);
      observer.observe(element as Element)
      return () => observer.unobserve(element as Element)
    }
  }, [jobsQuery.fetchNextPage, jobsQuery.hasNextPage, handleObserver])


  return (
    <Box bgColor="gray.100" minH={"100vh"}>
      <Navbar />
      {loading ?
        <Center mt={10}>
          <CircularProgress isIndeterminate color="orange" />
        </Center> : <Box>
          <Box py="2" px="2">
            <Flex flexDir={{
              base: "column",
              lg: "row",
            }}>
              <Box mb={{
                base: 2,
                lg: 0
              }} flex={"1.5"} p="4" pb={{
                base: 0,
                lg: 4
              }}>
                <Box>
                  <Card variant={"elevated"} boxShadow={"md"}>
                    <CardBody>
                      {tokens.access == "" ? (
                        <Box>
                          <Flex flexDir={"column"} gap={5}>
                            <Text textAlign={"justify"} fontSize={"xl"}>You need to be logged in to access the full range of features on this site. Please log in or sign up for an account to get started.
                            </Text>
                            <Button colorScheme="blue" onClick={() => navigate("/login")}>Sign In</Button>
                          </Flex>
                        </Box>
                      ) : <Flex
                        flexDir={"column"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        gap={{
                          base: 0,
                          lg: 4
                        }}
                      >
                        <Avatar
                          size="2xl"
                          icon={<AiOutlineUser fontSize='1.5rem' />}
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
                          mt={{
                            base: 3,
                            lg: 5
                          }}
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
                    <CardBody display={{
                      base: "none",
                      lg: "block"
                    }}>
                      <Box>
                        <Text mb={3} fontWeight="bold" fontSize="xl">
                          Desired Jobs
                        </Text>
                        {(user.desired_job != null && user.desired_job != "") ? user.desired_job.split(",").map((job) =>
                          <Tag mx={2} my={1} key={"userJob" + job} size="lg" colorScheme="red" borderRadius="full">
                            <TagLabel px={2} textAlign="center" w="full">
                              {job}
                            </TagLabel>
                          </Tag>) : <RouterLink to={"/edit-profile"}>
                          <Link w="full" isExternal>
                            Set your desired job now! <ExternalLinkIcon mx='2px' />
                          </Link>
                        </RouterLink>}
                      </Box>
                      <Box mt={10}>
                        <Text mb={3} fontWeight="bold" fontSize="xl">
                          Desired work location
                        </Text>

                        {(user.desired_location != null && user.desired_location != "") ? user.desired_location.split(",").map((location) =>
                          <Tag
                            mx={2} my={1}
                            key={"workLocation" + location}
                            size="lg" bgColor="#ffc0f9" borderRadius="full">
                            <TagLabel px={2} textAlign="center" w="full">
                              {location}
                            </TagLabel>
                          </Tag>) :
                          <RouterLink to={"/edit-profile"}>
                            <Link w="full" isExternal>
                              Set your desired work location now! <ExternalLinkIcon mx='2px' />
                            </Link>
                          </RouterLink>}
                      </Box>
                    </CardBody>
                  </Card>}
                </Box>
              </Box>
              <Box flex={"4"} p="4" py={{
                base: 1,
                lg: 4
              }}>
                <Search jobsRefetch={jobsQuery.refetch} />
                {tokens.access != "" && tokens.access != null && <Box mt={5}>
                  <Text fontWeight="semibold" fontSize="2xl">
                    Recommended Jobs
                  </Text>
                  {recommendedJobsQuery.isLoading ? (<SimpleGrid mt={5} gap={5}>
                    <Skeleton w="full" height="380px" />
                    <Skeleton w="full" height="380px" />
                    <Skeleton w="full" height="380px" />
                  </SimpleGrid>) : recommendedJobsQuery.isSuccess && recommendedJobsQuery.data?.length >= 1 ? <SimpleGrid mt={5} columns={{
                    base: 1,
                    lg: 3
                  }} gap={5}>
                    {
                      recommendedJobsQuery.data?.map((job: Job) => (<JobCard key={job.id} {...job} />))
                    }
                  </SimpleGrid> : (<RouterLink to={"/edit-profile"}>
                    <Link w="full" isExternal>
                      Add some desired jobs/locations tags so I can recommend you some jobs! <ExternalLinkIcon mx='2px' />
                    </Link>
                  </RouterLink>)}
                </Box>}
                <Text mt={5} fontWeight="semibold" fontSize="2xl">
                  All Jobs
                </Text>
                {jobsQuery.isLoading ? (<SimpleGrid mt={5} columns={3} gap={5}>
                  <Skeleton w="full" height="380px" />
                  <Skeleton w="full" height="380px" />
                  <Skeleton w="full" height="380px" />
                </SimpleGrid>) :
                  <SimpleGrid mt={5} columns={{
                    base: 1,
                    lg: 3
                  }} gap={5}>
                    {jobsQuery.isSuccess && jobsQuery.data.pages.map(page => page.results.map((job: Job) => (<JobCard key={job.id} {...job} />)))}
                  </SimpleGrid>
                }
              </Box>
            </Flex>
            <div className='loader' ref={observerElem}>
              {jobsQuery.hasNextPage ? jobsQuery.isFetchingNextPage && <Center mt={10}>
                <CircularProgress isIndeterminate color="blue" />
              </Center> :
                <Box mt={10}>
                  <Flex justifyContent={"center"} alignItems={"center"} fontSize={"2xl"} gap={3}>
                    <Text>We're sorry, but it looks like there are no more job results</Text>
                    /(ㄒoㄒ)/~~
                  </Flex>
                </Box>}
            </div>
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
        </Box >}
    </Box >
  );
};

export default Home;
