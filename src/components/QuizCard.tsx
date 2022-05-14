import { Box, Text, HStack } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import quiz from "../types/quiz";

interface Props {
  quiz: quiz;
  isAnswered: boolean;
  setIsAnswered(value: boolean): void;
  worngQuizs: quiz[];
  setWorngQuizs(value: quiz[]): void;
}

export const QuizCard = ({ quiz, isAnswered, setIsAnswered, worngQuizs, setWorngQuizs }: Props): JSX.Element => {
  const [message, setMessage] = useState("");
  
  const hoverColor: string = isAnswered ? "white" : "blue.50";
  
  const handleClick = (choiceNumber: number) => {
    if (choiceNumber === quiz.answer) {
      setMessage("正解！");
    } else {
      setMessage(`不正解！正解は${quiz.answer}です`);
      setWorngQuizs([...worngQuizs,quiz])
    }
    setIsAnswered(true);
  };

  return (
    <Box bgColor="#fff" p="5" w='100%'>
      <Text>{quiz.title}</Text>
      <Text as="h1" fontSize="2xl" p="5">
        {quiz.question}
      </Text>
      {quiz.choices.map((choice: string, index: number) => {
        return (
          <HStack
            p="2"
            fontSize="xl"
            as="button"
            w="100%"
            _hover={{ bgColor: hoverColor }}
            onClick={() => handleClick(index + 1)}
            disabled={isAnswered}
            cursor={isAnswered ? "text" : "pointer"}
            key={index}
          >
            <Text >{index + 1}</Text>
            <Text textAlign='start'>{choice}</Text>
          </HStack>
        );
      })}
      <Text hidden={!isAnswered}>{message}</Text>
    </Box>
  );
};
