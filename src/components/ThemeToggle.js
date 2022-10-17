import styled from "styled-components";

function ThemeToggle({ toggleTheme, isDark }) {
  return (
    <ToggleWrapper onClick={toggleTheme} isDark={isDark}>
      {isDark === true ? "🌚" : "🌝"}
    </ToggleWrapper>
  );
}

const ToggleWrapper = styled.button`
  position: fixed;
  /* z-index: 999; */
  top: 2%;
  right: 2%;

  background-color: ${(props) => props.theme.bgColor};
  border: ${(props) => props.theme.borderColor};
  font-size: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 96px;
  height: 48px;
  border-radius: 30px;
  box-shadow: ${(props) =>
    props.isDark === true
      ? "0px 5px 10px rgba(40, 40, 40, 1), 0px 2px 4px rgba(40, 40, 40, 1)"
      : "0 5px 10px rgba(100, 100, 100, 0.15), 0 2px 4px rgba(100, 100, 100, 0.15)"};
  transition: 0.3s all ease-in-out;
`;

export default ThemeToggle;