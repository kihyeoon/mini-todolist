import { createGlobalStyle, ThemeProvider } from "styled-components";
import TodoCreate from "./components/TodoCreate";
import TodoHead from "./components/TodoHead";
import TodoList from "./components/TodoList";
import TodoTemplate from "./components/TodoTemplate";
import useFetch from "./util/useFetch";
import { darkTheme, lightTheme } from "./util/theme";
import { useState } from "react";

const GlobalStyle = createGlobalStyle`
  /* *{
    box-sizing: border-box;
  } */
  body {
    background: ${(props) => props.theme.bgColor};
  }
`;

function App() {
  const [todos, loading, error] = useFetch("http://localhost:3001/todos/");
  console.log(todos, loading, error);

  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <button onClick={toggleTheme}>
          {isDark ? "Light Mode" : "Dark Mode"}
        </button>
        <TodoTemplate>
          <TodoHead todos={todos} />
          <TodoList todos={todos} />
          <TodoCreate />
        </TodoTemplate>
      </ThemeProvider>
    </>
  );
}

export default App;
