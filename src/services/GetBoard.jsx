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
    });

    return response.data;
};

export default getBoardRequest;
