import React from 'react';
import styled from 'styled-components';
interface ModalProps {
  closeModal: () => void;
  children?: React.ReactNode;
}

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(160, 158, 158, 0.5);
`;
const ModatContainer = styled.div`
  padding: 30px;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
  > button {
    color: white;
    cursor: pointer;
    position: absolute;
    border: none;
    top: 10px;
    right: 10px;
  }
`;

const Modal = ({ closeModal, children }: ModalProps) => {
  return (
    <ModalBackground onClick={closeModal}>
      <ModatContainer
        onClick={(event: React.MouseEvent) => event.stopPropagation()}
      >
        <button onClick={closeModal}>X</button>
        {children}
      </ModatContainer>
    </ModalBackground>
  );
};

export default Modal;
