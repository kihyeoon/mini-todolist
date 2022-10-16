import { createGlobalStyle, ThemeProvider } from "styled-components";
import TodoCreate from "./components/TodoCreate";
import TodoHead from "./components/TodoHead";
import TodoList from "./components/TodoList";
import TodoTemplate from "./components/TodoTemplate";
import useFetch from "./util/useFetch";
import { darkTheme, lightTheme } from "./util/theme";
import { useEffect, useState } from "react";

const GlobalStyle = createGlobalStyle`
  /* *{
    box-sizing: border-box;
  } */
  body {
    background: ${(props) => props.theme.bgColor};
  }
`;

function App() {
  const [todos, setTodos] = useState([]);
  // const [data, loading, error] = useFetch("http://localhost:3001/todos/");
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await fetch("http://localhost:3001/todos/");
    const data = await res.json();
    setTodos(data);
  };

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
          <TodoList todos={todos} getData={getData} />
          <TodoCreate getData={getData}/>
        </TodoTemplate>
      </ThemeProvider>
    </>
  );
}

export default App;
