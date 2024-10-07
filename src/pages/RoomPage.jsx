import React from "react";
import styled from "styled-components";
import HomeUI from "../components/HomeUI";

const InfoBar = styled.div`
    display: flex;
    flex-direction: row;
`;

const RoomPage = () => {
    return (
        <HomeUI navMode={"room"}>
            <InfoBar>
                <div>asdasd</div>
                <div>asdasd</div>
                <div>asdasd</div>
            </InfoBar>
        </HomeUI>
    );
};

export default RoomPage;