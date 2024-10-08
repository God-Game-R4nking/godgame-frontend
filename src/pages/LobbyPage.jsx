import React, { useState } from "react";
import styled from "styled-components";
import HomeUI from "../components/HomeUI";
import Room from "../components/Room";
import LayoutStyle from "../components/LayoutStyle";
import MyProfie from "../components/MyProfile";
import { Content3 } from "../components/Texts";
import AddRoomModal from "../components/AddRoomModal";
import { useNavigate } from "react-router-dom";
import { createGame } from "../services/Game";

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
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();
    const response = null;

    const handleAddRoom = (title, gameMode) => {
        // TODO : 방생성 로직 생성
        response = createGame(title, 1, 1);

        if (response.status === 201) {
            console.log(response.data);
            const gameRoomId = response.data.gameRoomId;
            const gameId = response.data.gameId;
            const gameRoomName = response.data.gameRoomName;
            const currentPopulation = response.data.currentPopulation;
            const maxPopulation = response.data.maxPopulation;
            const gameRoomStatus = response.data.gameRoomStatus;

            navigate("/room", {
                gameRoomId, gameId, gameRoomName, currentPopulation, maxPopulation, gameRoomStatus
            });
        }

        // useEffect 로 설정해야하는 부분.
        // setRooms((prevRooms) => [...prevRooms,
        // <Room
        //     number={number}
        //     title={title}
        //     gameMode={gameMode}
        //     hostname={hostname}
        //     headCount={headCount | "1/8"}
        //     status={status}
        // />
        // ]);
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
                    {rooms}
                </ScrollDiv>
                <LayoutStyle display={"flex"} flexDirection={"column"}>
                    <MyProfie>
                        <Content3>zl존법사짱짱</Content3>
                        <Margin value={"5px"} />
                        <Content3>전 적 1승 9패 (10%)</Content3>
                        <Content3>순 위 10등</Content3>
                    </MyProfie>
                    <FriendListTitle>&nbsp; 👥 친구 목록</FriendListTitle>
                    <FriendList></FriendList>
                </LayoutStyle>

            </LayoutStyle>
        </HomeUI>
    );
}

export default LobbyPage;