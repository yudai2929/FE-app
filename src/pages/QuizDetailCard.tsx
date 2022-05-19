import { Box, Button, Divider, HStack, Spacer, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import quiz from "../types/quiz";
import { doc, deleteDoc } from "firebase/firestore";
import db from "../firebase";
interface Props {
  quiz: quiz;
}
export const QuizDetailCard = ({ quiz }: Props): JSX.Element => {
  const [btnMsg, setBtnMsg] = useState("答えを見る");
  const [isAnswered, setIsAnswered] = useState(false);
  const btnColor = isAnswered ? "red.500" : "blue.500";
  const DeleteData = async () => {
    await deleteDoc(doc(db, "test", quiz.title));
  };
  const handleClick = () => {
    if (!isAnswered) {
      setBtnMsg("削除する");
      setIsAnswered(true);
    } else {
      setBtnMsg("答えを見る");
      setIsAnswered(false);
      DeleteData();
    }
  };
  return (
    <Box bgColor="#fff" p="5" w="100%">
      <Box rounded="xl" mb="3" boxShadow="md" p="2">
        <HStack>
          <Text p="3" d="inline-block">
            {quiz.title}
          </Text>
          <Spacer />
          <Text p="3" d="inline-block">
            {quiz.filed}
          </Text>
        </HStack>
        <Text as="h1" fontSize="xl" p="5">
          {quiz.question}
        </Text>
      </Box>

      <Divider />
      {quiz.choices.map((choice: string, index: number) => {
        return (
          <Box key={index}>
            <HStack p="2" fontSize="lg" w="100%">
              <Box px="2" borderLeft="2px" borderColor="blue.500">
                {index + 1}.
              </Box>
              <Text textAlign="start">{choice}</Text>
            </HStack>
            <Divider />
          </Box>
        );
      })}
      <Text m="3" hidden={!isAnswered}>
        正解は{quiz.answer}です
      </Text>
      <Box w="100%" textAlign="end" m="3">
        <Button
          bg={btnColor}
          color="white"
          _hover={{ bgColor: "none" }}
          onClick={handleClick}
        >
          {btnMsg}
        </Button>
      </Box>
    </Box>
  );
};
