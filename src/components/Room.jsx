import React from "react";
import styled from "styled-components";
import LayoutStyle from "./LayoutStyle";
import { No, Title, GameMode, Host, HeadCount, Status } from "../pages/LobbyPage";

const Room = (props) => {
    const { number, title, gameMode, hostname, headCount, status, onClick } = props;

    return (
        <div onClick={onClick}>
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