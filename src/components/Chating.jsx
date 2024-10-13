import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import useWebSocket from "../hooks/WebSockethook";


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
    display: flex;
    flex-direction: column;
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
    font-size: 20px;
    color: white;
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
    transition: background-color 0.3s, transform 0.1s;

    &:hover {
        background-color: rgb(160, 160, 160);
    }

    &:active {
        transform: scale(0.95);
        background-color: rgb(140, 140, 140);
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

const Chating = ({ memberId, gameRoomId, nickName, messages, sendMessage }) => {
    const inputRef = useRef(null);
    const [chat, setChat] = useState([]);
    const scrollRef = useRef(null);
    const processedMessagesRef = useRef(new Set());

    useEffect(() => {
        if (messages && Array.isArray(messages)) {
            const newMessages = messages.filter(msg => {
                if (typeof msg === 'string') {
                    try {
                        const parsedMsg = JSON.parse(msg);
                        if (!processedMessagesRef.current.has(JSON.stringify(parsedMsg))) {
                            processedMessagesRef.current.add(JSON.stringify(parsedMsg));
                            return true;
                        }
                    } catch (error) {
                        console.error("Invalid JSON format", error);
                    }
                }
                return false;
            }).map(msg => JSON.parse(msg));

            if (newMessages.length > 0) {
                setChat(prevChat => [...prevChat, ...newMessages]);
            }
        }
    }, [messages]);

    const handleSend = () => {
        const value = inputRef.current.value.trim();
        if (value) {
            const newMessage = {
                type: 'CHAT',
                gameRoomId: gameRoomId,
                memberId: memberId,
                nickName: nickName,
                content: value
            };
            sendMessage(newMessage);
            inputRef.current.value = '';
        }
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [chat]);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <Container>
            <ScrollDiv ref={scrollRef}>
                {chat.map((data, index) => (
                    <Chat key={index}>{data.nickName} : {data.content}</Chat>
                ))}
            </ScrollDiv>
            <InputContainer>
                <Input 
                    ref={inputRef} 
                    onKeyPress={handleKeyPress}
                    placeholder="메시지를 입력하세요..."
                />
                <ButtonContainer>
                    <Button onClick={handleSend}>SEND</Button>
                </ButtonContainer>
            </InputContainer>
        </Container>
    );
};

export default Chating;