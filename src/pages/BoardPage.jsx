import React from "react";
import HomeUI from "../components/HomeUI";
import Board, { Td, TdLeft } from "../components/Board";

const BoardPage = () => {
    const datas = [];
    const Post = (props) => {
        const { data } = props;
        return (
            <tr>
                <Td scope="col">{data.boardId}</Td>
                <TdLeft scope="col">{data.title}</TdLeft>
                <Td scope="col">{data.author}</Td>
                <Td scope="col">{data.createdAt}</Td>
                <Td scope="col">{data.views}</Td>
            </tr>
        );
    };
    // 게시물 Gets 비즈니스 로직 생성
    const boards = datas.map((data) => (<Post contentData={data}></Post>))

    return (
        <HomeUI category="자유게시판">
            <Board>
                {boards}
            </Board>
        </HomeUI>
    );
}

export default BoardPage;
