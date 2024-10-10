import React, { useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    height: 410px;
    width: 335px;
    border: solid 5px #D9D9D9;
    background-color: #FFFFFF;
    margin: 10px;
    margin-right: 10px;
    border-radius: 10px;
`;

const ScrollDiv = styled.div`
    overflow-y: auto;
    overflow-x: hidden;
    width: 335px;
    height: 360px;
    display: flex; /* Flexbox 사용 */
    flex-direction: column-reverse;
    word-break: break-all;
    &::-webkit-scrollbar {
        width: 4px;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 2px;
        background: #ccc;
    }
`;

const Input = styled.input`
    width: 310px;
    height: 45px;
    margin-bottom: 5px;
    border-radius: 10px;
    background-color: #808080;
    border: none;
    padding-left: 10px;
`;

const Button = styled.div`
    background-color: #d9d9d9;
    width: 70px;
    height: 30px;
    border-radius: 10px;
    font-size: 25px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

    transition: background-color 0.3s, transform 0.1s; /* 애니메이션 효과 추가 */

    &:hover {
        background-color: rgb(160, 160, 160); /* 호버 시 색상 변경 */
    }

    &:active {
        transform: scale(0.95); /* 클릭 시 버튼 크기 축소 */
        background-color: rgb(140, 140, 140); /* 클릭 시 색상 변경 */
    }
`;

const InputContainer = styled.div`
    position: relative;
    bottom: 2px;
    left: 5px;
    `;

const ButtonContainer = styled.div`
    position: relative;
    bottom: 43.5px;
    left: 245px;
    cursor: pointer;
`;

const Chat = styled.div`
        padding-left: 15px;
        padding-right: 10px;
        padding-bottom: 10px;
    `;

const Chating = (props) => {
    const inputRef = useRef(null);
    const [chat, setChat] = useState([]);

    const handleSend = () => {
        // TODO : 채팅 요청
        const value = inputRef.current.value;
        console.log(value);
    }

    return (
        <Container>
            <ScrollDiv>
                {chat.length > 0 ? (
                    chat.map((data) => (
                        <Chat>{"유저이름(data.username)"} : {"채팅(data.content)"}</Chat>
                    ))) : (
                    <Chat></Chat>
                )}
            </ScrollDiv>
            <InputContainer>
                <Input
                    ref={inputRef}
                ></Input>
                <ButtonContainer>
                    <Button
                        onClick={handleSend}
                    >
                        SEND</Button>
                </ButtonContainer>
            </InputContainer>
        </Container>
    );
};

export default Chating;