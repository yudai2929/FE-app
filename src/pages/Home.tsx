import React from "react";
import { Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";

export const Home = (): JSX.Element=> {
  return (
    <Layout>
      <Text as="h1" fontSize="4xl">
        基本情報処理試験過去問
      </Text>
      <Button colorScheme="blue" variant="outline">
        <Link to="/quiz">問題を解く</Link>
      </Button>
    </Layout>
  );
};
