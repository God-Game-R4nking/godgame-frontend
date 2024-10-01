import React, { useRef } from "react";
import gameBoy0 from "../assets/gameboy0.png";
import StartDisplay from "../components/StartDisplay";
import gameBoy2 from "../assets/gameboy2.png";
import styled from 'styled-components';
import LoadingAnimaion from "../components/LoadingAnimation";
import { useNavigate } from "react-router-dom";

export const Wrap = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Gameboy0 = styled.div`
    align-items: center;
    background-image: url(${gameBoy0});
    background-repeat: no-repeat;
    background-size: cover;
    width: 500px;
    height: 125px;
    font-family: "Pixel";
    color: white;
`;

export const GameBoy2 = styled.div`
    background-image: url(${gameBoy2});
    background-repeat: no-repeat;
    background-size: cover;
    width: 500px;
    height: 465px;
    font-family: "Pixel";
    color: white;
`;

const LoadingPage = () => {
    const gameboyRef = useRef(null);
    const navigate = useNavigate();
    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            navigate("/home");
        }
    }

    return (
        <div ref={gameboyRef} tabIndex={0} onKeyDown={handleKeyDown}>
            <LoadingAnimaion />
        </div>
    );
}

export default LoadingPage;
