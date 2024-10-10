import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import HomeUI from "../components/HomeUI";
import { useLocation } from "react-router-dom";
import UserProfileInRoom from "../components/UserProfileInRoom";
import LayoutStyle from "../components/LayoutStyle";
import Chating from "../components/Chating";
import Button from "../components/Button";
import getMemberListRequest from "../services/GetMemberList";
import useWebSocket from "../hooks/WebSockethook";
import getGameRoomRequest from "../services/GetGameRoom";
import { getLocalStorage } from "../utils/LocalStorageManager";


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

    const gameRoomId = state?.gameRoomId || 0;
    const gameId = state?.gameId || 0;
    const gameRoomName = state?.gameRoomName || "노영준 들어와!";
    const [currentPopulation, setCurrentPopulation] = useState(state?.currentPopulation || 0);
    const maxPopulation = state?.maxPopulation || 0;
    const gameRoomState = state?.gameRoomState;
    const [memberIds, setMemberIds] = useState(state?.memberIds || []);
    const [gameMembers, setGameMembers] = useState([]);
    const { isConnected, messages, sendMessage } = useWebSocket();
    const member = JSON.parse(JSON.parse(getLocalStorage('member')));


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

    const handleGetGameRoom = async () => {
        const response = await getGameRoomRequest(gameRoomId);
        console.log("response23123", response.data);
        if (response) {
            setMemberIds(response.data.memberIds);
        }
    }

    useEffect(() => {
        handleGetGameRoom();
        handleGetJoinMember();
    }, [messages]);

    useEffect(() => {
        if (isConnected) {
            console.log("WebSocket connected!");
            console.log("memberID", member)
            sendMessage({ type: "JOIN_GAME", gameRoomId: gameRoomId, nickName : member.data.nickName,  memberId : member.data.memberId , content : "게임 입장" });
            
        }
    }, [isConnected]);

    useEffect(() => {
        // 새 메시지가 도착했을 때의 처리
        if (messages.length > 0) {
            const latestMessage = messages[messages.length - 1];
            // console.log("New message:", latestMessage);
            // 여기에서 메시지 타입에 따른 처리를 할 수 있습니다.
            if (latestMessage.type === "JOIN_GAME") {
                handleGetGameRoom();
                handleGetJoinMember();
            }
        }
    }, [messages]);

    const handleGameStart = () => {
        sendMessage({ type: "GAME_START", gameRoomId: gameRoomId, nickName : member.data.nickName, memberId : member.data.memberId , content : "게임 시작" });
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
                    <Chating gameRoomId = {gameRoomId} memberId = {member.data.memberId} nickName = {member.data.nickName}></Chating>
                </LayoutStyle>
            </LayoutStyle>
            <LayoutStyle display={"flex"} flexDirection={"row"} justifyContent={"right"} marginRight={"10px"} marginBottom={"10px"}>
                <Button style="gray" width={"345px"} height={"70px"} border={"solid 5px #D9D9D9"} borderRadius={"10px"} fontSize={"40px"} onClick={handleGameStart}>
                    GAME START
                </Button>
            </LayoutStyle>
        </HomeUI>
    );
};

export default RoomPage;