import { useEffect, useRef } from "react";
import styled from "styled-components";
import { fetchPatch } from "../util/api";
import { MdClose } from "react-icons/md";

const Modal = styled.div`
  /* 모달창 크기 */
  width: 300px;
  height: 200px;
  /* 최상단 위치 */
  z-index: 999;
  /* 중앙 배치 */
  /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
  /* translate는 본인의 크기 기준으로 작동한다. */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* 모달창 디자인 */
  background-color: white;
  border-radius: 15px;
  /* 모달창 내부 요소 디자인 */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  & input {
    padding: 0 15px;
    width: 80%;
    height: 100%;
    border: none;
    outline: none;
    font-size: 1.2rem;
    color: black;
  }
  & form > button {
    width: 3rem;
    height: 2rem;
    border: none;
    font-size: 1rem;
    background-color: #38d9a9;
    color: white;
    border-radius: 15px;
    cursor: pointer;
    margin-left: 14rem;
    margin-top: 0.5rem;
  }
  /* 모달창 내부 X버튼 */
  .closeButton {
    position: absolute;
    border: 0;
    background: 0;
    right: 10px;
    top: 10px;
    font-size: 20px;
  }
`;

function InputModal({ getData, setModalOpen, modalData }) {
  // 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

  // 모달 외부 클릭시 끄기 처리
  // Modal 창을 useRef로 취득
  const modalRef = useRef(null);
  // Modal 창이 열렸을 때, 인풋에 포커스
  const inputRef = useRef(null);

  useEffect(() => {

    // Modal 창이 열렸을 때, 인풋에 포커스를 준다.
    inputRef.current.focus();

    // 이벤트 핸들러 함수
    const handler = () => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      // eslint-disable-next-line no-restricted-globals
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
      }
    };

    // 이벤트 핸들러 등록
    document.addEventListener("mousedown", handler);
    // document.addEventListener('touchstart', handler); // 모바일 대응

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener("mousedown", handler);
      // document.removeEventListener('touchstart', handler); // 모바일 대응
    };
  });

  const onEdit = (e) => {
    e.preventDefault();
    setModalOpen(false);
    fetchPatch("/todos/", modalData.id, {
      text: e.target[0].value,
    });
    getData();
  };

  return (
    <Modal ref={modalRef}>
      <button className="closeButton" onClick={closeModal}>
        <MdClose />
      </button>
      <form onSubmit={onEdit}>
        <input defaultValue={modalData.text} ref={inputRef} />
        <button type="submit">수정</button>
      </form>
    </Modal>
  );
}
export default InputModal;
