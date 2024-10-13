import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
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
import sendGameRoomLeaveRequest from "../services/PostGameRoomLeave";
import DrawingPage from "./DrawingPage";


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
    const { isConnected, messages, drawingData, sendMessage, sendDrawingData } = useWebSocket();
    const member = JSON.parse(JSON.parse(getLocalStorage('member')));
    const [gameStart, setGameStart] = useState(false);
    const [manager, setManager] = useState('');
    const [joinMember, setJoinMember] = useState([]);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleGetJoinMember = useCallback(async () => {
        const requestParam = { memberIds: memberIds };
        const response = await getMemberListRequest(requestParam);
        setJoinMember(response.data);

        console.log("Response", response.data);

        if (response && Array.isArray(response.data)) {
            setGameMembers(response.data);
        } else if (response && Array.isArray(response)) {
            setGameMembers(response);
        } else {
            console.error("Unexpected response format:", response);
            alert("멤버 정보를 불러오는 데 실패했습니다.");
        }
    }, [memberIds]);

    const handleGetGameRoom = useCallback(async () => {
        const response = await getGameRoomRequest(gameRoomId);
        console.log("response23123", response.data);
        if (response) {
            setMemberIds(response.data.memberIds);
            setManager(response.data.roomManagerName);
            setCurrentPopulation(response.data.memberIds.length);
        }
    }, [gameRoomId]);

    useEffect(() => {
        if (isConnected) {
            console.log("WebSocket connected!");
            sendMessage({
                type: "JOIN_GAME",
                gameRoomId: gameRoomId,
                nickName: member.data.nickName,
                memberId: member.data.memberId,
                content: "게임 입장"
            });
        }
    }, [isConnected, gameRoomId, member.data.nickName, member.data.memberId, sendMessage]);

    useEffect(() => {
        handleGetGameRoom(); // 페이지 처음 로드될 때만 호출
    }, [gameRoomId]); // gameRoomId가 변하지 않는 한 다시 호출되지 않음

    useEffect(() => {
        handleGetJoinMember(); // 페이지 처음 로드될 때만 호출
    }, [memberIds]); // memberIds가 변하지 않는 한 다시 호출되지 않음

    const lastProcessedMessageIndex = useRef(0); // 마지막으로 처리한 메시지 인덱스 저장

    useEffect(() => {
        const handleMessage = (message) => {
            const parsedMsg = JSON.parse(message);
            console.log("Received message:", parsedMsg);

            if (parsedMsg.type === "JOIN_GAME" || parsedMsg.type === "LEAVE_GAME") {
                handleGetGameRoom();
                handleGetJoinMember();
            } else if (parsedMsg.type === "GAME_STARTED") {
                setGameStart(true);
            }
        };

        // 새로운 메시지만 처리
        const newMessages = messages.slice(lastProcessedMessageIndex.current);
        newMessages.forEach(handleMessage);

        // 마지막 처리한 메시지 인덱스 업데이트
        lastProcessedMessageIndex.current = messages.length;
    }, [messages, handleGetGameRoom, handleGetJoinMember]);

    // 채팅 메시지만 필터링하는 useMemo 훅 추가
    const chatMessages = useMemo(() => {
        return messages.filter(msg => {
            const parsedMsg = JSON.parse(msg);
            return parsedMsg.type === "CHAT" || parsedMsg.type === "START_GAME" || parsedMsg.type === "COUNTDOWN" || parsedMsg.type === "GAME_STARTED" || parsedMsg.type === "JOIN_GAME" || parsedMsg.type === "LEAVE_GAME";
        });
    }, [messages]);

    const drawMessages = useMemo(() => {
        return messages.filter(msg => {
            const parsedMsg = JSON.parse(msg);
            return parsedMsg.type === "CATCH_MIND_CHAT" || parsedMsg.type === "reset";
        });
    }, [messages]);

    const handleGameStart = () => {
        sendMessage({
            type: "START_GAME",
            gameRoomId: gameRoomId,
            nickName: member.data.nickName,
            memberId: member.data.memberId,
            content: "게임 시작"
        });

        // 카운트다운 시작
        for (let i = 5; i > 0; i--) {
            setTimeout(() => {
                sendMessage({
                    type: "COUNTDOWN",
                    nickName: "관리자",
                    content: `${i}초 남았습니다!`
                });
            }, (5 - i) * 1000); // 1초 간격으로 메시지를 보냄
        }

        // 카운트다운이 끝난 후 게임 시작 메시지 전송
        setTimeout(() => {
            sendMessage({
                type: "GAME_STARTED",
                nickName: "관리자",
                content: "게임이 시작되었습니다!"
            });
            // 게임 시작 상태 업데이트
            setGameStart(true);
        }, 5000); // 5초 후 게임 시작 메시지 전송
    };



    const leaveGame = async () => {
        const isConfirmed = window.confirm("정말로 게임을 나가시겠습니까?");

        if (isConfirmed) {
            const response = await sendGameRoomLeaveRequest(gameRoomId, member.data.memberId);

            if (response) {
                sendMessage({
                    type: "LEAVE_GAME",
                    gameRoomId: gameRoomId,
                    nickName: member.data.nickName,
                    memberId: member.data.memberId,
                    content: `${member.data.nickName}님이 게임을 떠났습니다`
                });
            }
        }
        // 사용자가 취소를 선택한 경우, 아무 동작도 하지 않습니다.
    }

    // useEffect(() => {
    //     // 브라우저의 뒤로 가기 버튼을 방지하기 위해 history 상태를 조작합니다.
    //     const preventBackNavigation = () => {
    //         window.history.pushState(null, '', window.location.href);
    //     };

    //     // 현재 상태를 저장하고 뒤로 가기를 방지합니다.
    //     window.history.pushState(null, '', window.location.href);
    //     window.addEventListener('popstate', preventBackNavigation);

    //     // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
    //     return () => {
    //         window.removeEventListener('popstate', preventBackNavigation);
    //     };
    // }, []);

    return (
        <>
            {
                gameStart ?
                    <>
                        <DrawingPage joinMember={joinMember} gameRoomId={gameRoomId} memberId={member.data.memberId} nickName={member.data.nickName} messages={drawMessages} drawingData={drawingData} sendMessage={sendMessage} sendDrawingData={sendDrawingData} ></DrawingPage >
                    </>
                    :
                    <HomeUI navMode={"room"} handleLeave={leaveGame}>
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
                                <Chating gameRoomId={gameRoomId} memberId={member.data.memberId} nickName={member.data.nickName} messages={chatMessages} sendMessage={sendMessage}></Chating>
                            </LayoutStyle>
                        </LayoutStyle>
                        <LayoutStyle display={"flex"} flexDirection={"row"} justifyContent={"right"} marginRight={"10px"} marginBottom={"10px"}>
                            {member.data.nickName === manager && (
                                <Button
                                    style="gray"
                                    width={"345px"}
                                    height={"70px"}
                                    border={"solid 5px #D9D9D9"}
                                    borderRadius={"10px"}
                                    fontSize={"40px"}
                                    onClick={handleGameStart}
                                >
                                    GAME START
                                </Button>
                            )}
                        </LayoutStyle>
                    </HomeUI>
            }
        </>
    );
};

export default RoomPage;