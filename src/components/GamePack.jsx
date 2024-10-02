import React from "react";
import styled from "styled-components";
import LayoutStyle from "./LayoutStyle";
import gamepack0 from "../assets/gamepack0.png"
import gamepack1_1 from "../assets/gamepack1-1.png"
import gamepack1_3 from "../assets/gamepack1-3.png"
import gamepack2 from "../assets/gamepack2.png"
import gamepack3_1 from "../assets/gamepack3-1.png"
import gamepack3_3 from "../assets/gamepack3-3.png"
import gamepack4 from "../assets/gamepack4.png"
import { Content3 } from "./Texts";

const GamePackContainer = styled.div`
    margin-left: 20px;
    margin-bottom: 20px;
`;

const GamePack0 = styled.div`
    background-image: url(${gamepack0});
    background-size: cover;
    width: 247.25px;
    height: 32.79px;
`;

const GamePack1_1 = styled.div`
    background-image: url(${gamepack1_1});
    background-size: cover;
    width: 40.85px;
    height: 54.29px;
`;

const GameImg = styled.div`
    background-color: black;
    width: 170.93px;
    height: 54.29px;
`;

const GamePack1_3 = styled.div`
    background-image: url(${gamepack1_3});
    background-size: cover;
    width: 34.94px;
    height: 54.29px;
`;

const GamePack2 = styled.div`
    background-image: url(${gamepack2});
    background-size: cover;
    width: 247.25px;
    height: 23.11px;
`;

const GamePack3_1 = styled.div`
    background-image: url(${gamepack3_1});
    background-size: cover;
    width: 95px;
    height: 213px;
`;

const RoomInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: wheat;
    font-size: 10px;
    width: 294px;
    height: 213px;
`;

const GamePack3_3 = styled.div`
    background-image: url(${gamepack3_3});
    background-size: cover;
    width: 71px;
    height: 216px;
`;

const GamePack4 = styled.div`
    background-image: url(${gamepack4});
    background-size: cover;
    width: 247.25px;
    height: 34.4px;
`;

const GamePack = (props) => {
    const { title, gameMode, headCount } = props;

    return (
        <GamePackContainer>
            <LayoutStyle display={"flex"} flexDirection={"column"}>
                <GamePack0 />
                <LayoutStyle display={"flex"} flexDirection={"row"} >
                    <GamePack1_1 />
                    <GameImg />
                    <GamePack1_3 />
                </LayoutStyle>
                <GamePack2 />
                <LayoutStyle display={"flex"} flexDirection={"row"} >
                    <GamePack3_1 />
                    <RoomInfo>
                    </RoomInfo>
                    <GamePack3_3 />
                </LayoutStyle>
                <GamePack4 />
            </LayoutStyle>
        </GamePackContainer>
    )

}

export default GamePack;