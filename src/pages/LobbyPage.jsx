import React, { useState } from "react";
import styled from "styled-components";
import HomeUI from "../components/HomeUI";
import Room from "../components/Room";
import LayoutStyle from "../components/LayoutStyle";
import MyProfie from "../components/MyProfile";
import { Content3 } from "../components/Texts";
import AddRoomModal from "../components/AddRoomModal";
import { useNavigate } from "react-router-dom";

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
    word-break:break-all
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

const LobbyPage = () => {
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();

    const handleJoinRoom = () => {
        navigate("/room")
    }

    const handleAddRoom = (number, title, gameMode, hostname, headCount, status) => {
        // TODO : 방생성 로직 생성
        setRooms((prevRooms) => [...prevRooms, 
            <Room
            title={title}
            gameMode={gameMode}
            headCount={headCount}
            onClick={handleJoinRoom}
            />
            ]);
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
                <MyProfie>
                    <Content3>zl존법사짱짱</Content3>
                    <Margin value={"5px"} />
                    <Content3>전 적 1승 9패 (10%)</Content3>
                    <Content3>순 위 10등</Content3>
                </MyProfie>
            </LayoutStyle>
        </HomeUI>
    );
}

export default LobbyPage;