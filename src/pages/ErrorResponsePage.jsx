import React from "react";
import HomeUI from "../components/HomeUI";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Wrap = styled.div`
    background-color: #01FE67;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Title = styled.div`
    font-size: 120px;
    color: black;
    text-align: start;
    margin-bottom: 20px;
`;

const Content = styled.div`
    font-size: 25px;
`;

const Button = styled.button`
    margin-top: 50px;
    width: 300px;
    height: 100px;
    font-size: 50px;
    border: solid 1px black;

    transition: background-color 0.3s, transform 0.1s; /* 애니메이션 효과 추가 */

    &:hover {
        background-color: rgb(160, 160, 160); /* 호버 시 색상 변경 */
    }

    &:active {
        transform: scale(0.95); /* 클릭 시 버튼 크기 축소 */
        background-color: rgb(140, 140, 140); /* 클릭 시 색상 변경 */
    }
`;

export const Status404 = () => {
    const navigate = useNavigate();

    return (
        <HomeUI gamemode={true}>
            <Wrap>
                <Title>404 NOT FOUND</Title>
                <Content>존재하지 않는 주소를 입력하셨거나</Content>
                <Content>요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.</Content>
                <Button
                    onClick={() => navigate('/board')}
                >
                    GO Back</Button>
            </Wrap>
        </HomeUI>
    );
}
