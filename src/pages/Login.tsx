import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Layout } from "../components/Layout";
import {
  Text,
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Divider,
} from "@chakra-ui/react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

interface InputForm {
  password: string;
  email: string;
}

export const Login = () => {
  const [loginError, setLoginError] = useState(false);
  const auth = getAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputForm>();

  const onSubmit: SubmitHandler<InputForm> = (data: InputForm) => {
    const password: string = data.password;
    const email: string = data.email;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userId = userCredential.user.uid;
        console.log('login')
        console.log(userId);
      })
      .catch((error) => {
        setLoginError(true)
        console.log('not login')

      });
  };
  return (
    <Layout>
      <VStack
        bgColor="white"
        p="8"
        fontWeight="bold"
        w={{ base: "350px", md: "500px" }}
        rounded="lg"
        boxShadow="md"
      >
        <Text>ログインしてください</Text>
        {loginError && <Text color="red">メールアドレスかパスワードが正しくありません</Text>}
        <VStack
          as="form"
          w="100%"
          onSubmit={handleSubmit(onSubmit, () => {
            console.log(errors.password);
          })}
        >
          <FormControl w="100%">
            <FormLabel htmlFor="email">メールアドレス</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="メールアドレス"
              {...register("email", { required: true })}
            />
          </FormControl>
          <FormControl w="100%">
            <Box w="100%">
              <FormLabel htmlFor="password">パスワード</FormLabel>
              <Input
                id="password"
                type="password"
                placeholder="*******"
                {...register("password", {
                  required: "必須項目です",
                  minLength: {
                    value: 8,
                    message: "パスワードは最小8文字必要です",
                  },
                  maxLength: {
                    value: 20,
                    message: "パスワードは20文字までです",
                  },
                })}
              />
            </Box>
            <Text>{errors.password && errors.password.message}</Text>
          </FormControl>
          <Button w="100%" color="white" bg="blue.500" type="submit">
            ログイン
          </Button>
          <Divider />
          <Button w="100%" bg="white" border="1px">
            Googleでログイン
          </Button>
        </VStack>
      </VStack>
    </Layout>
  );
};
