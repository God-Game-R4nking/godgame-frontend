import React, { useRef } from "react";
import styled from "styled-components";
import HomeUI from "../components/HomeUI";
import Input from "../components/Input";
import sendBoardRequest from '../services/PostBoard';

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
    const titleRef = useRef(null);
    const contentRef = useRef(null);

    const handleWrite = async () => {
        const title = titleRef.current.value;
        const content = contentRef.current.value;
        const response = await sendBoardRequest(title, content);
        if (response.status === 201) {
            alert("게시글 등록이 완료되었습니다.");
        } else if (response.status === 409) {
            alert("이미 있는 게시글입니다");
        }
    
    }

    return (
        <HomeUI category={"글쓰기"}>
            <Container>
                <ContentContainer>
                    <Title>제목</Title>
                    <TitleInput
                        placeholder={"제목을 입력해주세요."}
                        ref={titleRef}
                    ></TitleInput>
                    <Title>내용</Title>
                    <ContentInput
                        placeholder={"내용을 입력해주세요."}
                        ref={contentRef}
                        ></ContentInput>
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
        <HomeUI category={"글수정"}>
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