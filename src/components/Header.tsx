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
export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());

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
        w='100%'
        zIndex="100"
        
      >
        <HStack w='100%'>
          <Heading fontSize="2xl">過去問アプリ</Heading>
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
            <Button bg="blue.500">
              <Link to="login">
                <Box color="white">ログイン</Box>
              </Link>
            </Button>
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
          <VStack as="nav" display={{ base: "flex", md: "none" }} justify="start">
            <Link to="/list">
              <Box fontWeight="bold" ms="10px">
                ホーム
              </Box>
            </Link>
            <Spacer />
            <Link to="/list">
              <Box fontWeight="bold">復習リスト</Box>
            </Link>
            <Spacer />
            <Button bg="blue.500">
              <Link to="#">
                <Box color="white">ログイン</Box>
              </Link>
            </Button>
          </VStack>
        </Box>
      </Box>
    </>
  );
};
