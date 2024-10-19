import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./quiz.module.scss";
import QACard from "../../components/qa-card/qa-card";
import SecondaryButton from "../../components/secondary-button/secondary-button";
import {  Flex, Space } from "antd";
import { loadingAtom, correctAnswersCountAtom, messageAtom } from "../../store/global-atoms";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import Dangerbutton from "../../components/danger-button/danger-button";

interface Options {
  A: string;
  B: string;
  C: string;
  D: string;
}

interface Question {
  question: string;
  options: Options;
  correctAnswer: keyof Options;
}

const Quiz = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useAtom(loadingAtom);
  const [,setMessage] = useAtom(messageAtom);
  const [correctAnswersCount, setCorrectAnswersCount] = useAtom(
    correctAnswersCountAtom
  ); 
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [answerableTimeLeft, setAnswerableTimeLeft] = useState(10);
  const [canAnswer, setCanAnswer] = useState(false);

  const totalTimerRef = React.useRef<ReturnType<typeof setInterval> | null>(
    null
  );
  const answerableTimerRef = React.useRef<ReturnType<
    typeof setInterval
  > | null>(null);

  useEffect(() => {
    fetchQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      startTimer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionIndex, questions]);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = response.data.slice(0, 10);
      const formattedQuestions = data.map((question: any) =>
        formatQuestion(question)
      );
      setQuestions(formattedQuestions);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const formatQuestion = (question: any): Question => {
    const words = question.body.split(" ");
    const correctAnswerIndex = Math.floor(Math.random() * 4);
    const options: Options = {
      A: words.slice(0, 4).join(" "),
      B: words.slice(4, 8).join(" "),
      C: words.slice(8, 12).join(" "),
      D: words.slice(12, 16).join(" "),
    };

    const correctAnswer = Object.keys(options)[
      correctAnswerIndex
    ] as keyof Options;

    return {
      question: question.title,
      options: options,
      correctAnswer: correctAnswer,
    };
  };

  const startTimer = () => {
    setTimeLeft(30);
    setAnswerableTimeLeft(10);
    setCanAnswer(false);

    if (totalTimerRef.current) clearInterval(totalTimerRef.current);
    if (answerableTimerRef.current) clearInterval(answerableTimerRef.current);

    totalTimerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(totalTimerRef.current!);
          handleNextQuestion();
          return 30;
        }
        return prevTime - 1;
      });
    }, 1000);

    answerableTimerRef.current = setInterval(() => {
      setAnswerableTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(answerableTimerRef.current!);
          setCanAnswer(true);
          return 10;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      startTimer();
    } else {
        setMessage({
            type:"warning",
            message:"Sınav tamamlandı, analiz sayfasına geçiliyor."
        })
      navigate("/analysis");
    }
  };

  const handleAnswer = (answer: keyof Options) => {
    const isCorrect = answer === questions[currentQuestionIndex].correctAnswer;
    if (isCorrect) {
      setCorrectAnswersCount(correctAnswersCount + 1);
    }
    setMessage({
        type:"success",
        message:"Cevabın kaydedildi"
    })
    handleNextQuestion();
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      {currentQuestion && (
        <QACard>
          <div className={styles.card}>
            <Flex align="center" justify="space-between">
              <Flex align="center" justify="start" gap={"1.5rem"}>
                <p className={styles.numberQuestion}>
                  {currentQuestionIndex + 1}
                </p>
                <p className={styles.question}>{currentQuestion.question}</p>
              </Flex>
              <p className={styles.timer}>00:00:{timeLeft}</p>
            </Flex>
            {answerableTimeLeft > 0 && (
              <p>Time left to answer: 00:00:{answerableTimeLeft}</p>
            )}
            <Space direction="vertical" size="middle">
              <SecondaryButton
                onClick={() => handleAnswer("A" as keyof Options)}
                disabled={!canAnswer}
                loading={loading}
              >
                A. {currentQuestion.options.A}
              </SecondaryButton>
              <SecondaryButton
                onClick={() => handleAnswer("B" as keyof Options)}
                disabled={!canAnswer}
                loading={loading}
              >
                B. {currentQuestion.options.B}
              </SecondaryButton>
              <SecondaryButton
                onClick={() => handleAnswer("C" as keyof Options)}
                disabled={!canAnswer}
                loading={loading}
              >
                C. {currentQuestion.options.C}
              </SecondaryButton>
              <SecondaryButton
                onClick={() => handleAnswer("D" as keyof Options)}
                disabled={!canAnswer}
                loading={loading}
              >
                D. {currentQuestion.options.D}
              </SecondaryButton>
            </Space>
            <Flex style={{ marginTop: "1rem" }}>
              <Dangerbutton
                loading={loading}
                onClick={handleNextQuestion}
                disabled={!canAnswer}
              >
                Skip the question
              </Dangerbutton>
            </Flex>
          </div>
        </QACard>
      )}
    </div>
  );
};

export default Quiz;
