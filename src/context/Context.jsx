



import { createContext, useState } from "react";
import { runGemini } from "../gemini";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [previousPrompts, setPreviousPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, word) => {
    setTimeout(() => {
      setResultData((prev) => prev + word);
    }, 40 * index);
  };

  const onSent = async (prompt) => {
    const currentPrompt = prompt || input;
    if (!currentPrompt.trim()) return;

    setShowResult(true);
    setLoading(true);
    setRecentPrompt(currentPrompt);
    setPreviousPrompts((prev) => [currentPrompt, ...prev]);
    setInput("");
    setResultData("");

    try {
      const response = await runGemini(currentPrompt);

      const responseArray = response.split("**");
      let formatted = "";

      for (let i = 0; i < responseArray.length; i++) {
        formatted +=
          i % 2 === 1
            ? `<strong>${responseArray[i]}</strong>`
            : responseArray[i];
      }

      formatted = formatted.split("*").join("<br>");
      const words = formatted.split(" ");

      words.forEach((word, index) => {
        delayPara(index, word + " ");
      });
    } catch (error) {
      setResultData("❌ Something went wrong");
    }

    setLoading(false);
  };

  const newChat = () => {
    setInput("");
    setRecentPrompt("");
    setResultData("");
    setShowResult(false);
  };

  return (
    <Context.Provider
      value={{
        input,
        setInput,
        resultData,
        showResult,
        loading,
        recentPrompt,
        previousPrompts,
        onSent,
        newChat,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
