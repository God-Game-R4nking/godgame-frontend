import React from "react";
import styled from "styled-components";
import Input from "../components/Input";
import ic_search from "../assets/ic_search.png";

const Container = styled.div`
    background-color: white;
    height: 100%;
`;

const Search = styled.div`
    height: 18.40%;
`;

const SeerchIcon = styled.div`
    background-image: url(${ic_search});
`

const Content = styled.div`
    height: 81.60%;
`

const Table = styled.table`
    width: 100%;
`

const Thead = styled.thead`
    background-color: #D9D9D9;
    height: 50px;
`;

const Td = styled.td`
    text-align: center;
`

const TdLeft = styled.td`
    text-align: left;
    padding: 10px;
`

const Board = () => {
    return (
        <Container>
            <Search>
                <Input
                    width={"260px"}
                    height={"40px"}
                    border={"solid 3px #D9D9D9"}
                ></Input>
                <SeerchIcon />
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
                        <tr>
                            <Td scope="col">1</Td>
                            <TdLeft scope="col">같겜 서비스 시작</TdLeft>
                            <Td scope="col">노영준</Td>
                            <Td scope="col">2024.09.30 15:10</Td>
                            <Td scope="col">5</Td>
                        </tr>
                    </tbody>
                </Table>
            </Content>

        </Container>
    );
}

export default Board;