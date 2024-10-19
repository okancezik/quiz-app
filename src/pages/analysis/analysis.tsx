import React from "react";
import PrimaryButton from "../../components/primary-button/primary-button";
import { useAtom } from "jotai";
import { correctAnswersCountAtom } from "../../store/global-atoms";
import QACard from "../../components/qa-card/qa-card";
import styles from "./analysis.module.scss";
import { useNavigate } from "react-router-dom";

const Analysis = () => {
    const navigate = useNavigate();
    const [correctAnswersCount] = useAtom(correctAnswersCountAtom);

  return (
    <div>
      <QACard>
        <div className={styles.card}>
          <h1>Your Score</h1>
          <h2>{correctAnswersCount}/10</h2>
          <PrimaryButton onClick={()=>navigate('/quiz')}>Try again</PrimaryButton>
        </div>
      </QACard>
    </div>
  );
};

export default Analysis;
