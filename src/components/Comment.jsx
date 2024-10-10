import React from "react";
import styled from "styled-components";
import Button from "./Button";

const Container = styled.div`
    background-color: #d9d9d9;
    width: 1125px;
    height: 100%;
    padding: 10px;
    margin-top: 5px;
`;

const Info = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const Author = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 20px;
    align-items: center;
`

const DateTime = styled.div`
    margin-left: 10px;
    font-size: 15px;
`

const Content = styled.div`
    font-size: 18px;
    margin-top: 10px;
    min-width: min-content;
    max-width: max-content;
    background-color: #d9d9d9;
    word-wrap: break-word; 
`;

const Comment = (props) => {
    const { author, dateTime, children } = props;
    return (
        <Container>
            <Info>
                <Author>{author}&nbsp;<DateTime>{dateTime}</DateTime></Author>
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
            </Info>
            <Content>&nbsp;{children}</Content>
        </Container>
    );
}

export default Comment;