import styled, { css } from "styled-components";
import { MdDone, MdDelete } from "react-icons/md";
import React from "react";
import { fetchDelete, fetchPatch } from "../util/api";

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0;
  &:hover {
    ${Remove} {
      display: block;
    }
  }
`;

const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.done &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: ${(props) => props.theme.textColor};
  ${(props) =>
    props.done &&
    css`
      color: ${(props) => props.theme.doneTextColor};
    `}
`;

function TodoItem({ id, done, text, getData }) {
  const onToggle = () => {
    getData();
    return fetchPatch("http://localhost:3001/todos/", id, { done: !done });
  };
  const onRemove = () => {
    getData();
    return fetchDelete("http://localhost:3001/todos/", id);
  };

  return (
    <TodoItemBlock>
      <CheckCircle done={done} onClick={onToggle}>
        {done && <MdDone />}
      </CheckCircle>
      <Text done={done}>{text}</Text>
      <Remove onClick={onRemove}>
        <MdDelete />
      </Remove>
    </TodoItemBlock>
  );
}

export default React.memo(TodoItem);
