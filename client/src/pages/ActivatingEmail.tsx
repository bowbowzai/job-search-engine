import { Box, Button, Center, CircularProgress, Heading } from '@chakra-ui/react';
import {
  Flex,
  Stack,
  useColorModeValue,
  Text, Icon
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from "react"
import { useMutation } from "@tanstack/react-query"
import { verifyEmail } from '../api/authentications';
import { AiOutlineArrowLeft } from "react-icons/ai"
import { CheckCircleIcon } from '@chakra-ui/icons';

export default function VerifyEmailForm(): JSX.Element {
  const { uid, token } = useParams()
  const navigate = useNavigate()
  const [errMsg, setErrMsg] = useState("")

  const activateMutation = useMutation({
    mutationFn: verifyEmail,
    onSuccess: () => {

    },
    onError: (error: any) => {
      const firstError = Object.entries(error?.response?.data)[0]
      const firstErrorMsg = firstError[1]
      if (Array.isArray(firstErrorMsg)) {
        setErrMsg(firstErrorMsg[0])
      } else {
        setErrMsg(String(firstErrorMsg).toString())
      }
      console.log(firstErrorMsg)
    },
  })
  useEffect(() => {
    if (uid && token) {
      activateMutation.mutate({
        token: token,
        uid: uid
      })
    } else {
      setErrMsg("No token provided.")
    }
  }, [token, uid])
  return (
    <Box>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack
          spacing={4}
          w={'full'}
          maxW={'sm'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={10}>
          <Center>
            <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
              Verifying your email
            </Heading>
          </Center>
          <Center>
            <Box>
              {errMsg == "" ? activateMutation.isLoading ? <CircularProgress color='blue' isIndeterminate /> : (<Flex flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
                <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
                <Text fontSize={"xl"} mt={6} mb={6} textAlign={"center"}>
                  Successfully activated your email on JobHunter!
                </Text>
                <Button onClick={() => navigate("/login")} leftIcon={<Icon as={AiOutlineArrowLeft} />}>Go to login</Button>
              </Flex>) : <Text color="red">{errMsg}</Text>}
            </Box>

          </Center>

        </Stack>
      </Flex>
    </Box>
  );
}