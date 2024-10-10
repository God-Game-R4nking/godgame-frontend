import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HomeUI from "../components/HomeUI";
import Board, { Td, TdLeft } from "../components/Board";
import getBoardsRequest from "../services/GetBoards";

const BoardPage = () => {
    const [response, setResponse] = useState([]);

    const getBoards = async () => {
        const response = await getBoardsRequest(1, 10);
        console.log("23423432 : ");
        console.log(response);
        setResponse(response.data);
    }

    useEffect(() => {
        getBoards();
    }, []);

    const Post = (props) => {
        return (
            <tr>
                <Td scope="col">{props.boardId}</Td>
                <TdLeft scope="col">{props.title}</TdLeft>
                <Td scope="col">{props.author}</Td>
                <Td scope="col">{props.createdAt}</Td>
                <Td scope="col">{props.views}</Td>
            </tr>
        );
    };
    // 게시물 Gets 비즈니스 로직 생성

    return (
        <HomeUI category="자유게시판">
            <Board>
                {response.length > 0 ? (
                    response.map((data) => (
                        <Post
                            boardId={data.boardId}
                            title={data.title}
                            author={data.nickName}
                            createdAt={data.createdAt}
                            views={data.viewCount}
                        />
                    ))) : (
                    <tr>
                        <Td scope="col"></Td>
                        <TdLeft scope="col"></TdLeft>
                        <Td scope="col"></Td>
                        <Td scope="col"></Td>
                        <Td scope="col"></Td>
                    </tr>
                )}
            </Board>
        </HomeUI>
    );
}

export default BoardPage;
