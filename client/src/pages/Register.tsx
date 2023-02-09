import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Icon,
  CircularProgress,
} from '@chakra-ui/react';
import { useEffect, useState, useContext } from 'react';
import { ViewIcon, ViewOffIcon, CheckCircleIcon } from '@chakra-ui/icons';
import { AiOutlineArrowLeft } from "react-icons/ai"
import { useNavigate } from 'react-router-dom';
import { Register } from '../types/RegisterTyepe';
import { useMutation } from "@tanstack/react-query"
import { register } from '../api/authentications';
import { AuthenticationContext } from "../context/AuthenticationContext"

function Success() {
  const navigate = useNavigate()
  return (
    <Box w="70%" textAlign="center" py={10} px={6}>
      <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
      <Heading as="h2" size="2xl" mt={6} mb={6}>
        Successfully register on JobHunter!
      </Heading>
      <Text color={'gray.500'} fontSize="xl">
        Congratulations! You have successfully registered with us. To activate your account and start using our services, please check your email for further instructions. If you don't see the activation email, please check your spam folder or contact us for assistance. Thank you for choosing us and we look forward to serving you soon.
      </Text>
    </Box>
  );
}

export default function SignupCard(): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);
  const [registerInfo, setRegisterInfo] = useState<Register>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_password: "",
  })
  const [isSuccessfullyRegister, setIsSuccessfullyRegister] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: ({ data }) => {
      // console.log(data)
      setIsSuccessfullyRegister(true)
    },
    onError(error: any) {
      const firstError = Object.entries(error.response.data)[0]
      const firstErrorMsg = firstError[1]
      // console.log(firstErrorMsg)
      if (Array.isArray(firstErrorMsg)) {
        setErrorMsg(firstErrorMsg[0])
      } else {
        setErrorMsg(firstErrorMsg ? String(firstErrorMsg).toString() : "")
      }
    },
  })

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    setRegisterInfo(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }

  function handleRegister() {
    if (registerInfo.password !== registerInfo.re_password) return setErrorMsg("Password do not match")
    const hasValidValues = Object.values(registerInfo).every((value) => value !== undefined && value !== null && value !== "");
    if (!hasValidValues) return setErrorMsg("Please fill up all the fields in the register form")
    registerMutation.mutate(registerInfo)
  }

  return (
    <Box>
      {isSuccessfullyRegister ? (
        <Box>
          <Flex height="100vh" justifyContent="center" alignItems="center">
            <Success />
          </Flex>
        </Box>) : (<Flex
          minH={'100vh'}
          align={'center'}
          justify={'center'}
          bg={useColorModeValue('gray.50', 'gray.800')}>
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'} textAlign={'center'}>
                Sign up
              </Heading>
              <Text fontSize={'lg'} color={'gray.600'}>
                to enjoy all of our cool features ✌️
              </Text>
            </Stack>
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}>
              <Stack spacing={4}>
                <HStack>
                  <Box>
                    <FormControl id="firstName" isRequired>
                      <FormLabel>First Name</FormLabel>
                      <Input type="text" name="first_name" value={registerInfo.first_name} onChange={handleOnChange} />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="lastName">
                      <FormLabel>Last Name</FormLabel>
                      <Input type="text" name="last_name" value={registerInfo.last_name} onChange={handleOnChange} />
                    </FormControl>
                  </Box>
                </HStack>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" name="email" value={registerInfo.email} onChange={handleOnChange} />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input type={showPassword ? 'text' : 'password'} name="password" value={registerInfo.password} onChange={handleOnChange} />
                    <InputRightElement h={'full'}>
                      <Button
                        variant={'ghost'}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }>
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <FormControl id="password_confirmation" isRequired>
                  <FormLabel>Confirm password</FormLabel>
                  <InputGroup>
                    <Input type="password" name="re_password" value={registerInfo.re_password} onChange={handleOnChange} />
                  </InputGroup>
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <Button
                    isLoading={registerMutation.isLoading ? true : false}
                    onClick={handleRegister}
                    type="submit"
                    loadingText="Submitting"
                    size="lg"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}>
                    Sign up
                  </Button>
                  {errorMsg && <Text color={"red"} textAlign={"center"}>{errorMsg}</Text>}
                </Stack>
                <Stack pt={6}>
                  <Text align={'center'}>
                    Already a user? <Link color={'blue.400'}>Login</Link>
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>)}
    </Box>
  );
}