import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HomeUI from "../components/HomeUI";
import Board, { Td, TdLeft } from "../components/Board";
import getBoardsRequest from "../services/GetBoards";
import { useNavigate } from "react-router-dom";

const Tr = styled.tr`
    cursor: pointer;
`;

const BoardPage = () => {
    const [response, setResponse] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [index, setIndex] = useState(1);
    const [maxIndex, setMaxIndex] = useState(1);
    const navigate = useNavigate();

    const getBoards = async (title, content, page) => {
        const response = await getBoardsRequest(title, content, page, 8);
        setResponse(response.data.data);
        setPageInfo(response.data.pageInfo);
        setMaxIndex(pageInfo.totalPages);
        console.log(response);
    }

    useEffect(() => {
        getBoards("ALL", "GET", index, 8);
    }, [index]);

    const handleLeft = async () => {
        if (index === 1) {
            setIndex(1);
        } else {
            setIndex(index - 1);
        }
    };

    const handleRight = () => {
        if (index === maxIndex) {
            setIndex(index);
        } else {
            setIndex(index + 1);
        }
    };

    const Post = (props) => {
        return (
            <Tr
                onClick={() => navigate(`/board/${props.boardId}`)}>
                <Td scope="col">{props.boardId}</Td>
                <TdLeft
                    scope="col"
                >
                    {props.commentCount !== 0 ? `${props.title} [${props.commentCount}]` : props.title}
                </TdLeft>
                <Td scope="col">{props.author}</Td>
                <Td scope="col">{props.createdAt}</Td>
                <Td scope="col">{props.views}</Td>
            </Tr>
        );
    };

    const handleSearch = (title, content) => {
        getBoards(title, content, index, 8);
    }

    return (
        <HomeUI category="자유게시판">
            <Board
                handleSearch={handleSearch}
                handleLeft={handleLeft}
                handleRight={handleRight}
                index={index}
            >
                {response.length > 0 ? (
                    response.map((data) => (
                        <Post
                            boardId={data.boardId}
                            title={data.title}
                            author={data.nickName}
                            createdAt={data.createdAt}
                            views={data.viewCount}
                            commentCount={data.commentCount}
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
