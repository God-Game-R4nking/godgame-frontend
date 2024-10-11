import axios from 'axios';
import { getLocalStorage } from '../utils/LocalStorageManager';

// 게시판 수정 요청
const sendBoardPatchRequest = async (boardId, titleString, contentString) => {
    const token = getLocalStorage('token'); // localStorage에서 토큰 가져오기

    const response = await axios.patch(`http://localhost:8080/boards/${boardId}`,
        {
            title: titleString,
            content: contentString,
            boardStatus: "BOARD_REGISTERED",
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token // 토큰을 Authorization 헤더에 추가

            },
        });
    return response;
};

export default sendBoardPatchRequest;