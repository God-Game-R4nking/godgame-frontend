import React from "react";
import styled from "styled-components";
import gameboy_zoom1_1 from "../assets/gameboy_zoom1-1.png";
import gameboy_zoom1_3 from "../assets/gameboy_zoom1-3.png";

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

const HomeDisplay = (props) => {
    const { children } = props;

    return (
        <Wrap>
            <Gameboy1_1 />
            <Gameboy>{children}</Gameboy>
            <Gameboy1_3 />
        </Wrap>
    );
};

export default HomeDisplay;