import { useEffect, useRef } from "react";
import styled from "styled-components";
import { fetchPatch } from "../util/api";

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
  background-color: gray;
  border: 1px solid black;
  border-radius: 8px;

  /* 모달창 내부 X버튼 */
  .closeButton {
    position: absolute;
    right: 10px;
    top: 10px;
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

  useEffect(() => {
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
    fetchPatch("http://localhost:3001/todos/", modalData.id, {
      text: e.target[0].value,
    });
    getData();
  };

  return (
    <Modal ref={modalRef}>
      <button className="closeButton" onClick={closeModal}>
        X
      </button>
      <form onSubmit={onEdit}>
        <input defaultValue={modalData.text} />
        <button type="submit">수정</button>
      </form>
    </Modal>
  );
}
export default InputModal;
