import React, { useEffect, useState } from "react";
import NavigationBar from "./NavigationBar";
import styled from "styled-components";
import gameboy_zoom0 from "../assets/gameboy_zoom0.png";
import gameboy_zoom2 from "../assets/gameboy_zoom2.png";
import HomeDisplay from "./HomeDisplay";
import { getLocalStorage } from "../utils/LocalStorageManager";
import { useNavigate } from "react-router-dom";
import getMemberRequest from "../services/GetMember";
import gameboy_gamemode1 from "../assets/gameboy_gamemode1.png";
import gameboy_gamemode4 from "../assets/gameboy_gamemode4.png";

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
`;

const Gameboy_Gamemode1 = styled.div`
     background-image: url(${gameboy_gamemode1});
    background-size: cover;
    background-repeat: no-repeat;
    width: 1800px;
    height: 60px;
`;

const Gameboy_Gamemode4 = styled.div`
     background-image: url(${gameboy_gamemode4});
    background-size: cover;
    background-repeat: no-repeat;
    width: 1800px;
    height: 177px;
`;

const HomeUI = (props) => {
    const { children, navMode, AddRoom, category, gamemode, handleLeave } = props;
    const [member, setMember] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMember = async () => {
            if (getLocalStorage('member') === null && getLocalStorage('token') === null) {
                navigate("/");
                return;
            }

            const memberData = await getMemberRequest();
            setMember(memberData);
        };

        fetchMember();
    }, [navigate]);

    const navi = gamemode ? null : (
        <NavigationBar
            mode={navMode}
            username={member ? member.data.nickName : ""}
            AddRoom={AddRoom}
            category={category}
            handleLeave={handleLeave}
        />
    );

    return (
        <>
            {gamemode ?
                <Wrap>
                    < Gameboy_Gamemode1 />
                    <HomeDisplay gamemode={true}>
                        {navi}
                        {children}
                    </HomeDisplay>
                    <Gameboy_Gamemode4 />
                </Wrap >
                :
                <Wrap>
                    <Gameboy0 />
                    <HomeDisplay>
                        {navi}
                        {children}
                    </HomeDisplay>
                    <Gameboy2 />
                </Wrap>
            }
        </>
    );
}

export default HomeUI;
