import React, { useState } from "react";
import styled from "styled-components";
import HomeUI from "../components/HomeUI";
import Button from "../components/Button";
import Comment from "../components/Comment";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    height: 2000px;
    overflow-y: auto;
    overflow-x: hidden;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding : 20px;
    height: 100%;
`;

const PostInfo = styled.div`
    height: 40px;
    width: 1144px;
    display: flex;
    flex-direction: row;
`;

const Element = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #d9d9d9;
    width: 100px;
    height: 40px;
    font-size: 20px;
    text-align: center;
    border: solid 1px black;
`;

const ElTitle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
    width: 1045px;
    height: 20px;
    border-bottom: solid 1px black;
    border-right: solid 1px black;
    border-top: solid 1px black;
    padding: 10px;
`;

const ElBotTitle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
    width: 265px;
    height: 20px;
    border-bottom: solid 1px black;
    border-right: solid 1px black;
    border-top: solid 1px black;
    padding: 10px;
`;

const ElBotTitleRmBorder = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
    width: 265px;
    height: 20px;
    border-bottom: solid 1px black;
    border-top: solid 1px black;
    padding: 10px;
`;

const Content = styled.div`
    flex-shrink: 0;
    font-size: 20px;
    margin-top: 10px;
    padding: 10px;
    height: 330px;
    width: 1123px;
    border: solid 1px black;
    overflow-y: auto;
    overflow-x: hidden;
    word-wrap: break-word;
`;

const ElComment = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #d9d9d9;
    width: 1143px;
    height: 50px;
    font-size: 20px;
    border: solid 1px black;
    margin-top: 10px;
`;

const PostDetailPage = (props) => {
    const Comments = () => {
        // TODO : 댓글 로직 구현
        return (
            <div>
                <Comment author={"Gizmo"} dateTime={"1분전"}>{"내용"}</Comment>
            </div>
            
        );
    }

    return (
        <HomeUI category={"게시물 보기"}>
            <Container>
                <ContentContainer>
                    <PostInfo>
                        <Element>제목</Element>
                        <ElTitle>제목제목</ElTitle>
                    </PostInfo>
                    <PostInfo>
                        <Element>작성자</Element>
                        <ElBotTitleRmBorder>노영준</ElBotTitleRmBorder>
                        <Element>등록일</Element>
                        <ElBotTitleRmBorder>2024.09.30 15:10</ElBotTitleRmBorder>
                        <Element>조회수</Element>
                        <ElBotTitle>65</ElBotTitle>
                    </PostInfo>
                    <Content>asdasdasd</Content>
                    <ElComment>
                        &nbsp;&nbsp;댓글 0
                        <div>
                            <Button
                                width={"70px"}
                                height={"35px"}
                                fontSize={"18px"}
                                marginRight={"5px"}
                            >
                                수정
                            </Button>
                            <Button
                                width={"70px"}
                                height={"35px"}
                                backgroundColor={"black"}
                                color={"white"}
                                fontSize={"18px"}
                                marginRight={"5px"}
                            >
                                삭제
                            </Button>
                            <Button
                                width={"70px"}
                                height={"35px"}
                                backgroundColor={"#828282"}
                                color={"white"}
                                fontSize={"18px"}
                                marginRight={"5px"}
                            >
                                신고
                            </Button>
                        </div>
                    </ElComment>
                    {Comments}
                </ContentContainer>
            </Container>
        </HomeUI>
    );
}

export default PostDetailPage;