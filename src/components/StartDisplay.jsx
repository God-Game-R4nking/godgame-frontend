import React from "react";
import styled from 'styled-components';
import gameBoy1 from '../assets/gameboy1.png'
import gameBoy_findpassword from '../assets/gameBoy_findpassword.png'
import gameBoy_signup from '../assets/gameBoy_signup.png'

export const GameBoy1 = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${gameBoy1});
    background-repeat: no-repeat;
    background-size: cover;
    width: 500px;
    height: 220px;
    font-family: "Pixel";
    color: white;
`;

export const GameBoy_findpassword = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${gameBoy_findpassword});
    background-repeat: no-repeat;
    background-size: cover;
    width: 500px;
    height: 400px;
    font-family: "Pixel";
    color: white;
`;

export const GameBoy_signup = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${gameBoy_signup});
    background-repeat: no-repeat;
    background-size: cover;
    width: 500px;
    height: 505px;
    font-family: "Pixel";
    color: white;
`;

export const Display = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`;

const StartDisplay = (props) => {
    const { children, mode } = props;

    if (mode === "findpassword") {
        return <GameBoy_findpassword>
            <Display>
                {children}
            </Display>
        </GameBoy_findpassword>
    } else if (mode === "signup") {
        return <GameBoy_signup>
            <Display>
                {children}
            </Display>
        </GameBoy_signup>
    }

    return <GameBoy1>
        <Display>
            {children}
        </Display>
    </GameBoy1>
};

export default StartDisplay;