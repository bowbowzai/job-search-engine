import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  Center,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { requestResetPassword } from '../api/authentications';


export default function ForgotPasswordForm(): JSX.Element {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [errMsg, setErrMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")

  const resetPasswordMutation = useMutation({
    mutationFn: requestResetPassword,
    onSuccess: () => {
      setSuccessMsg("Email sent, kindly check your email for further instructions.")
      setErrMsg("")
    },
    onError: () => {
      setErrMsg("Email invalid. Please make sure that the entered email is valid.")
      setSuccessMsg("")
    }
  })

  return (
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
          Forgot your password?
        </Heading>
        <Text
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}>
          You&apos;ll get an email with a reset link
        </Text>
        <FormControl id="email">
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            onClick={() => resetPasswordMutation.mutate(email)}
            isLoading={resetPasswordMutation.isLoading}
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}>
            Request Reset
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
          onClick={() => navigate("/login")}
        >
          Back to login
        </Text>
      </Stack>
    </Flex>
  );
}