import quiz from "../types/quiz";

export const readQuiz = (year: string): quiz[] => {
  const jsonData = require(`../../public/quizfile/${year}.json`);
  return jsonData
};
