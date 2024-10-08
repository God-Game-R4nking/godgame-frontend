import React from "react";
import NavigationBar from "./NavigationBar"
import styled from "styled-components";
import gameboy_zoom0 from "../assets/gameboy_zoom0.png";
import gameboy_zoom2 from "../assets/gameboy_zoom2.png";
import HomeDisplay from "./HomeDisplay";

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Gameboy0 = styled.div`
    background-image: url(${gameboy_zoom0});
    background-size: cover;
    background-repeat: no-repeat;
    width: 1440px;
    height: 72px;
`;

const Gameboy2 = styled.div`
    background-image: url(${gameboy_zoom2});
    background-size: cover;
    background-repeat: no-repeat;
    width: 1440px;
    height: 217px;
    // 1200 x 199
`;

const HomeUI = (props) => {
    const { children, navMode, AddRoom, category } = props;
    return (
        <Wrap>
            <Gameboy0 />
            <HomeDisplay>
                <NavigationBar mode={navMode} AddRoom={AddRoom} category={category} />
                {children}
            </HomeDisplay>
            <Gameboy2 />
        </Wrap>
    );
}

export default HomeUI;