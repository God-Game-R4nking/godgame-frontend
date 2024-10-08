import React from "react";
import HomeUI from "../components/HomeUI";
import Board, { Td, TdLeft } from "../components/Board";

const NotificationPage = () => {
    return (
        <HomeUI category="공지사항">
            <Board>
                <tr>
                    <Td scope="col">1</Td>
                    <TdLeft scope="col">같겜 서비스 시작</TdLeft>
                    <Td scope="col">노영준</Td>
                    <Td scope="col">2024.09.30 15:10</Td>
                    <Td scope="col">5</Td>
                </tr>
            </Board>
        </HomeUI>
    );
}

export default NotificationPage;
