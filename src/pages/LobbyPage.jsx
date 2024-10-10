import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HomeUI from "../components/HomeUI";
import Room from "../components/Room";
import LayoutStyle from "../components/LayoutStyle";
import MyProfie from "../components/MyProfile";
import { Content3 } from "../components/Texts";
import AddRoomModal from "../components/AddRoomModal";
import { useNavigate } from "react-router-dom";
import createGame from "../services/Game"
import { getLocalStorage } from "../utils/LocalStorageManager";
import getGameRoomsRequest from "../services/GetGameRooms";

export const ScrollDiv = styled.div`
  overflow-y: auto;
  width: 880px;
  height: 500px; /* 적절한 높이 설정 */
  display: flex; /* Flexbox 사용 */
  flex-direction: column;
  &::-webkit-scrollbar {
    width: 15px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #ccc;
  }
`;

const Margin = ({ value }) => {
    const DivStyle = {
        margin: value,
    };

    return <div style={DivStyle} />
}

export const No = styled.div`
    background-color: #BBBBBB;
    width: 80px;
    height: 50px;
    font-size: 30px;
    margin-top: 1px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const Title = styled.div`
    background-color: #BBBBBB;
    width: 280px;
    height: 50px;
    font-size: 22px;
    margin-top: 1px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break:break-all;
`;

export const GameMode = styled.div`
    background-color: #BBBBBB;
    width: 180px;
    height: 50px;
    font-size: 22px;
    margin-top: 1px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const Host = styled.div`
    background-color: #BBBBBB;
    width: 140px;
    height: 50px;
    font-size: 22px;
    margin-top: 1px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const HeadCount = styled.div`
    background-color: #BBBBBB;
    width: 90px;
    height: 50px;
    font-size: 22px;
    margin-top: 1px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const Status = styled.div`
    background-color: #BBBBBB;
    width: 90px;
    height: 50px;
    font-size: 22px;
    margin-top: 1px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const FriendListTitle = styled.div`
    width: 300px;
    height: 45px;
    border-radius: 10px;
    margin: 0 auto;
    background-color: #D9D9D9;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 5px;
    font-size: 20px;
`;

const FriendList = styled.div`
    width: 300px;
    height: 350px;
    border-radius: 10px;
    margin: 0 auto;
    background-color: #D9D9D9;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 5px;
    font-size: 20px;
`;

const LobbyPage = () => {
    const [gameRoomResponse, setGameRoomResponse] = useState([]);
    const navigate = useNavigate();
    const member = JSON.parse(getLocalStorage('member'));

    const getGameRooms = async () => {
        const response = await getGameRoomsRequest();
        console.log(response);
        setGameRoomResponse(response.data);
    }

    useEffect(() => {
        getGameRooms();
    }, []);

    const handleAddRoom = async (title) => {
        const requestBody = { gameRoomName: title, memberId: member.memberId, gameName: "Catchmind" };
        const response = await createGame(requestBody);

        if (response) {
            const { gameRoomId, gameId, gameRoomName, currentPopulation, maxPopulation, gameRoomStatus, memberIds } = response;

            navigate("/room", {
                state: { gameRoomId, gameId, gameRoomName, currentPopulation, maxPopulation, gameRoomStatus, memberIds }
            });
        } else {
            console.error("방 생성 실패 또는 에러 처리");
        }
    };

    return (
        <HomeUI navMode={"lobby"} AddRoom={handleAddRoom}>
            <LayoutStyle display={"flex"} flexDirection={"row"}>
                <ScrollDiv>
                    <LayoutStyle display={"flex"} flexDirection={"row"}>
                        <No>No</No>
                        <Title>방 제목</Title>
                        <GameMode>게임 모드</GameMode>
                        <Host>방장</Host>
                        <HeadCount>인원</HeadCount>
                        <Status>상태</Status>
                    </LayoutStyle>
                    {gameRoomResponse.length > 0 ? (
                        gameRoomResponse.map((data) => (
                            <Room
                                key={data.gameRoomId}
                                number={data.gameRoomId}
                                title={data.gameRoomName}
                                gameMode={data.gameName}
                                hostname={"방장이름"}
                                headCount={`${data.currentPopulation}/${data.maxPopulation}`}
                                status={data.gameRoomStatus}
                            />
                        ))) : (
                        <div>방이 없습니다.</div>
                    )}
                </ScrollDiv>
                <LayoutStyle display={"flex"} flexDirection={"column"}>
                    <MyProfie>
                        <Content3>{member.nickName}</Content3>
                        <Margin value={"5px"} />
                        <Content3>종합 점수 : {member.totalPoint}</Content3>
                    </MyProfie>
                    <FriendListTitle>&nbsp; 👥 친구 목록</FriendListTitle>
                    <FriendList></FriendList>
                </LayoutStyle>

            </LayoutStyle>
        </HomeUI>
    );
}

export default LobbyPage;