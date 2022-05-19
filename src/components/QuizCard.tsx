import { Box, Text, HStack, Button, Divider, Spacer } from "@chakra-ui/react";
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
    if (choiceNumber === quiz.answer) {
      setMessage("正解！");
    } else {
      setMessage(`不正解！正解は${quiz.answer}です`);
      setWorngQuizs([...worngQuizs, quiz]);
    }
    setIsAnswered(true);
  };

  return (
    <Box bgColor="#fff" p="5" w="100%" rounded="2xl" boxShadow="sm">
      <Box rounded="xl" mb="3" boxShadow="md">
        <HStack>
        <Text p="3" d="inline-block">
          {quiz.title}
        </Text>
        <Spacer/>
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
              <Box px='2' borderLeft="2px" borderColor='blue.500'>{index + 1}.</Box>
              <Text textAlign="start">{choice}</Text>
            </HStack>
            <Divider />
          </Box>
        );
      })}
      <Text m="3" hidden={!isAnswered}>
        {message}
      </Text>

      <HStack w="100%" mt="3">
        <Button bg="blue.500" color="white" as='a' href={quiz.url} target="_blank">
          解説を見る
        </Button>
        <Spacer/>
        <Button colorScheme="blue" variant="outline" onClick={nextQuiz} m="3">
          次の問題へ
        </Button>
      </HStack>
    </Box>
  );
};
