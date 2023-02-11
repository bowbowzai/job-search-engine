import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  Text
} from '@chakra-ui/react';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { login } from "../api/authentications"
import { AuthenticationContext } from '../context/AuthenticationContext';

export default function SplitScreen() {
  const navigate = useNavigate()
  const { setUser, setTokens, setLoading } = useContext(AuthenticationContext)

  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: ""
  })

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      //setUser(data.user)
      localStorage.setItem("tokens", JSON.stringify(data))
      setTokens(data)
      setLoading(false)
      navigate("/")
    },

  })
  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    setLoginCredentials(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Sign in to your account</Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" name="email" value={loginCredentials.email} onChange={handleOnChange} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" name="password" value={loginCredentials.password} onChange={handleOnChange} />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'end'}>
              <Link color={'blue.500'} onClick={() => navigate("/forgot-password")}>Forgot password?</Link>
            </Stack>
            <Button isLoading={loginMutation.isLoading} onClick={() => loginMutation.mutate(loginCredentials)} colorScheme={'blue'} variant={'solid'}>
              Sign in
            </Button>
            {loginMutation.isError && <Text color="red" textAlign={"center"}>Invalid email or password</Text>}
            <Text> No account yet? <Link color={'blue.500'} onClick={() => navigate("/register")}>Register</Link></Text>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
          }
        />
      </Flex>
    </Stack>
  );
}