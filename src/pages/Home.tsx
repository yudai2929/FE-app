import React, {  } from "react";
import { Text } from "@chakra-ui/react";

import { Layout } from "../components/Layout";
import { QuizForm } from "../components/QuizForm";
interface Props{
  setNumOfQuests: (value: number) => void
  setQuizPath: (value: string) => void
}

export const Home = ({setNumOfQuests,setQuizPath}: Props): JSX.Element=> {

  return (
    <Layout>
      <Text as="h1" fontSize={{md:'4xl',base:'3xl'}}>
        基本情報処理試験過去問
      </Text>
      <QuizForm setQuizPath={setQuizPath} setNumOfQuests={setNumOfQuests}/>
    </Layout>
  );
};
