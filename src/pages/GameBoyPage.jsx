import React, { useEffect, useRef, useState } from 'react';
import gameBoy0 from '../assets/gameboy0.png'
import gameBoy2 from '../assets/gameboy2.png'
import styled from 'styled-components';
import Scene from '../components/GameBoyScenes';
import { getLocalStorage } from '../utils/LocalStorageManager';
import { useNavigate } from 'react-router-dom';

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

const GameBoyPage = () => {
    /** scene 모드 설명
     * 0 : 첫 화면 
     * 1 : 로그인, 회원가입, 비밀번호 찾기 화면 
     * 2 : 로그인
     * 3 : 회원가입
     * 4 : 비번찾기 */
    const [scene, setScene] = useState(0);
    const [mode, setMode] = useState(0);
    const gameboyRef = useRef(null);
    const navigate = useNavigate();

    const handleKeyDown = (e) => {
        switch (scene) {
            // 0 : 첫 화면 
            case 0:
                if (e.key === 'Enter') {
                    setScene(1);
                }
                break;

            // 1 : 로그인, 회원가입, 비밀번호 찾기 선택 화면
            case 1:
                switch (e.key) {
                    case 'ArrowUp':
                        setMode((prevMode) => (prevMode === 0 ? 2 : prevMode - 1));
                        break;

                    case 'ArrowDown':
                        setMode((prevMode) => (prevMode === 2 ? 0 : prevMode + 1));
                        break;

                    case 'Enter':
                        // 다음 씬으로 이동
                        switch (mode) {
                            case 0:
                                setScene(2);
                                break;
                            case 1:
                                setScene(3);
                                break;
                            case 2:
                                setScene(4);
                                break;
                            default:
                                break;
                        }
                        break;

                    case 'ArrowLeft':
                        setScene(0);
                        break;

                    default:
                        break;
                }
                break;

            // 2 : 로그인 화면
            case 2:
                if (e.key === 'ArrowLeft') setScene(1);
                if (e.key === 'Escape') setScene(1);
                break;

            // 3 : 회원가입 화면
            case 3:
                if (e.key === 'ArrowLeft') {
                    setScene(1);
                } else if (e.key === 'ArrowRight') {
                    setScene(3.1);
                }

                if (e.key === 'Escape') {
                    setScene(1);
                }

                break;

            // 3.1 : 회원가입 약관
            case 3.1:
                if (e.key === 'ArrowLeft') {
                    setScene(3);
                }

                if (e.key === 'ArrowRight') {
                    setScene(3.2);
                }

                if (e.key === 'Escape') setScene(1);

                break;

            case 3.2:
                if (e.key === 'ArrowLeft') {
                    setScene(3.1);
                    gameboyRef.current.focus();
                }

                if (e.key === 'Escape') setScene(1);
                break;

            case 3.3:
                if (e.key === 'Escape') setScene(1);

            case 3.4:
                if (e.key === 'Enter') setScene(1);
                break;

            case 4:
                if (e.key === 'ArrowLeft') setScene(1);
                if (e.key === 'Escape') setScene(1);
                break;

            default:
                break;
        }
    };
    useEffect(() => {
        if (getLocalStorage('member') !== null && getLocalStorage('token') !== null) {
            navigate('/home');
        }
    }, []);
    // 디버그용 콘솔
    useEffect(() => {
        if (scene === 1) {
            gameboyRef.current.focus();
        }
        console.log("scene : " + scene);
        console.log(process.env.REACT_APP_BACKEND_URL);
    }, [scene]);

    useEffect(() => {
        console.log("mode : " + mode);
    }, [mode]);

    return (
        <div ref={gameboyRef} className="gameboy" tabIndex={0} onKeyDown={handleKeyDown}>
            <Wrap>
                <Gameboy0 />
                <Scene scene={scene} mode={mode} setScene={setScene} gameboyRef={gameboyRef} />
                <GameBoy2 />
            </Wrap>
        </div>
    );
}

export default GameBoyPage;