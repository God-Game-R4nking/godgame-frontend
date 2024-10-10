import React from "react";
import styled from "styled-components";
import LayoutStyle from "./LayoutStyle";
import { No, Title, GameMode, Host, HeadCount, Status } from "../pages/LobbyPage";
import { useNavigate } from "react-router-dom";
import { getLocalStorage } from "../utils/LocalStorageManager";
import sendGameRoomJoinRequest from "../services/PostGameRoomJoin";

const Room = (props) => {
    const { number, title, gameMode, hostname, headCount, status, memberId } = props;
    const navigate = useNavigate();
    const member = JSON.parse(getLocalStorage('member'));

    const handleOnClick = async() => {
        
        const response = await sendGameRoomJoinRequest(number, memberId);

        console.log("rerwrerwerwe",response);
        if(response){
            const { 
                gameRoomId, 
                gameId, 
                gameRoomName, 
                currentPopulation, 
                maxPopulation, 
                gameRoomStatus, 
                memberIds, 
                roomManagerName 
            } = response;

            navigate("/room", {
                state: { 
                    gameRoomId, 
                    gameId, 
                    gameRoomName, 
                    currentPopulation, 
                    maxPopulation, 
                    gameRoomStatus, 
                    memberIds, 
                    roomManagerName 
                }
            });
        } else {
            console.error("방 입장 실패 또는 에러 처리");
        }
    }


    return (
        <div onClick={handleOnClick}>
            <LayoutStyle display={"flex"} flexDirection={"row"}>
                <No>{number}</No>
                <Title>{title}</Title>
                <GameMode>{gameMode}</GameMode>
                <Host>{hostname}</Host>
                <HeadCount>{headCount}</HeadCount>
                <Status>{status}</Status>
            </LayoutStyle>
        </div>

    );
};

export default Room;