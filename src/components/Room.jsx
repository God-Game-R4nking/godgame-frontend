import React from "react";
import styled from "styled-components";
import LayoutStyle from "./LayoutStyle";
import { No, Title, GameMode, Host, HeadCount, Status } from "../pages/LobbyPage";
import { useNavigate } from "react-router-dom";

const Room = (props) => {
    const { number, title, gameMode, hostname, headCount, status } = props;
    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate("/room", {
            number, title, gameMode, hostname, headCount, status
        });
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