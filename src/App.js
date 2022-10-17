import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import TodoCreate from "./components/TodoCreate";
import TodoHead from "./components/TodoHead";
import TodoList from "./components/TodoList";
import TodoTemplate from "./components/TodoTemplate";
// import useFetch from "./util/useFetch";
import { darkTheme, lightTheme } from "./util/theme";
import { useEffect, useState } from "react";
import InputModal from "./components/InputModal";
import ThemeToggle from "./components/ThemeToggle";

const GlobalStyle = createGlobalStyle`
  /* *{
    box-sizing: border-box;
  } */
  body {
    background: ${(props) => props.theme.bgColor};
  }
`;
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 500;
`;

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [todos, setTodos] = useState([]);
  const [isDark, setIsDark] = useState(false);
  // const [data, loading, error] = useFetch("http://localhost:3001/todos/");
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await fetch("http://localhost:3001/todos/");
    const data = await res.json();
    setTodos(data);
  };

  // 다크모드 상태변경
  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };
  // 모달창 열기 상태변경
  const showModal = (id, text) => {
    setModalOpen(true);
    setModalData({ id, text });
  };

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        {/* <button onClick={toggleTheme}>
          {isDark ? "Light Mode" : "Dark Mode"}
        </button> */}
        <ThemeToggle toggleTheme={toggleTheme} isDark={isDark} />
        <TodoTemplate>
          <TodoHead todos={todos} />
          <TodoList todos={todos} getData={getData} showModal={showModal} />
          <TodoCreate getData={getData} />
        </TodoTemplate>
        {modalOpen && (
          <ModalBackground>
            <InputModal
              getData={getData}
              setModalOpen={setModalOpen}
              modalData={modalData}
            />
          </ModalBackground>
        )}
      </ThemeProvider>
    </>
  );
}

export default App;
