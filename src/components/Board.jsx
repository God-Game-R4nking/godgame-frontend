import React, { useRef } from "react";
import styled from "styled-components";
import Input from "../components/Input";
import ic_search from "../assets/ic_search.png";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    height: 100%;
`;

const Search = styled.div`
    display: flex;
    flex-direction: row-reverse;
    position: relative;
    top: 40px;
    right: 2px;
    height: 16.55%;
    width: 100%;
`;

const Content = styled.div`
    height: 73.42%;
`

const SearchButton = styled.button`
    background-image: url(${ic_search});
    background-size: cover;
    background-color: #d9d9d9;
    border: none;
    width: 43px;
    height: 43px;

    &:hover {
        background-color: rgb(227, 227, 227); /* 호버 시 색상 변경 */
    }

    &:active {
        transform: scale(0.95); /* 클릭 시 버튼 크기 축소 */
        background-color: rgb(140, 140, 140); /* 클릭 시 색상 변경 */
    }
`;

const WriteButton = styled.button`
    border: none;
    width: 90px;
    height: 40px;
    font-size: 20px;
    position: relative;
    background-color: #d9d9d9;
    right: 700px;

    &:hover {
        background-color: rgb(227, 227, 227); /* 호버 시 색상 변경 */
    }

    &:active {
        transform: scale(0.95); /* 클릭 시 버튼 크기 축소 */
        background-color: rgb(140, 140, 140); /* 클릭 시 색상 변경 */
    }
`;

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

const Table = styled.table`
    width: 100%;
`

const Thead = styled.thead`
    background-color: #D9D9D9;
    height: 50px;
`;

export const Td = styled.td`
    text-align: center;
`

export const TdLeft = styled.td`
    text-align: left;
    padding: 10px;
`;

const Select = styled.select`
    width: 100px;
    height: 42px;
    border: solid, 3px, #d9d9d9;
    border-right: none;
    font-size: 15px;
    padding-left: 8px;
`

const Board = (props) => {
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const searchRef = useRef(null);
    const { handleSearch, handleLeft, handleRight, index } = props;

    const Index = () => {
        return (
            <BottomContent>
                <DirectionButton onClick={handleLeft}>{"<"}</DirectionButton>
                <IndexText><PixelFont>{index}</PixelFont></IndexText>
                <DirectionButton onClick={handleRight}>{">"}</DirectionButton>
            </BottomContent>
        );
    }

    const searchHandler = () => {
        if (searchRef.current.value === "title") {
            handleSearch(inputRef.current.value, "");
        } else handleSearch("", inputRef.current.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') searchHandler()
    }

    return (
        <Container>
            <Search>
                <SearchButton onClick={searchHandler}/>
                <Input
                    width={"250px"}
                    height={"35px"}
                    border={"solid 3px #D9D9D9"}
                    ref={inputRef}
                    paddingLeft={"10px"}
                    onKeyDown={handleKeyDown}
                ></Input>
                <Select
                    name="search"
                    ref={searchRef}
                >
                    <option value="title">제목</option>
                    <option value="content">내용</option>
                </Select>

                <WriteButton onClick={() => {
                    navigate("/board/write");
                }}
                >
                    글쓰기</WriteButton>
            </Search>
            <Content>
                <Table summary="notice">
                    <colgroup>
                        <col width="8.28%"></col>
                        <col width="53.06%"></col>
                        <col width="12.99%"></col>
                        <col width="17.39%"></col>
                        <col width="8.28%"></col>
                    </colgroup>
                    <Thead>
                        <tr>
                            <th scope="col">번호</th>
                            <th scope="col">제목</th>
                            <th scope="col">작성자</th>
                            <th scope="col">날짜</th>
                            <th scope="col">조회수</th>
                        </tr>
                    </Thead>
                    <tbody>
                        {props.children}
                    </tbody>
                </Table>
            </Content>
            <Index></Index>
        </Container>
    );
}

export default Board;