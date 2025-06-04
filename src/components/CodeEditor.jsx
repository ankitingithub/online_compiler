import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import Output from "./Output";
import { Box, HStack, VStack } from "@chakra-ui/react";
import LanguageOptions from "./LanguageOptions";
import { CODE_SYNC, DEF_VAL } from "./constants";
import Input from "./Input";

function CodeEditor({socket, val, setVal}) {
  const editorRef = useRef();
  const [lang, setLang] = useState("python");
  const [input, setInput] = useState("");

  const handleLangChange = (language) => {
    setLang(language);
    setVal(DEF_VAL[language]);
  };

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <Box color="gray" w='100vw'>
      <HStack spacing={4}>
        <Box w="50%">
          <LanguageOptions lang={lang} handleLangChange={handleLangChange} />
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            height="75vh"
            theme="vs-dark"
            language={lang}
            onMount={onMount}
            defaultValue={DEF_VAL[lang]}
            value={val}
            onChange={(val) => setVal(val)}
          />
        </Box>
        <Box w='50%'>
          <VStack spacing="5px" >
            <Output editorRef={editorRef} language={lang} input={input} />
            <Input setInput={setInput} />
          </VStack>
          {/* <Output editorRef={editorRef} language={lang} input={input} /> */}
        </Box>
      </HStack>
    </Box>
  );
}

export default CodeEditor;
