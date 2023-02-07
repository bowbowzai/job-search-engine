import { PhoneIcon, SearchIcon } from '@chakra-ui/icons'
import { Badge, Box, Flex, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react'
import React from 'react'

const Search = () => {
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
        <Input fontSize="xl" type='tel' placeholder='Type here...' />
      </InputGroup>
      <Flex justifyContent={"end"}><Badge mt={3} colorScheme='green' fontSize={"md"}>55 jobs found</Badge></Flex>
    </Box>
  )
}

export default Search