import {
  Box,
  Flex,
  Button,
  Stack,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from "react-router-dom"
import logo from "../assets/logo.png"
import { AuthenticationContext } from '../context/AuthenticationContext';
import { useContext } from "react"
import { useMutation } from '@tanstack/react-query';
import Cookies from "js-cookie"
import { logout } from '../api/authentications';

export default function WithSubnavigation() {
  const navigate = useNavigate()

  const { user, setUser, logoutMutate } = useContext(AuthenticationContext)


  function handleLogout() {
    logoutMutate()
  }

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Image src={logo} width={"160px"} onClick={() => navigate("/")} cursor="pointer" />

        </Flex>

        {user.id != "" ? (<Button colorScheme="red" onClick={handleLogout}>Logout</Button>) : <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          <Button
            as={'a'}
            fontSize={'sm'}
            fontWeight={400}
            variant={'link'}
            cursor={"pointer"}
            onClick={() => navigate("/login")}
          >
            Sign In
          </Button>
          <Button
            as={'a'}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            cursor={"pointer"}
            colorScheme="blue"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </Button>
        </Stack>}
      </Flex>


    </Box>
  );
}
