import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { SubTitle, Content2 } from './Texts';
import LayoutStyle from './LayoutStyle';
import Input from './Input';
import Button from './Button';

// Modal Container
const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Backdrop
const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.5);
`;

// Modal View CSS
const ModalView = styled.div.attrs(() => ({
    role: 'dialog',
}))`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 430px;
  height: 280px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
`;

const Div = styled.div`
    margin-bottom: 15px;
`;

const Div2 = styled.div`
    margin-bottom: 10px;
`;

const ModalTitle = styled.div`
    width: 100%;
    height: 50px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: #7F7F7F;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
`;

const ModalContent = styled.div`
    width: 100%;
    height: 280px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    background-color: #919191;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`

const AddRoomModal = ({ ButtonStyle, AddRoom }) => {
    const [isOpen, setIsOpen] = useState(false);
    const refs = [useRef(null), useRef(null), useRef(null)];

    const toggleModal = () => setIsOpen(prev => !prev);

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            toggleModal();
        }
    }

    return (
        <ModalContainer
            onKeyDown={handleKeyDown}
            tabIndex={0}>
            <ButtonStyle onClick={toggleModal}>
            </ButtonStyle>
            {isOpen && (
                <ModalBackdrop>
                    <ModalView
                        onClick={(event) => event.stopPropagation()}
                    >
                        <ModalTitle>
                            <SubTitle>게임방 생성</SubTitle>
                        </ModalTitle>
                        <ModalContent>
                            <Div>
                                <Content2>방제목</Content2>
                                <Div2 />
                                <Input
                                    width={"360px"}
                                    height={"30px"}
                                    type={"text"}
                                    ref={refs[0]}
                                ></Input>
                            </Div>
                            <LayoutStyle
                                display={"flex"}
                                flexDirection={"row"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                marginBottom={"20px"}
                            >
                                <Content2>게임모드&nbsp;</Content2>
                                <select
                                    name="gamemode"
                                    ref={refs[1]}
                                    style={{ width: '150px', height: '30px', fontSize: '18px' }}
                                >
                                    <option value="캐치마인드">캐치마인드</option>
                                </select>
                                <Content2>&nbsp;인원&nbsp;</Content2>
                                <select
                                    name="number"
                                    ref={refs[2]}
                                    style={{ width: '70px', height: '30px', fontSize: '18px' }}
                                >
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                </select>
                            </LayoutStyle>
                            <Button
                                style={"gray"}
                                width={"370px"}
                                height={"45px"}
                                onClick={() => {
                                    console.log(refs[0].current.value); // 여기에서 확인
                                    AddRoom(refs[0].current.value, refs[1].current.value, refs[2].current.value);
                                    setIsOpen(false);
                                    // TODO : 게임방 생성 로직 구현
                                }}
                            >
                                생성하기
                            </Button>
                        </ModalContent>
                    </ModalView>
                </ModalBackdrop>
            )
            }
        </ModalContainer >
    );
}

export default AddRoomModal;
