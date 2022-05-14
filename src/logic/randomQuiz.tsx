import quiz from "../types/quiz";
export const randomQuiz = (quizs: quiz[], NumOfQuests: number): quiz[] => {
    let count = 0;
    let newQuizs: quiz[] = [];
    while(count < NumOfQuests) {
        let randNum:number = Math.floor(Math.random() * quizs.length)
        if(!newQuizs.includes(quizs[randNum])){
            newQuizs = [...newQuizs, quizs[randNum]]
            count++
        }
    }
    return newQuizs;
};
