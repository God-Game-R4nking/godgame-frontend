import React from "react";
import HomeUI from "../components/HomeUI";
import Board from "../components/Board";

const NotificationPage = () => {
    return (
        <HomeUI category="공지사항">
            <Board></Board>
        </HomeUI>
    );
}

export default NotificationPage;
