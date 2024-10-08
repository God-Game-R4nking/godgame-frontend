import React from "react";
import styled from "styled-components";
import HomeUI from "../components/HomeUI";
import Input from "../components/Input";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
`;

const ContentContainer = styled.div`
    height: 80%;
    width: 95%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
`;

const Title = styled.div`
    background-color: #d9d9d9;
    height: 30px;
    width: 100%;
    border: solid 1px black;
    font-size: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
`;

const TitleInput = styled.input`
    background-color: white;
    height: 25px;
    width: 100%;
    border: solid 1px black;
    padding: 10px;
    font-size: 25px;
`;

const ContentInput = styled.textarea`
    background-color: white;
    height: 300px;
    width: 100%;
    border: solid 1px black;
    padding: 10px;
    font-size: 25px;
    resize: none;
`;

const SubmitButton = styled.button`
    border: none;
    margin-top: 5px;
    width: 101.9%;
    height: 80px;
    font-size: 20px;
    background-color: #d9d9d9;

    &:hover {
        background-color: rgb(227, 227, 227); /* 호버 시 색상 변경 */
    }

    &:active {
        transform: scale(0.99); /* 클릭 시 버튼 크기 축소 */
        background-color: rgb(140, 140, 140); /* 클릭 시 색상 변경 */
    }
`;

export const Write = () => {
    const handleWrite = () => {

    }

    return (
        <HomeUI category={"글쓰기"}>
            <Container>
                <ContentContainer>
                    <Title>제목</Title>
                    <TitleInput placeholder={"제목을 입력해주세요."}></TitleInput>
                    <Title>내용</Title>
                    <ContentInput placeholder={"내용을 입력해주세요."}></ContentInput>
                    <SubmitButton onClick={handleWrite}>등록</SubmitButton>
                </ContentContainer>
            </Container>
        </HomeUI>
    );
}

export const Edit = () => {
    const handleEdit = () => {

    }

    return (
        <HomeUI category={"글쓰기"}>
            <Container>
                <ContentContainer>
                    <Title>제목</Title>
                    <TitleInput placeholder={"제목을 입력해주세요."}></TitleInput>
                    <Title>내용</Title>
                    <ContentInput placeholder={"내용을 입력해주세요."}></ContentInput>
                    <SubmitButton onClick={handleEdit}>등록</SubmitButton>
                </ContentContainer>
            </Container>
        </HomeUI>
    );
}