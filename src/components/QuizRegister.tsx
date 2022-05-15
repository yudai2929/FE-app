import { Box, Button, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import quiz from "../types/quiz";
import { collection, doc, setDoc } from "firebase/firestore";
import db from "../firebase";

interface Props {
  quiz: quiz;
}

export const QuizRegister = ({ quiz }: Props): JSX.Element => {
  const [isRegistered, setIsRegistered] = useState(false);
  const setData = () => {
    const quizRef = collection(db, "test");
    setDoc(doc(quizRef, quiz.title), quiz);
  };
  const handleClick = () => {
    setData();
    setIsRegistered(true);
  };
  return (
    <Box bgColor="#fff" p="5" w="100%">
      <Text>{quiz.title}</Text>
      <Text as="h1" fontSize="xl" p="5">
        {quiz.question}
      </Text>
      <Box w="100%" textAlign="end">
        <Button
          bg="blue.500"
          color="white"
          onClick={handleClick}
          disabled={isRegistered}
          cursor={isRegistered ? "text" : "pointer"}
          _hover={{ bgColor: 'none' }}
        >
          復習リストに追加
        </Button>
      </Box>
    </Box>
  );
};
