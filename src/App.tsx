import React, { useEffect } from "react";
import "./App.css";
import { messageAtom } from "./store/global-atoms";
import { useAtom } from "jotai";
import { message } from "antd";
import Home from "./pages/home/home";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/not-found/not-found";
import BaseLayout from "./layouts/base-layout/base-layout";
import Quiz from "./pages/quiz/quiz";
import Analysis from "./pages/analysis/analysis";

function App() {
  const [toastMessage, setMessage] = useAtom(messageAtom);

  useEffect(() => {
    if (toastMessage.message === "") return;
    switch (toastMessage.type) {
      case "error":
        message.error(toastMessage.message);
        break;
      case "info":
        message.info(toastMessage.message);
        break;
      case "warning":
        message.warning(toastMessage.message);
        break;
      case "success":
        message.success(toastMessage.message);
        break;
    }
    setMessage({ ...toastMessage, message: "" });
  }, [toastMessage, setMessage]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <BaseLayout>
            <Home />
          </BaseLayout>
        }
      />
      <Route
        path="/quiz"
        element={
          <BaseLayout>
            <Quiz />
          </BaseLayout>
        }
      />
         <Route
        path="/analysis"
        element={
          <BaseLayout>
            <Analysis />
          </BaseLayout>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
