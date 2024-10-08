import React, { useEffect } from "react";
import styled from "styled-components";
import HomeUI from "../components/HomeUI";
import { useLocation } from "react-router-dom";
import UserProfileInRoom from "../components/UserProfileInRoom";
import LayoutStyle from "../components/LayoutStyle";
import Chating from "../components/Chating";
import Button from "../components/Button";

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

    const gameRoomId = state?.gameRoomId | 0;
    const gameId = state?.gameId;
    const gameRoomName = state?.gameRoomName === "" ? "sad" : "노영준 들어와!";
    const currentPopulation = state?.currentPopulation | 0;
    const maxPopulation = state?.maxPopulation | 0;
    const gameRoomState = state?.gameRoomState;

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
                            <UserProfileInRoom></UserProfileInRoom>
                            <UserProfileInRoom></UserProfileInRoom>
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