import { InfoIcon, SearchIcon } from '@chakra-ui/icons'
import {
  Box, Button, Flex, Input, InputGroup, InputLeftElement, Text, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  SimpleGrid,
  CircularProgress,
  Center,
  Badge,
  Heading
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useQuery, } from "@tanstack/react-query"
import { getJobBySearch } from '../api/jobs'
import JobCard from './JobCard'
import { Job } from '../types/JobType'

interface SearchProp {
  jobsRefetch: () => void;
}

const Search = ({ jobsRefetch }: SearchProp) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isFetch, setIsFetch] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState("")

  const jobSearchQuery = useQuery({
    queryKey: ["search-jobs"],
    queryFn: () => getJobBySearch(searchKeyword),
    onSuccess: (data) => {
      setIsFetch(false)
    },
    enabled: isFetch,
    staleTime: Infinity
  })

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const searchKeyword = event.target.value.trim()
    setSearchKeyword(searchKeyword)
  }

  function handleOnEnterDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key == "Enter") {
      handleOnSearchClick()
    }
  }

  function handleOnSearchClick() {
    if (searchKeyword.trim() != "") {
      onOpen()
      jobSearchQuery.refetch()
    }
  }

  function handleModalClose() {
    onClose()
    setSearchKeyword("")
  }

  return (
    <Box rounded="md" dropShadow={"md"} bg={"white"} p="4">
      <Text fontWeight="semibold" fontSize="2xl">
        Search Job
      </Text>
      <InputGroup my={5} size={"lg"}>
        <InputLeftElement
          fontSize="xl"
          pointerEvents='none'
          children={<SearchIcon color='gray.300' />}
        />
        <Input value={searchKeyword} onKeyDown={handleOnEnterDown} onChange={handleOnChange} fontSize="xl" type='tel' placeholder='Type here...' />
      </InputGroup>
      <Flex justifyContent={"flex-end"}><Button onClick={handleOnSearchClick} size={{
        base: "md",
        lg: "lg"
      }} colorScheme='blue' variant={"outline"}>Search</Button></Flex>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent maxW={{
          base: "95%",
          lg: "70%"
        }}>
          <ModalHeader fontSize={{
            base: "2xl",
            lg: "4xl"
          }}>Search Results
            {
              !jobSearchQuery.isLoading && !jobSearchQuery.isRefetching && <Badge ml={{
                base: 2,
                md: 3
              }} colorScheme='green' fontSize={"md"}>{jobSearchQuery.isSuccess && jobSearchQuery.data.length} job{jobSearchQuery.isSuccess && jobSearchQuery.data.length <= 1 ? "" : "s"} found
              </Badge>}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {
              jobSearchQuery.isRefetching || jobSearchQuery.isLoading ? <Center mx='auto'>
                <CircularProgress isIndeterminate color="blue" />
              </Center> :
                jobSearchQuery.isSuccess && jobSearchQuery.data.length >= 1 ? <SimpleGrid mt={5} columns={{
                  base: 1,
                  lg: 3
                }} gap={5}>
                  {jobSearchQuery.data?.map((job: Job) => (<JobCard key={job.id} {...job} />))}
                </SimpleGrid> : <Box textAlign="center" py={10} px={6}>
                  <InfoIcon boxSize={'50px'} color={'blue.500'} />
                  <Heading as="h2" size="xl" mt={6} mb={2}>
                    No result found
                  </Heading>
                  <Text fontSize={"xl"} color={'gray.500'}>
                    <Text>We're sorry, but it looks like there are no more job results</Text>
                    /(ㄒoㄒ)/~~
                  </Text>
                </Box>
            }
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleModalClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </Box >
  )
}

export default Search