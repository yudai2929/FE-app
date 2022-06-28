import { Box, Button, HStack, Spacer, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import quiz from "../../types/quiz";
import { collection, doc, setDoc } from "firebase/firestore";
import db from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface Props {
  quiz: quiz;
}

export const QuizRegister = ({ quiz }: Props): JSX.Element => {
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate:NavigateFunction = useNavigate()
  
  const setData = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const quizRef = collection(db, "test");
        setDoc(doc(quizRef, quiz.title), { ...quiz ,uid:uid });
        setIsRegistered(true);
      } else {
        navigate('/login')
      }
    });
  };
  const handleClick = () => {
    setData();
  };
  return (
    <Box bgColor="#fff" p="5" w="100%">
      <Box rounded="xl" boxShadow="sm" p="2">
        <HStack>
          <Text p="3" d="inline-block">
            {quiz.title}
          </Text>
          <Spacer />
          <Text p="3" d="inline-block">
            {quiz.filed}
          </Text>
        </HStack>
        <Text as="h1" fontSize="xl" p={{ md: "5", base: "1" }}>
          {quiz.question}
        </Text>
      </Box>
      <HStack w="100%" mt="3">
        <Button
          bg="blue.500"
          color="white"
          as="a"
          href={quiz.url}
          target="_blank"
        >
          解説を見る
        </Button>
        <Spacer />
        <Button
          colorScheme="blue"
          variant="outline"
          onClick={handleClick}
          disabled={isRegistered}
          cursor={isRegistered ? "text" : "pointer"}
          _hover={{ bgColor: "none" }}
        >
          <FontAwesomeIcon icon={faPlus} />
          <Text ms='2'>復習リスト</Text>
          
        </Button>
      </HStack>
    </Box>
  );
};
