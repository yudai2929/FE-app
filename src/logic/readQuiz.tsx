import quiz from "../types/quiz";
import QuizMode from "../types/quiz";

export const readQuiz = (year: string,mode: QuizMode): quiz[] => {
  const jsonData = require(`../../public/quizfile/${mode}/${year}.json`);
  return jsonData
};
