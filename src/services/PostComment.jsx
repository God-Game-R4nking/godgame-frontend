import axios from 'axios';
import { getLocalStorage } from '../utils/LocalStorageManager';

//댓글 생성 요청
const postComment = async (commentContentString, boardIdNumber, memberIdNumber) => {
    const token = getLocalStorage('token'); // localStorage에서 토큰 가져오기

    const response = await axios.post('http://localhost:8080/comments',
        {
            commentContent: commentContentString,
            boardId: boardIdNumber,
            memberId: memberIdNumber,
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token // 토큰을 Authorization 헤더에 추가

            },
        });

    return response;
};

export default postComment;
