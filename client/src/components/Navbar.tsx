import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Image,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useNavigate } from "react-router-dom"
import logo from "../assets/logo.png"

export default function WithSubnavigation() {
  const navigate = useNavigate()

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
          <Image src={logo} width={"160px"} />

        </Flex>

        <Stack
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
        </Stack>
      </Flex>


    </Box>
  );
}
