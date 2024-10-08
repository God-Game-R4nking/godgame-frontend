import React, { useState } from "react";
import NavigationBar from "./NavigationBar"
import styled from "styled-components";
import gameboy_zoom0 from "../assets/gameboy_zoom0.png";
import gameboy_zoom2 from "../assets/gameboy_zoom2.png";
import HomeDisplay from "./HomeDisplay";
import getMemberRequest from "../services/GetMember";
import { useEffect } from "react";

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
    const { children, navMode, AddRoom} = props;
    const [member, setMember] = useState('');

    const getMember = async () => {
        try {
            const response = await getMemberRequest();
            console.log("response", response);
            setMember(response.data);
            console.log(member);
        }
        catch {
            console.log("서버 에러입니다");
        }
    };

    useEffect(() => {
        getMember();
    }, []);


    return (
        <Wrap>
            <Gameboy0 />
            <HomeDisplay>
                <NavigationBar mode={navMode} username={member.nickName} AddRoom={AddRoom}/>
                {children}
            </HomeDisplay>
            <Gameboy2 />
        </Wrap>
    );
}

export default HomeUI;