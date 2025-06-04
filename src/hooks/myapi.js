import axios from "axios";
import { AVAL_LANGS } from "../components/constants";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const executeCode = async (language, sourceCode, input) => {
  const response = await API.post("/execute", {
    language: language,
    version: AVAL_LANGS[language],
    files: [
      {
        content: sourceCode,
      },
    ],
    stdin: input.toString(),
  });
  return response.data;
};