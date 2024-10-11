import React, { useRef } from "react";
import DrawingApp from "../components/DrawingApp";
import HomeUI from "../components/HomeUI";
import UserProfileInRoom from "../components/UserProfileInRoom";
import styled from "styled-components";

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
  }
`;

const DrawingPage = () => {
    const inputRef = useRef();

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            console.log("Enter 감지");
        }
    }

    const handleSend = () => {
        console.log("메시지 전송");
    }


    return (
        <HomeUI gamemode={true}>
            <Container>
                <UserContainerL>
                    {/* display => 사람 없으면 none 처리해서 안보이게 만듬. */}
                    <UserContainer>
                        <UserProfileInRoom nickname={"1"} display={""}></UserProfileInRoom>
                        <ChatContainer>
                            <LeftChat>asdasdasdsadasdasdasdsadasdasdasdsad</LeftChat>
                        </ChatContainer>
                    </UserContainer>
                    <UserContainer>
                        <UserProfileInRoom nickname={"1"} display={""}></UserProfileInRoom>
                        <ChatContainer>
                            <LeftChat>sadf</LeftChat>
                        </ChatContainer>
                    </UserContainer>
                    <UserContainer>
                        <UserProfileInRoom nickname={"1"} display={""}></UserProfileInRoom>
                        <ChatContainer>
                            <LeftChat>sadf</LeftChat>
                        </ChatContainer>
                    </UserContainer>
                    <UserContainer>
                        <UserProfileInRoom nickname={"1"} display={""}></UserProfileInRoom>
                        <ChatContainer>
                            <LeftChat>sadf</LeftChat>
                        </ChatContainer>
                    </UserContainer>
                </UserContainerL>
                <DrawingAppContainer>
                    <DrawingApp></DrawingApp>
                    <InputContainer>
                        <Input
                            ref={inputRef}
                            onKeyDown={handleKeyDown}
                            placeholder="메시지를 입력하세요."
                        />
                        <ButtonContainer>
                            <Button onClick={handleSend}>SEND</Button>
                        </ButtonContainer>
                    </InputContainer>
                </DrawingAppContainer>
                <UserContainerR>
                    <UserContainer>
                        <ChatContainer>
                            <RightChat>sadf</RightChat>
                        </ChatContainer>
                        <UserProfileInRoom nickname={"1"} display={""}></UserProfileInRoom>
                    </UserContainer>
                    <UserContainer>
                        <ChatContainer>
                            <RightChat>sadf</RightChat>
                        </ChatContainer>
                        <UserProfileInRoom nickname={"1"} display={""}></UserProfileInRoom>
                    </UserContainer>
                    <UserContainer>
                        <ChatContainer>
                            <RightChat>sadf</RightChat>
                        </ChatContainer>
                        <UserProfileInRoom nickname={"1"} display={""}></UserProfileInRoom>
                    </UserContainer>
                    <UserContainer>
                        <ChatContainer>
                            <RightChat>sadf</RightChat>
                        </ChatContainer>
                        <UserProfileInRoom nickname={"1"} display={""}></UserProfileInRoom>
                    </UserContainer>
                </UserContainerR>
            </Container>
        </HomeUI>
    );
};

export default DrawingPage;