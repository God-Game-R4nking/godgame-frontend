import axios from 'axios';
import { getLocalStorage } from '../utils/LocalStorageManager';

// 게시판 수정 요청
const sendCommentPatchRequest = async (commentIdLong, commentContentString) => {
    const token = getLocalStorage('token'); // localStorage에서 토큰 가져오기

    const response = await axios.patch(`http://localhost:8080/comments/${commentIdLong}`,
        {
            commentId: commentIdLong,
            commentContent: commentContentString,
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token // 토큰을 Authorization 헤더에 추가

            },
        });
    return response;
};

export default sendCommentPatchRequest;