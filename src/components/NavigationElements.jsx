import styled from "styled-components";
import ic_home from "../assets/ic_home.png"
import ic_reload from "../assets/ic_reload.png"
import ic_room from "../assets/ic_room.png"
import ic_notification from "../assets/ic_notification.png"
import ic_board from "../assets/ic_board.png"
import ic_community from "../assets/ic_community.png"
import ic_rank from "../assets/ic_rank.png"
import ic_question from "../assets/ic_question.png"
import ic_plus from "../assets/ic_plus.png"
import ic_setting from "../assets/ic_setting.png"

export const Home = styled.button`
    background-color: #BBBBBB;
    background-image: url(${ic_home});
    background-size: 80px;
    background-repeat: no-repeat;
    background-position: center;
    border: none;
    width: 100px;
    height: 100px;
    margin-right: 1px;
    &:hover {
        background-color: rgb(160, 160, 160); /* 호버 시 색상 변경 */
    }

    &:active {
        transform: scale(0.95); /* 클릭 시 버튼 크기 축소 */
        background-color: rgb(119, 119, 119); /* 클릭 시 색상 변경 */
    }
`;

export const Reload = styled.button`
background-color: #BBBBBB;
background-image: url(${ic_reload});
background-size: 60px;
background-repeat: no-repeat;
background-position: center;
border: none;
width: 100px;
height: 100px;
margin-right: 1px;
&:hover {
    background-color: rgb(160, 160, 160); /* 호버 시 색상 변경 */
}

&:active {
    transform: scale(0.95); /* 클릭 시 버튼 크기 축소 */
    background-color: rgb(119, 119, 119); /* 클릭 시 색상 변경 */
}
`;

export const Room = styled.button`
    background-color: #BBBBBB;
    background-image: url(${ic_room});
    background-size: 80px;
    background-repeat: no-repeat;
    background-position: center;
    border: none;
    width: 100px;
    height: 100px;
    margin-left: 1px;
    margin-right: 1px;
    &:hover {
        background-color: rgb(160, 160, 160); /* 호버 시 색상 변경 */
    }

    &:active {
        transform: scale(0.95); /* 클릭 시 버튼 크기 축소 */
        background-color: rgb(119, 119, 119); /* 클릭 시 색상 변경 */
    }
`;

export const Plus = styled.button`
    background-color: #BBBBBB;
    background-image: url(${ic_plus});
    background-size: 80px;
    background-repeat: no-repeat;
    background-position: center;
    border: none;
    width: 100px;
    height: 100px;
    margin-right: 1px;
    &:hover {
        background-color: rgb(160, 160, 160); /* 호버 시 색상 변경 */
    }

    &:active {
        transform: scale(0.95); /* 클릭 시 버튼 크기 축소 */
        background-color: rgb(119, 119, 119); /* 클릭 시 색상 변경 */
    }
`;

export const Notification = styled.button`
    background-color: #BBBBBB;
    background-image: url(${ic_notification});
    background-size: 80px;
    background-repeat: no-repeat;
    background-position: center;
    border: none;
    width: 100px;
    height: 100px;
    margin-right: 1px;
    &:hover {
        background-color: rgb(160, 160, 160); /* 호버 시 색상 변경 */
    }

    &:active {
        transform: scale(0.95); /* 클릭 시 버튼 크기 축소 */
        background-color: rgb(119, 119, 119); /* 클릭 시 색상 변경 */
    }
`;

export const Board = styled.button`
    background-color: #BBBBBB;
    background-image: url(${ic_board});
    background-size: 80px;
    background-repeat: no-repeat;
    background-position: center;
    border: none;
    width: 100px;
    height: 100px;
    margin-right: 1px;
    &:hover {
        background-color: rgb(160, 160, 160); /* 호버 시 색상 변경 */
    }

    &:active {
        transform: scale(0.95); /* 클릭 시 버튼 크기 축소 */
        background-color: rgb(119, 119, 119); /* 클릭 시 색상 변경 */
    }
`;

export const Community = styled.button`
    background-color: #BBBBBB;
    background-image: url(${ic_community});
    background-size: 80px;
    background-repeat: no-repeat;
    background-position: center;
    border: none;
    width: 100px;
    height: 100px;
    margin-right: 1px;
    &:hover {
        background-color: rgb(160, 160, 160); /* 호버 시 색상 변경 */
    }

    &:active {
        transform: scale(0.95); /* 클릭 시 버튼 크기 축소 */
        background-color: rgb(119, 119, 119); /* 클릭 시 색상 변경 */
    }
`;

export const Rank = styled.button`
    background-color: #BBBBBB;
    background-image: url(${ic_rank});
    background-size: 80px;
    background-repeat: no-repeat;
    background-position: center;
    border: none;
    width: 100px;
    height: 100px;
    margin-right: 1px;
    &:hover {
        background-color: rgb(160, 160, 160); /* 호버 시 색상 변경 */
    }

    &:active {
        transform: scale(0.95); /* 클릭 시 버튼 크기 축소 */
        background-color: rgb(119, 119, 119); /* 클릭 시 색상 변경 */
    }
`;

export const Question = styled.button`
    background-color: #BBBBBB;
    background-image: url(${ic_question});
    background-size: 40px;
    background-repeat: no-repeat;
    background-position: center;
    border: none;
    width: 100px;
    height: 100px;
    margin-right: 1px;
    &:hover {
        background-color: rgb(160, 160, 160); /* 호버 시 색상 변경 */
    }

    &:active {
        transform: scale(0.95); /* 클릭 시 버튼 크기 축소 */
        background-color: rgb(119, 119, 119); /* 클릭 시 색상 변경 */
    }
`;

export const MyPage = styled.div`
    background-color: #BBBBBB;
    border: none;
    width: 550px;
    height: 100px;
    margin-right: 1px;
    flex-grow: 1; /* 남은 공간을 채우기 위해 flex-grow 사용 */
    justify-content: center;
    align-items: center; /* 내용 중앙 정렬 */
    text-align: center;
`;

export const Banner = styled.button`
    background-color: #BBBBBB;
    border: none;
    height: 100px;
    margin-right: 1px;
    display: flex;
    flex-direction: column;
    flex-grow: 1; /* 남은 공간을 채우기 위해 flex-grow 사용 */
    justify-content: center;
    align-items: center; /* 내용 중앙 정렬 */
    text-align: center;
    font-size: 30px;
    &:hover {
        background-color: rgb(160, 160, 160); /* 호버 시 색상 변경 */
    }

    &:active {
        transform: scale(0.95); /* 클릭 시 버튼 크기 축소 */
        background-color: rgb(119, 119, 119); /* 클릭 시 색상 변경 */
    }
`;

export const Setting = styled.button`
    background-color: #BBBBBB;
    background-image: url(${ic_setting});
    background-size: 60px;
    background-repeat: no-repeat;
    background-position: center;
    border: none;
    width: 100px;
    height: 100px;
    margin-right: 1px;
    &:hover {
        background-color: rgb(160, 160, 160); /* 호버 시 색상 변경 */
    }

    &:active {
        transform: scale(0.95); /* 클릭 시 버튼 크기 축소 */
        background-color: rgb(119, 119, 119); /* 클릭 시 색상 변경 */
    }
`;

const TitleBarStyle = styled.div`
    background-color: #BBBBBB;
    width: 99.8%;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 30px;
`

export const TitleBar = ({ children }) => {
    return <TitleBarStyle>{children}</TitleBarStyle>
}