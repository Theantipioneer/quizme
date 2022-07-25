import React, { useState } from "react";
import { fetchQuizQuestions, Difficulty, QuestionState } from "./API";
import QuestionCard from "./components/QuestionCard";

//Styles
import { GlobalStyle, Wrapper } from "./App.styles";

const TOTAL_QUESTIONS = 10;

export type AnswerObject = {
    correct: boolean;
    correct_answer: string;
    userAnswer: string;
    question: string;
};

function App() {
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<QuestionState[]>([]);
    const [score, setScore] = useState(0);
    const [number, setNumber] = useState(0);
    const [gameOver, setGameOver] = useState(true);
    const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);

    const startTrivia = async () => {
        setLoading(true);
        setGameOver(false);

        const newQuestions = await fetchQuizQuestions(
            TOTAL_QUESTIONS,
            Difficulty.EASY
        );
        setNumber(0);
        setQuestions(newQuestions);
        setScore(0);
        setUserAnswers([]);
        setLoading(false);
    };

    function checkAnswer(e: React.MouseEvent<HTMLButtonElement>) {
        const userAnswer = e.currentTarget.value;
        const correct = userAnswer === questions[number].correct_answer;
        if (correct) {
            setScore((prev) => prev + 1);
        }
        const answerObject = {
            userAnswer,
            correct,
            question: questions[number].question,
            correct_answer: questions[number].correct_answer,
        };
        setUserAnswers((prev) => [...prev, answerObject]);
    }

    function nextQuestion() {
        const nextQuestionNumber = number + 1;

        if (nextQuestionNumber === TOTAL_QUESTIONS) {
            setGameOver(true);
        } else {
            setNumber(nextQuestionNumber);
        }
    }

    return (
        <>
            <GlobalStyle />
            <Wrapper>
                <h1>Trivia Quiz</h1>
                {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
                    <button className="start" onClick={startTrivia}>
                        Start
                    </button>
                ) : null}
                {!gameOver && <p className="score">Score: {score}</p>}
                {loading && <p>Loading...</p>}
                {!gameOver && !loading && (
                    <QuestionCard
                        questionNr={number + 1}
                        totalQuestions={TOTAL_QUESTIONS}
                        question={questions[number].question}
                        answers={questions[number].answers}
                        callback={checkAnswer}
                        userAnswer={
                            userAnswers ? userAnswers[number] : undefined
                        }
                    />
                )}
                {!gameOver &&
                    !loading &&
                    userAnswers.length === number + 1 &&
                    number !== TOTAL_QUESTIONS - 1 && (
                        <button className="next" onClick={nextQuestion}>
                            Next Question
                        </button>
                    )}
            </Wrapper>
        </>
    );
}

export default App;
