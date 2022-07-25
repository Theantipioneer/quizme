import React from "react";
import { AnswerObject } from "../App";

// Styles
import { Wrapper, ButtonWrapper } from "./QuestionCard.styles";

export type Props = {
    questionNr: number;
    totalQuestions: number;
    question: string;
    userAnswer: AnswerObject | undefined;
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    answers: string[];
};
const QuestionCard: React.FC<Props> = ({
    question,
    totalQuestions,
    questionNr,
    callback,
    userAnswer,
    answers,
}) => {
    return (
        <Wrapper>
            <p className="number">
                Question Number: {questionNr}/{totalQuestions}
            </p>
            <p dangerouslySetInnerHTML={{ __html: question }} />
            {answers.map((answer) => (
                <div key={answer}>
                    <ButtonWrapper
                        key={answer}
                        correct={userAnswer?.correct_answer === answer}
                        userClicked={userAnswer?.userAnswer === answer}
                    >
                        <button
                            value={answer}
                            disabled={!!userAnswer}
                            onClick={callback}
                        >
                            <span
                                dangerouslySetInnerHTML={{ __html: answer }}
                            ></span>
                        </button>
                    </ButtonWrapper>
                </div>
            ))}
        </Wrapper>
    );
};

export default QuestionCard;
