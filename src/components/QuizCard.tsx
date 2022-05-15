import { Box, Text, HStack, Button, Divider } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import quiz from "../types/quiz";

interface Props {
  quiz: quiz;
  isAnswered: boolean;
  setIsAnswered(value: boolean): void;
  worngQuizs: quiz[];
  setWorngQuizs(value: quiz[]): void;
  nextQuiz(): void;
}

export const QuizCard = ({
  quiz,
  isAnswered,
  setIsAnswered,
  worngQuizs,
  setWorngQuizs,
  nextQuiz,
}: Props): JSX.Element => {
  const [message, setMessage] = useState("");

  const hoverColor: string = isAnswered ? "white" : "blue.50";

  const handleClick = (choiceNumber: number) => {
    if (isAnswered) {
      alert("問題を選択してください")
      return
    }
    if (choiceNumber === quiz.answer) {
      setMessage("正解！");
    } else {
      setMessage(`不正解！正解は${quiz.answer}です`);
      setWorngQuizs([...worngQuizs, quiz]);
    }
    setIsAnswered(true);
  };

  return (
    <Box bgColor="#fff" p="5" w="100%">
      <Text>{quiz.title}</Text>
      <Text as="h1" fontSize="xl" p="5">
        {quiz.question}
      </Text>
      <Divider/>
      {quiz.choices.map((choice: string, index: number) => {
        return (
          <Box key={index}>
            <HStack
            p="2"
            fontSize="lg"
            as="button"
            w="100%"
            _hover={{ bgColor: hoverColor }}
            onClick={() => handleClick(index + 1)}
            disabled={isAnswered}
            cursor={isAnswered ? "text" : "pointer"}
          >
            <Text>{index + 1}</Text>
            <Text textAlign="start">{choice}</Text>
          </HStack>
          <Divider/>
          </Box>
        );
      })}
      <Text hidden={!isAnswered}>{message}</Text>
      <Box w="100%" textAlign="end">
        <Button bg="blue.500" color="white" onClick={nextQuiz}>
          次の問題へ
        </Button>
      </Box>
    </Box>
  );
};
