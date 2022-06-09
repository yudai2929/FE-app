import React, { useContext,useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Layout } from "../components/common/Layout";
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
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider
} from "firebase/auth";
import { Navigate, NavigateFunction, useNavigate } from "react-router-dom";
import { loginContext } from "../App";


interface InputForm {
  password: string;
  email: string;
}

const APP_KEY:string = 'quizTmp'

export const Login = (props: any) => {
  const [loginError, setLoginError] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const {isLogined,setIsLogined} = useContext(loginContext);
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputForm>();
  const navigate:NavigateFunction = useNavigate()
  const quizsTmp:string|null = localStorage.getItem(APP_KEY)
  const authentication = (email:string,password:string):void => {
    if (isLogin) {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          setIsLogined(true)
        })
        .catch(() => {
          setLoginError(true);
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          setIsLogined(true)
        })
        .catch(() => {
          setLoginError(true);
        });
    }
  }

  const onSubmit: SubmitHandler<InputForm> = async (data: InputForm) => {
    const password: string = data.password;
    const email: string = data.email;
    await authentication(email, password)
    quizsTmp && navigate("/register");
  };

  const loginWithGoogle = async ()=>{
    await signInWithRedirect(auth, provider);
  }

  const handlemodeChange = () => {
    setIsLogin(!isLogin);
    setLoginError(false);
    
  };
  return (
    <Layout>
      {isLogined? (
        <Navigate to={`/register`} />
      ) : (
        <VStack
          bgColor="white"
          p="8"
          fontWeight="bold"
          w={{ base: "350px", md: "500px" }}
          rounded="lg"
          boxShadow="md"
        >
          <Text>
            {isLogin ? "ログインしてください" : "新規登録してください"}
          </Text>
          {loginError && <Text color="red">認証できませんでいした</Text>}
          <VStack
            as="form"
            w="100%"
            onSubmit={handleSubmit(onSubmit, () => {
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
                  placeholder="********"
                  {...register("password", {
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
            <Button w="100%" bg="white" border="1px" onClick={loginWithGoogle}>
              Googleでログイン
            </Button>
            <Text
              as="button"
              type="button"
              color="gray"
              onClick={handlemodeChange}
            >
              {isLogin ? "アカウントを登録する" : "ログインに戻る"}
            </Text>
          </VStack>
        </VStack>
      )}
    </Layout>
  );
};
