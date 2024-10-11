import axios from 'axios';
import { getLocalStorage } from '../utils/LocalStorageManager';

// 게시글 한개 가져오기
const getBoardRequest = async (boardId, page, size) => {
    const token = getLocalStorage('token'); // localStorage에서 토큰 가져오기

    //http://localhost:8080/boards/1?page=1&size=10
    const response = await axios.get(`http://localhost:8080/boards/${boardId}?page=${page}&size=${size}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        validateStatus: (status) => status >= 200 && status < 510, // 에러코드 예외 안뜨게 처리
    });

    return response.data;
};

export default getBoardRequest;
