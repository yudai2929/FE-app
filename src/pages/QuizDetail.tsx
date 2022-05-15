import { Box, Button, Divider, HStack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import quiz from "../types/quiz";
import { doc, deleteDoc } from "firebase/firestore";
import db from "../firebase";
interface Props {
  quiz: quiz;
}
export const QuizDetail = ({ quiz }: Props): JSX.Element => {
  const [btnMsg, setBtnMsg] = useState("答えを見る");
  const [isAnswered, setIsAnswered] = useState(false);
  const btnColor = isAnswered ? "red.500" : "blue.500"
  const DeleteData = async () => {
    await deleteDoc(doc(db, "test", quiz.title));
  }
  const handleClick = () => {
    setBtnMsg("削除する");
    setIsAnswered(true);
    DeleteData();
  };
  return (
    <Box bgColor="#fff" p="5" w="100%">
      <Text>{quiz.title}</Text>
      <Text as="h1" fontSize="xl" p="5">
        {quiz.question}
      </Text>
      <Divider />
      {quiz.choices.map((choice: string, index: number) => {
        return (
          <Box key={index}>
            <HStack p="2" fontSize="lg" w="100%">
              <Text>{index + 1}</Text>
              <Text textAlign="start">{choice}</Text>
            </HStack>
            <Divider />
          </Box>
        );
      })}
      <Text hidden={!isAnswered}>正解は{quiz.answer}です</Text>
      <Box w="100%" textAlign="end">
        <Button bg={btnColor} color="white" _hover={{bgColor:'none'}} onClick={handleClick}>
          {btnMsg}
        </Button>
      </Box>
    </Box>
  );
};
