import { Text } from "@chakra-ui/react";
import React from "react";
import { Layout } from "../components/common/Layout";
import { readQuiz } from "../logic/readQuiz";
import { randomQuiz } from "../logic/randomQuiz";

export const Log = () => {
  const quizDatas = readQuiz('01_aki','FE');
  const quizs = randomQuiz(quizDatas,5)
  console.log(quizs);
  return (
    <Layout>
      <Text>ログ確認画面です</Text>
    </Layout>
  );
};
