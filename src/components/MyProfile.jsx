import React from "react";
import styled from "styled-components";
import LayoutStyle from "./LayoutStyle";

const Wrap = styled.div`
    width: 300px;
    height: 100px;
    border-radius: 10px;
    margin: 0 auto;
    background-color: #D9D9D9;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 10px;
`;

const ProfileImg = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 10px;
    margin-left: 10px;
    margin-right: 20px;
    background-color: #818181;
`;

const MyProfile = (props) => {
    return (
        <Wrap>
            <LayoutStyle display={"flex"} flexDirection={"row"}>
                <ProfileImg />
                <LayoutStyle display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                    {props.children}
                </LayoutStyle>
            </LayoutStyle>

        </Wrap>
    )
}

export default MyProfile;