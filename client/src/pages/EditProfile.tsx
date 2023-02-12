import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Box,
  Tag,
  TagLabel,
  TagCloseButton,
  InputRightElement,
  InputGroup
} from '@chakra-ui/react';
import { AddIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { AuthenticationContext } from "../context/AuthenticationContext"
import { useContext, useState } from "react"
import Navbar from "../components/Navbar"
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { updateProfile } from '../api/profiles';


export default function UserProfileEdit(): JSX.Element {
  const navigate = useNavigate()
  const { user, tokens, setUser } = useContext(AuthenticationContext)
  const [jobKeyword, setJobKeyword] = useState("")
  const [locationKeyword, setLocationKeyword] = useState("")
  const [previewImg, setPreviewImg] = useState("")
  const [newAddedSkills, setNewAddedSkills] = useState<string[]>(() => [...(user.desired_job != null && user.desired_job != "") ? user.desired_job.split(",") : []])
  const [newAddedLocations, setNewAddedLocations] = useState<string[]>(() => [...(user.desired_location != null && user.desired_location != "") ? user.desired_location.split(",") : []])
  const [newProfileImg, setNewProfileImg] = useState<File>()
  const [newPosition, setNewPisition] = useState("")

  console.log(newAddedSkills);

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      setUser(data)
      navigate("/")
    },
    onError: (error) => {
      console.log(error);
    }
  })

  function addToSkills(value: string) {
    setNewAddedSkills(prev => ([...prev, value]))
    setJobKeyword("")
  }

  function addToLocation(value: string) {
    setNewAddedLocations(prev => ([...prev, value]))
    setLocationKeyword("")
  }

  function removeJobs(job: string) {
    const jobs = newAddedSkills.filter(skill => skill != job)
    setNewAddedSkills(jobs)
  }

  function removeLocation(removeLocation: string) {
    const locations = newAddedLocations.filter(location => location != removeLocation)
    setNewAddedLocations(locations)
  }

  function handleAddJobs(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key == "Enter" && jobKeyword.trim() != "") {
      if (newAddedSkills.includes(jobKeyword)) return setJobKeyword("");
      addToSkills(jobKeyword)
    }
  }

  function handleAddLocations(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key == "Enter" && locationKeyword.trim() != "") {
      if (newAddedLocations.includes(locationKeyword)) return setLocationKeyword("");
      addToLocation(locationKeyword)
    }
  }

  function handleCancel() {
    setJobKeyword("")
    setLocationKeyword("")
    setNewAddedLocations([])
    setNewAddedSkills([])

    navigate("/")
  }


  function previewVideo(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      setNewProfileImg(file)
      setPreviewImg(URL.createObjectURL(file));
    }
  };

  function handleSubmit() {
    if (newPosition != "" || newProfileImg || newAddedLocations || newAddedSkills) {

      const updatedData = new FormData()
      updatedData.append("position", newPosition != "" ? newPosition : user.position)
      updatedData.append("desired_job", newAddedSkills.join(","))
      updatedData.append("desired_location", newAddedLocations.join(","))

      if (newProfileImg) {
        updatedData.append("profile_img", newProfileImg)
      }
      updateProfileMutation.mutate({
        updateData: updatedData,
        access: tokens.access
      })
    }
  }

  return (
    <Box>
      <Navbar />
      <Flex
        gap={5}
        align={'flex-start'}
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
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            User Profile Edit
          </Heading>
          <FormControl id="userName">
            <Stack direction={['column', 'row']} spacing={6}>
              <Center>
                <Avatar size="xl" src={previewImg == "" ? user.profile_img : previewImg}>
                </Avatar>
              </Center>
              <Center w="full">
                <Button w="full" as="label" htmlFor='file'>Change Icon</Button>
                <Input onChange={previewVideo} id="file" type="file" display={"none"} />
              </Center>
            </Stack>
          </FormControl>
          <FormControl id="userName" isRequired>
            <FormLabel>Full Name</FormLabel>
            <Input
              disabled
              value={user.user_full_name}
              type="text"
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              disabled
              value={user.email}
              type="email"
            />
          </FormControl>
          <FormControl id="position" >
            <FormLabel>Position</FormLabel>
            <Input
              placeholder="we developer etc..."
              value={newPosition != "" ? newPosition : user.position}
              onChange={(e) => setNewPisition(e.target.value)}
              type="text"
            />
          </FormControl>

          <Stack spacing={6} direction={['column', 'row']}>
            <Button
              bg={'red.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'red.500',
              }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              bg={'blue.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'blue.500',
              }}
              isLoading={updateProfileMutation.isLoading}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
        <Box>
          <Stack w="full" flexGrow={0} spacing={4}
            width={'full'}
            maxW={'md'}
            bg={useColorModeValue('white', 'gray.700')}
            rounded={'xl'}
            boxShadow={'lg'}
            p={6}
            my={12}>
            <FormControl id="position" >
              <FormLabel>Desired Jobs</FormLabel>
              <InputGroup>
                <Input
                  mb={2}
                  placeholder="software engineer, designer etc..."
                  value={jobKeyword}
                  onChange={(e) => setJobKeyword(e.target.value)}
                  type="text"
                  onKeyDown={handleAddJobs}
                />

              </InputGroup>

              {newAddedSkills.map((job: string) => job != "" && <Tag
                key={"job" + job}
                mx={2}
                my={2}
                size={"lg"}
                borderRadius='full'
                colorScheme='red'
              >
                <TagLabel>{job}</TagLabel>
                <TagCloseButton onClick={() => removeJobs(job)} />
              </Tag>)}
            </FormControl>
          </Stack>
          <Stack w="full" flexGrow={0} spacing={4}
            width={'full'}
            maxW={'md'}
            bg={useColorModeValue('white', 'gray.700')}
            rounded={'xl'}
            boxShadow={'lg'}
            p={6}
            my={12}>
            <FormControl id="position" >
              <FormLabel>Desired Locations</FormLabel>
              <InputGroup>
                <Input
                  mb={2}
                  placeholder="johor, kuala lumpur..."
                  value={locationKeyword}
                  onChange={(e) => setLocationKeyword(e.target.value)}
                  type="text"
                  onKeyDown={handleAddLocations}
                />

              </InputGroup>

              {newAddedLocations.map((location: string) => location != "" && <Tag
                key={"location" + location}
                mx={2}
                my={2}
                size={"lg"}
                borderRadius='full'
                bgColor="#ffc0f9"
              >
                <TagLabel>{location}</TagLabel>
                <TagCloseButton onClick={() => removeLocation(location)} />
              </Tag>)}
            </FormControl>
          </Stack>
        </Box>

      </Flex>
    </Box>
  );
}