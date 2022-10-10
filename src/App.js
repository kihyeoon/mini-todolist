import { createGlobalStyle } from "styled-components";
import TodoCreate from "./components/TodoCreate";
import TodoHead from "./components/TodoHead";
import TodoList from "./components/TodoList";
import TodoTemplate from "./components/TodoTemplate";
import { TodoProvider } from "./TodoContext";
import useFetch from "./util/useFetch";

const GlobalStyle = createGlobalStyle`
  /* *{
    box-sizing: border-box;
  } */
  body {
    background: #e9ecef;
  }
`;

function App() {
  const [todos, loading, error] = useFetch("http://localhost:3001/todos/");
  console.log(todos, loading, error);

  return (
    <>
      <TodoProvider>
        <GlobalStyle />
        <TodoTemplate>
          <TodoHead todos={todos} />
          <TodoList todos={todos} />
          <TodoCreate />
        </TodoTemplate>
      </TodoProvider>
    </>
  );
}

export default App;
