import React, { useRef, useState } from "react";
import HomeUI from "../components/HomeUI";
import styled from "styled-components";
import drawing from "../assets/drawingapp.jpeg";
import rangking from "../assets/ranking.png";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;    
    align-items: center;
    justify-content: center;
`;

const ContentTitle = styled.div`
    width: 98.5%;
    height: 90px;
    background-color: rgba(0,0,0,0.5);
    font-size: 80px;
    padding-left: 10px;
    color: white;
`;

const Img = styled.div`
    background-image: url(${drawing});
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 300px;
`;

const MouseOverEffect = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 100px;
    text-align: center;
    background-color: rgba(0,0,0,0.5);
    height: 100%;
    font-size: 80px;
    padding-left: 10px;
    color: white;
`

const Img2 = styled.div`
    background-image: url(${rangking});
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 300px;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 60px;
    background-color: rgba(0,0,0,0.5);
    font-size: 40px;
    text-align: center;
    color: white;
`;

const HomePage = () => {
    const [effect1, setEffect1] = useState(false);
    const [effect2, setEffect2] = useState(false);
    const navigate = useNavigate();

    return (
        <HomeUI category={"메인 페이지"}>
            <Container>
                <ContentContainer>
                    <ContentTitle>New</ContentTitle>
                    <Img
                        onMouseOver={() => setEffect1(true)}
                        onMouseLeave={() => setEffect1(false)}
                    >
                        {effect1 ?
                            <MouseOverEffect
                                onClick={() => navigate('/lobby')}
                            >게임하러가기</MouseOverEffect>
                            :
                            null
                        }
                    </Img>
                    <Content>그림 맞추기 게임 출시</Content>
                </ContentContainer>
                <ContentContainer>
                    <ContentTitle>Ranking</ContentTitle>
                    <Img2
                        onMouseOver={() => setEffect2(true)}
                        onMouseLeave={() => setEffect2(false)}
                    >
                        {effect2 ?
                            <MouseOverEffect
                                onClick={() => navigate('/rank')}
                            >랭킹보기</MouseOverEffect>
                            :
                            null
                        }
                    </Img2>
                    <Content>GODGAME 명예의 전당</Content>
                </ContentContainer>
            </Container>
        </HomeUI>
    );
}

export default HomePage;