import axios from 'axios';
import { getLocalStorage } from '../utils/LocalStorageManager';

// 게시글 한개 가져오기
const deleteCommentRequest = async (commentId) => {
    const token = getLocalStorage('token'); // localStorage에서 토큰 가져오기

    const response = await axios.delete(`http://localhost:8080/comments/${commentId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token // 토큰을 Authorization 헤더에 추가
        },
    });
    return response;
};

export default deleteCommentRequest;
