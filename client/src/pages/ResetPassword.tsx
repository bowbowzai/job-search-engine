import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Center,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPasswordConfirmation } from '../api/authentications';
import { useState } from 'react';


export default function ResetPasswordForm(): JSX.Element {
  const { uid, token } = useParams()
  const navigate = useNavigate()

  const [password, setPassword] = useState("")
  const [errMsg, setErrMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")

  const resetConfirmationMutation = useMutation({
    mutationFn: resetPasswordConfirmation,
    onSuccess: () => {
      setSuccessMsg("Password reset successfully. Please login your again with your new password.")
      setErrMsg("")
    },
    onError: (error) => {
      const firstError = Object.entries(error.response.data)[0]
      const firstErrorMsg = firstError[1]
      // console.log(firstErrorMsg)
      if (Array.isArray(firstErrorMsg)) {
        setErrMsg(firstErrorMsg[0])
      } else {
        setErrMsg(firstErrorMsg ? String(firstErrorMsg).toString() : "")
      }
      setSuccessMsg("")
    }
  })

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
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Enter new password
          </Heading>

          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input isDisabled={resetConfirmationMutation.isSuccess} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Stack spacing={6}>
            <Button
              onClick={() => resetConfirmationMutation.mutate({
                password: password,
                token: token?.toString(),
                uid: uid?.toString()
              })}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              isLoading={resetConfirmationMutation.isLoading}
            >
              Submit
            </Button>
            {errMsg && successMsg == "" && <Center><Text color={"red"} textAlign={"center"}>{errMsg}</Text></Center>}
            {successMsg && errMsg == "" && <Center><Text color={"green"} textAlign={"center"}>{successMsg}</Text></Center>}
          </Stack>
          <Text
            cursor={"pointer"}
            textAlign={"right"}
            fontSize={{ base: 'sm', sm: 'md' }}
            color={"blue.500"}
            _hover={
              {
                textDecor: "underline"
              }
            }
            onClick={() => navigate("/forgot-password")}
          >
            Token invalid? Resend a new one here.
          </Text>
          <Text
            cursor={"pointer"}
            textAlign={"right"}
            fontSize={{ base: 'sm', sm: 'md' }}
            color={"blue.500"}
            _hover={
              {
                textDecor: "underline"
              }
            }
            onClick={() => navigate("/login")}
          >
            Back to login
          </Text>
        </Stack>
      </Flex>
    </Box>
  );
}