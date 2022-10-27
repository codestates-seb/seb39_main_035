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
  z-index: 10;
`;
const ModalContainer = styled.div`
  padding: 1.875rem;
  padding-top: 3rem;
  border-radius: 0.3rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
  color: ${(props) => props.theme.colors.font};
  > button {
    color: white;
    cursor: pointer;
    position: absolute;
    border: none;
    top: 0.6rem;
    right: 0.6rem;
  }
  color: #747474;
`;

const Modal = ({ closeModal, children }: ModalProps) => {
  return (
    <ModalBackground onClick={closeModal}>
      <ModalContainer
        onClick={(event: React.MouseEvent) => event.stopPropagation()}
      >
        <button onClick={closeModal}>X</button>
        {children}
      </ModalContainer>
    </ModalBackground>
  );
};

export default Modal;
