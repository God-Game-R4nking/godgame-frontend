import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HomeUI from "../components/HomeUI";
import { useLocation } from "react-router-dom";
import UserProfileInRoom from "../components/UserProfileInRoom";
import LayoutStyle from "../components/LayoutStyle";
import Chating from "../components/Chating";
import Button from "../components/Button";
import getMemberListRequest from "../services/GetMemberList";
import useWebSocket from "../hooks/WebSockethook";


const InfoBar = styled.div`
    background-color: #BBBBBB;
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 30px;
`;

const UserList = styled.div`
    display: flex;
    padding: 20px;
    flex-wrap: wrap; /* 자식 요소가 넘칠 경우 다음 줄로 감싸기 */
`;

const RoomPage = () => {
    const location = useLocation();
    const state = location.state;

    const gameRoomId = state?.gameRoomId || 0;  // 기본값 0
    const gameId = state?.gameId || 0;          // 기본값 0
    const gameRoomName = state?.gameRoomName || "노영준 들어와!";  // 기본값 "노영준 들어와!"
    const currentPopulation = state?.currentPopulation || 0;  // 기본값 0
    const maxPopulation = state?.maxPopulation || 0;          // 기본값 0
    const gameRoomState = state?.gameRoomState;
    const memberIds = state?.memberIds || [];
    const [gameMembers, setGameMembers] = useState([]);
    const { isConnected, messages, sendMessage } = useWebSocket(`ws://localhost:8080/myHandler`);

    const handleGetJoinMember = async () => {
        const requestParam = { memberIds: memberIds };
        const response = await getMemberListRequest(requestParam);

        console.log("Response", response.data);

        if (response && Array.isArray(response.data)) {
            setGameMembers(response.data);
        } else if (response && Array.isArray(response)) {
            setGameMembers(response);
        } else {
            console.error("Unexpected response format:", response);
            alert("멤버 정보를 불러오는 데 실패했습니다.");
        }
        
    };

    useEffect(() => {
        handleGetJoinMember();
    }, [memberIds]);

    useEffect(() => {
        if (isConnected) {
            console.log("WebSocket connected!");
            // 연결 후 초기 메시지 전송 등의 작업을 수행할 수 있습니다.
        }
    }, [isConnected]);

    useEffect(() => {
        // 새 메시지가 도착했을 때의 처리
        if (messages.length > 0) {
            const latestMessage = messages[messages.length - 1];
            console.log("New message:", latestMessage);
            // 여기에서 메시지 타입에 따른 처리를 할 수 있습니다.
        }
    }, [messages]);

    const handleGameStart = () => {
        // 게임 시작 메시지 전송
        sendMessage({ type: "GAME_START", gameRoomId: gameRoomId });
    };

    return (
        <HomeUI navMode={"room"}>
            <LayoutStyle display={"flex"} flexDirection={"row"} width={"100%"} height={"100%"}>
                <LayoutStyle display={"flex"} flexDirection={"column"} width={"70%"} height={"100%"}>
                    <InfoBar>
                        <div>&nbsp;&nbsp;{gameRoomId}</div>
                        <div>{gameRoomName}</div>
                        <div>{currentPopulation + "/" + maxPopulation}&nbsp;&nbsp;</div>
                    </InfoBar>
                    <LayoutStyle display={"flex"} width={"100%"}>
                        <UserList>
                            {gameMembers.map((member, index) => (
                                <UserProfileInRoom key={member.id || index} nickname={member.nickName} />
                            ))}
                        </UserList>
                    </LayoutStyle>
                </LayoutStyle>
                <LayoutStyle display={"flex"} width={"30%"} height={"100%"}>
                    <Chating></Chating>
                </LayoutStyle>
            </LayoutStyle>
            <LayoutStyle display={"flex"} flexDirection={"row"} justifyContent={"right"} marginRight={"10px"} marginBottom={"10px"}>
                <Button style="gray" width={"345px"} height={"70px"} border={"solid 5px #D9D9D9"} borderRadius={"10px"} fontSize={"40px"}>GAME START</Button>
            </LayoutStyle>
        </HomeUI >
    );
};
export default RoomPage;