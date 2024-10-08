import React from "react";
import styled from "styled-components";
import { Content2 } from "./Texts";

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    width: 190px;
    height: 150px;
    background-color: #BBBBBB;
    border-radius: 10px;
    margin: 5px; /* 간격을 주기 위한 마진 */
    box-sizing: border-box; /* padding과 border를 포함하여 계산 */
`;

const Img = styled.div`
    width: 60px;
    height: 60px;
    background-color: #818181;
    margin-bottom: 10px;
`;

const UserProfileInRoom = (props) => {

    return (
        <Wrap>
            <Img></Img>
            <Content2>가나다라마바사아</Content2>

        </Wrap>
    );
}

export default UserProfileInRoom;