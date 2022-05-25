import React from "react";
import {
  Box,
  Button,
  Heading,
  HStack,
  VStack,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

interface Props{
  isLogined: boolean,
  setIsLogined:(value: boolean) => void
}

export const Header = ({isLogined,setIsLogined}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());
  const auth = getAuth();
  const navigate = useNavigate();
  const logout = async ()=>{
    await signOut(auth);
    setIsLogined(false)
    navigate("login");
  }
  return (
    <>
      <Box
        py="2"
        px="10"
        bg="white"
        color="blue.500"
        as="header"
        boxShadow="sm"
        position="fixed"
        w="100%"
        zIndex="100"
      >
        <HStack w="100%">
          <Heading fontSize="2xl">FE過去問アプリ</Heading>
          <Spacer />
          <HStack as="nav" display={{ base: "none", md: "flex" }}>
            <Link to="/">
              <Box fontWeight="bold" ms="10px">
                ホーム
              </Box>
            </Link>
            <Spacer />
            <Link to="list">
              <Box fontWeight="bold">復習リスト</Box>
            </Link>
            <Spacer />
            {!isLogined ? (
              <Button bg="blue.500">
                <Link to="login">
                  <Box color="white">ログイン</Box>
                </Link>
              </Button>
            ) : (
              <Button bg="blue.500" onClick={logout}>
                  <Box color="white">ログアウト</Box>
              </Button>
            )}
          </HStack>
          <Box
            as="button"
            display={{ base: "flex", md: "none" }}
            onClick={handleToggle}
          >
            <FontAwesomeIcon icon={faBars} style={{ fontSize: "20px" }} />
          </Box>
        </HStack>
        <Box
          display={{ base: isOpen ? "block" : "none", md: "block" }}
          mt={{ base: 4, md: 0 }}
        >
          <VStack
            as="nav"
            display={{ base: "flex", md: "none" }}
            justify="start"
          >
            <Box fontWeight="bold" w="100%">
              <Link to="/">ホーム</Link>
            </Box>
            <Spacer />
            <Box fontWeight="bold" w="100%">
              <Link to="/list">復習リスト</Link>
            </Box>
            <Spacer />
            <Box color="white" w="100%">
              {isLogined ? (
                <Button bg="blue.500" onClick={logout}>ログアウト</Button>
              ) : (
                <Button bg="blue.500" >
                  <Link to="login">ログイン</Link>
                </Button>
              )}
            </Box>
          </VStack>
        </Box>
      </Box>
    </>
  );
};
