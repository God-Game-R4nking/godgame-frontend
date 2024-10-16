import React, { useRef, useEffect, useState, useMemo } from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

const ModalButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;


const AnswerModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <ModalOverlay>
            <ModalContent>
                {children}
                <ModalButton onClick={onClose}>확인</ModalButton>
            </ModalContent>
        </ModalOverlay>
    );
};

export default AnswerModal;