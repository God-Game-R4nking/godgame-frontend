import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HomeUI from "../components/HomeUI";
import Board, { Td, TdLeft } from "../components/Board";
import getBoardsRequest from "../services/GetBoards";
import { useNavigate } from "react-router-dom";

const BottomContent = styled.div`
    display: flex;
    flex-direction: row;
    height: 10.03%;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    background-color: white;
`;

const DirectionButton = styled.button`
    border: none;
    width: 50px;
    height: 40px;
    background-color: #d9d9d9;
    font-size: 35px;
    font-family: "Goblin One", serif;
    font-weight: 400;
    font-style: normal;

    &:hover {
        background-color: rgb(227, 227, 227); /* 호버 시 색상 변경 */
    }

    &:active {
        transform: scale(0.95); /* 클릭 시 버튼 크기 축소 */
        background-color: rgb(140, 140, 140); /* 클릭 시 색상 변경 */
    }
`;

const IndexText = styled.div`
    font-size: 30p;
    font-family: "Goblin One", serif;
    font-weight: 400;
    font-style: normal;
    margin: 15px;
`;

const PixelFont = styled.div`
    font-family: Pixel;
`;

const Tr = styled.tr`
    cursor: pointer;
`;


const BoardPage = () => {
    const [response, setResponse] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [index, setIndex] = useState(1);
    const [maxIndex, setMaxIndex] = useState(1);
    const navigate = useNavigate();

    const getBoards = async (page) => {
        const response = await getBoardsRequest(page, 8);
        setResponse(response.data.data);
        setPageInfo(response.data.pageInfo);
        setMaxIndex(pageInfo.totalPages);
        console.log(response);
    }

    useEffect(() => {
        getBoards(index, 8);
    }, [index]);

    // useEffect(() => {
    //     getBoards();
    // }, [index])


    // TODO : PageInfo에서 maxIndex에 대한 로직 필요
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

    const Index = () => {
        return (
            <BottomContent>
                <DirectionButton onClick={handleLeft}>{"<"}</DirectionButton>
                <IndexText><PixelFont>{index}</PixelFont></IndexText>
                <DirectionButton onClick={handleRight}>{">"}</DirectionButton>
            </BottomContent>
        );
    }

    const Post = (props) => {
        return (
            <Tr
            onClick={() => navigate(`/board/${props.boardId}`)}>
                <Td scope="col">{props.boardId}</Td>
                <TdLeft scope="col">{props.title}</TdLeft>
                <Td scope="col">{props.author}</Td>
                <Td scope="col">{props.createdAt}</Td>
                <Td scope="col">{props.views}</Td>
            </Tr>
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
            <Index></Index>
        </HomeUI>
    );
}

export default BoardPage;
