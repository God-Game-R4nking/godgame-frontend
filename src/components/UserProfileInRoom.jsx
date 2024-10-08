import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 190px;
    height: 150px;
    background-color: #BBBBBB;
    border-radius: 10px;
    margin: 5px; /* 간격을 주기 위한 마진 */
    box-sizing: border-box; /* padding과 border를 포함하여 계산 */
`;

const UserProfileInRoom = () => {

    return (
        <Wrap></Wrap>
    );
}

export default UserProfileInRoom;