import React from "react";
import styled from "styled-components";
import gameboy_zoom1_1 from "../assets/gameboy_zoom1-1.png";
import gameboy_zoom1_3 from "../assets/gameboy_zoom1-3.png";
import gameboy_gamemode2 from "../assets/gameboy_gamemode2.png";
import gameboy_gamemode3 from "../assets/gameboy_gamemode3.png";

const Wrap = styled.div`
    display: flex;
    flex-direction: row;
`;

const Gameboy1_1 = styled.div`
    background-image: url(${gameboy_zoom1_1});
    background-size: cover;
    background-repeat: no-repeat;
    width: 115px;
    height: 671px;
`;

const Gameboy = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #737373;
    width: 1207px;
    height: 671px;
`;

const Gameboy1_3 = styled.div`
    background-image: url(${gameboy_zoom1_3});
    background-size: cover;
    background-repeat: no-repeat;
    width: 118px;
    height: 671px;
`;

const Gameboy_Gamemode2 = styled.div`
    background-image: url(${gameboy_gamemode2});
    background-size: cover;
    background-repeat: no-repeat;
    width: 97px;
    height: 664px;
`;

const Gameboy_Gamemode = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #737373;
    width: 1604px;
    height: 661px;
`;

const Gameboy_Gamemode3 = styled.div`
    background-image: url(${gameboy_gamemode3});
    background-size: cover;
    background-repeat: no-repeat;
    width: 99px;
    height: 664px;
`;


const HomeDisplay = (props) => {
    const { children, gamemode } = props;

    return (
        <>
            {gamemode ?
                <Wrap>
                    <Gameboy_Gamemode2 />
                    <Gameboy_Gamemode>{children}</Gameboy_Gamemode>
                    <Gameboy_Gamemode3 />
                </Wrap>
                :
                <Wrap>
                    <Gameboy1_1 />
                    <Gameboy>{children}</Gameboy>
                    <Gameboy1_3 />
                </Wrap>
            }
        </>
    );
};

export default HomeDisplay;