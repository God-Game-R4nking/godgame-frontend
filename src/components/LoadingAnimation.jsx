import React, { useState, useEffect } from "react";
import gameBoy from "../assets/gameboy.png";
import gameBoy0 from "../assets/gameboy0.png";
import StartDisplay from "./StartDisplay";
import gameBoy2 from "../assets/gameboy2.png";
import styled, { keyframes } from 'styled-components';
import { Title, SubTitle, Content, Content2, ColorText, Presskey } from './Texts';
import { useNavigate } from "react-router-dom";

// 스타일 컴포넌트 정의
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

export const Fadein = styled.div`
    font-size: medium;
    position: relative;
    overflow: hidden;
    animation: fadein 2s ease-in-out;

    @keyframes fadein {
        0% {
            opacity: 0;
            transform: translateY(20px);
        }
        100% {
            opacity: 1;
            transform: none;
        }
    }
`;

const zoomInAndUpAnimation = keyframes`
    0% {
        transform: scale(1.3) translateY(0);
    }
    100% {
        transform: scale(3.1) translateY(+120px); // 20% 확대하고 위로 10px 이동
    }
`;

export const GameBoyImg = styled.img`
    animation: ${zoomInAndUpAnimation} 2s forwards;
`;

export const Scene = () => {
    const navigate = useNavigate();
    const [anime, setAnimation] = useState(0);
    const [timeoutId, setTimeoutId] = useState(null);

    const Play = ({ anime }) => {
        if (anime === 0) {
            return (
                <>
                    <h2>{"Skip(ESC)"}</h2>
                    <Gameboy0 />
                    <StartDisplay>
                        <Fadein>
                            <Title>
                                <ColorText color={"red"}>
                                    GOD&nbsp;
                                </ColorText>
                                GAME
                            </Title>
                        </Fadein>
                    </StartDisplay>
                    <GameBoy2 />
                </>
            );
        } else if (anime === 1) {
            return (
                <>
                    <GameBoyImg src={gameBoy} />
                </>
            );
        }
    };

    useEffect(() => {
        const id1 = setTimeout(() => {
            setAnimation(1);
        }, 4000);
        
        const id2 = setTimeout(() => {
            navigate("/home");
        }, 6000);

        setTimeoutId({ id1, id2 });

        // ESC 키 이벤트 핸들러
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                clearTimeout(id1);
                clearTimeout(id2);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            clearTimeout(id1);
            clearTimeout(id2);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [navigate]);

    return (
        <>
            <Play anime={anime} />
        </>
    );
};

const LoadingAnimation = () => {
    return (
        <Wrap>
            <Scene />
        </Wrap>
    );
}

export default LoadingAnimation;
