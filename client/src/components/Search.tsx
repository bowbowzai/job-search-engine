import { PhoneIcon, SearchIcon } from '@chakra-ui/icons'
import { Badge, Box, Flex, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getJobBySearch } from '../api/jobs'

interface SearchProp {
  jobsRefetch: () => void;
}

const Search = ({ jobsRefetch }: SearchProp) => {
  const queryClient = useQueryClient()

  const timeoutId = useRef<number | null>(null)
  const [isFetch, setIsFetch] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState("")

  const jobSearchQuery = useQuery({
    queryKey: ["jobs"],
    queryFn: () => getJobBySearch(searchKeyword),
    onSuccess: (data) => {
      queryClient.setQueryData(["jobs"], data)
    },
    enabled: isFetch,
    staleTime: Infinity
  })

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    timeoutId.current != null && clearTimeout(timeoutId.current)
    setIsFetch(false)
    const searchKeyword = event.target.value.trim()
    setSearchKeyword(searchKeyword)
    timeoutId.current = setTimeout(() => {
      if (searchKeyword == "") {
        jobsRefetch()
        console.log("fetch all jobs again!")
      } else {
        jobSearchQuery.refetch()
      }
    }, 500)
  }


  return (
    <Box rounded="md" dropShadow={"md"} bg={"white"} p="4">
      <Text fontWeight="semibold" fontSize="2xl">
        Search Job
      </Text>
      <InputGroup mt={5} size={"lg"}>
        <InputLeftElement
          fontSize="xl"
          pointerEvents='none'
          children={<SearchIcon color='gray.300' />}
        />
        <Input onChange={handleOnChange} fontSize="xl" type='tel' placeholder='Type here...' />
      </InputGroup>
      <Flex justifyContent={"end"}><Badge mt={3} colorScheme='green' fontSize={"md"}>{jobSearchQuery.isSuccess && jobSearchQuery.data.length} job{jobSearchQuery.isSuccess && jobSearchQuery.data.length <= 1 ? "" : "s"} found</Badge></Flex>
    </Box>
  )
}

export default Search