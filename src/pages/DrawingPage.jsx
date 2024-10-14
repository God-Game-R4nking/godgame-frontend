import React, { useRef, useEffect, useState, useMemo } from "react";
import DrawingApp from "../components/DrawingApp";
import HomeUI from "../components/HomeUI";
import UserProfileInRoom from "../components/UserProfileInRoom";
import styled from "styled-components";
import { getLocalStorage } from "../utils/LocalStorageManager";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-top: 15px;
    width: 100%;
    height: 100%;
    background-color: white;
`;

const UserContainerL = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 450px;
    padding-left: 15px;
    height: 100%;
`;

const UserContainerR = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
    padding-right: 15px;
    width: 450px;
    height: 100%;
`;

const UserContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: end;
`;

const DrawingAppContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 700px;
    height: 100%;
`;

const Input = styled.input`
    width: 580px;
    height: 45px;
    margin-bottom: 5px;
    border-radius: 10px;
    background-color: #808080;
    border: none;
    padding-left: 20px;
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
    margin-top: 10px;
    position: relative;
    left: 43px;
`;

const ButtonContainer = styled.div`
    position: relative;
    bottom: 43.5px;
    left: 522px;
    cursor: pointer;
`;

const ChatWrap = styled.div`
    width: 20%;
`;

const ChatContainer = styled.div`
  position: relative;
  display: inline;
  margin: 20px;
`;

const Chat = styled.div`
  background-color: #484848;
  border-radius: 10px;
  padding: 10px 15px;
  max-width: fit-content; /* 글자 수에 맞게 너비 제한 */
  position: relative;
  font-size: 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  color: white; /* 글자 색상 변경 */
  padding: 20px;
`;

const RightChat = styled(Chat)`
  &:after {
    content: '';
    position: absolute;
    bottom: 0; /* 위치 조정 */
    left: 100%;
    border-width: 15px; /* 꼬리 길이 증가 */
    border-style: solid;
    border-color: transparent transparent transparent #484848;
    margin-left: -5px; /* 꼬리 중앙 정렬 */
    z-index: 1;
  }
`;

const LeftChat = styled(Chat)`
  &:after {
    content: '';
    position: absolute;
    bottom: 0; /* 위치 조정 */
    right: 100%;
    border-width: 15px; /* 꼬리 길이 증가 */
    border-style: solid;
    border-color: transparent #484848 transparent transparent;
    margin-right: -5px; /* 꼬리 중앙 정렬 */
    z-index: 1;
  }
`;

const AnswerChat = styled(Chat)`
  background-color: #4CAF50;  // 정답 채팅을 위한 다른 배경색
  font-weight: bold;
`;

const DrawingPage = ({ joinMember, gameRoomId, memberId, nickName, isConnected, messages, drawingData, sendMessage, sendDrawingData }) => {
    const inputRef = useRef();
    const [leftMembers, setLeftMembers] = useState([]);
    const [rightMembers, setRightMembers] = useState([]);
    const member = JSON.parse(JSON.parse(getLocalStorage('member')));
    const [memberMessages, setMemberMessages] = useState({});
    const [currentDrawer, setCurrentDrawer] = useState('');
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [correctAnswerer, setCorrectAnswerer] = useState('');
    const [drawerAnswerMessage, setDrawerAnswerMessage] = useState(null);


    const resetMessage = useMemo(() => {
        return messages.filter(msg => {
            const parsedMsg = JSON.parse(msg);
            return parsedMsg.type === "reset";
        });
    }, [messages]);

    const currentDrawers = useMemo(() => {
        return messages.filter(msg => {
            const parsedMsg = JSON.parse(msg);
            return parsedMsg.type === "CURRENT_DRAWER";
        });
    }, [messages]);

    const currentAnswers = useMemo(() => {
        return messages.filter(msg => {
            const parsedMsg = JSON.parse(msg);
            return parsedMsg.type === "CURRENT_ANSWER";
        });
    }, [messages]);


    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    const handleSend = () => {
        const inputMessage = inputRef.current.value;
        if (inputMessage.trim() && member.data.nickName !== currentDrawer) {
            sendMessage({
                type: "CATCH_MIND_CHAT",
                gameRoomId: gameRoomId,
                nickName: member.data.nickName,
                memberId: member.data.memberId,
                content: inputMessage
            });
            inputRef.current.value = "";
            
            // 정답 체크
            if (inputMessage.trim().toLowerCase() === currentAnswer.toLowerCase()) {
                setCorrectAnswerer(member.data.nickName);
                sendMessage({
                    type: "CORRECT_ANSWER",
                    gameRoomId: gameRoomId,
                    nickName: member.data.nickName,
                    memberId: member.data.memberId,
                    content: inputMessage
                });
            }
        }
    };

    useEffect(() => {
        const left = [];
        const right = [];

        for (let i = 0; i < joinMember.length; i++) {
            if (i % 2 === 0) {
                left.push(joinMember[i]);
            } else {
                right.push(joinMember[i]);
            }
        }
        setLeftMembers(left);
        setRightMembers(right);
    }, [joinMember]);

    useEffect(() => {
        if (messages.length > 0) {
            const latestMessage = JSON.parse(messages[messages.length - 1]);
            if (latestMessage.type === "CATCH_MIND_CHAT") {
                const { nickName, content } = latestMessage;

                setMemberMessages((prevMessages) => ({
                    ...prevMessages,
                    [nickName]: { content, timestamp: Date.now() }
                }));

                // 5초 후 메시지 제거
                setTimeout(() => {
                    setMemberMessages((prevMessages) => {
                        const newMessages = { ...prevMessages };
                        delete newMessages[nickName];
                        return newMessages;
                    });
                }, 5000);
            }
        }
    }, [messages]);

    useEffect(() => {
        if(currentDrawers.length > 0 && currentAnswers.length > 0){
            const newDrawer = JSON.parse(currentDrawers[currentDrawers.length-1]).content;
            const newAnswer = JSON.parse(currentAnswers[currentAnswers.length-1]).content;
            setCurrentDrawer(newDrawer);
            setCurrentAnswer(newAnswer);
            
            // 새로운 라운드가 시작될 때 그리는 사람의 메시지를 정답으로 설정 (본인에게만 보임)
            if (member.data.nickName === newDrawer) {
                const answerMessage = { content: `현재 정답: ${newAnswer}`, timestamp: Date.now(), isAnswer: true };
                setDrawerAnswerMessage(answerMessage);
                setMemberMessages((prevMessages) => ({
                    ...prevMessages,
                    [newDrawer]: answerMessage
                }));
            } else {
                setDrawerAnswerMessage(null);
            }
        }
    }, [currentDrawers, currentAnswers]);

    const renderMessage = (nickname) => {
        if (nickname === currentDrawer && member.data.nickName === currentDrawer && drawerAnswerMessage) {
            return <AnswerChat>{drawerAnswerMessage.content}</AnswerChat>;
        }

        const message = memberMessages[nickname];
        if (message && Date.now() - message.timestamp < 5000) {
            if (message.isAnswer && member.data.nickName === currentDrawer) {
                return <AnswerChat>{message.content}</AnswerChat>;
            } else if (!message.isAnswer) {
                return message.content;
            }
        }
        return null;
    };

    return (
        <HomeUI gamemode={true}>
            <Container>
                <UserContainerL>
                {leftMembers.map((member, index) => (
                        <UserContainer key={index}>
                            <UserProfileInRoom 
                                nickname={member.nickName} 
                                display={member.nickName === currentDrawer ? "drawer" : 
                                         member.nickName === correctAnswerer ? "correct" : ""}
                            />
                            <ChatContainer>
                                {renderMessage(member.nickName) && (
                                    <LeftChat>{renderMessage(member.nickName)}</LeftChat>
                                )}
                            </ChatContainer>
                        </UserContainer>
                    ))}
                </UserContainerL>
                <DrawingAppContainer>
                    <DrawingApp 
                        gameRoomId={gameRoomId}
                        memberId={memberId}
                        nickName={nickName}
                        isConnected={isConnected}
                        resetMessage={messages}
                        drawingData={drawingData}
                        sendMessage={sendMessage}
                        sendDrawingData={sendDrawingData} 
                        currentDrawer={currentDrawer}
                    />
                     <InputContainer>
                        <Input
                            ref={inputRef}
                            onKeyDown={handleKeyDown}
                            placeholder={member.data.nickName === currentDrawer ? "그리는 중에는 채팅할 수 없습니다." : "메시지를 입력하세요."}
                            disabled={member.data.nickName === currentDrawer}
                        />
                        <ButtonContainer>
                            <Button onClick={handleSend} style={{opacity: member.data.nickName === currentDrawer ? 0.5 : 1}}>SEND</Button>
                        </ButtonContainer>
                    </InputContainer>
                </DrawingAppContainer>
                <UserContainerR>
                {rightMembers.map((member, index) => (
                        <UserContainer key={index}>
                            <ChatContainer>
                                {renderMessage(member.nickName) && (
                                    <RightChat>{renderMessage(member.nickName)}</RightChat>
                                )}
                            </ChatContainer>
                            <UserProfileInRoom 
                                nickname={member.nickName} 
                                display={member.nickName === currentDrawer ? "drawer" : 
                                         member.nickName === correctAnswerer ? "correct" : ""}
                            />
                        </UserContainer>
                    ))}
                </UserContainerR>
            </Container>
        </HomeUI>
    );
};

export default DrawingPage;