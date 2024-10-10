import axios from 'axios';
import { getLocalStorage } from '../utils/LocalStorageManager';

// 게시글 한개 가져오기
const getBoardRequest = async (boardId) => {
    const token = getLocalStorage('token'); // localStorage에서 토큰 가져오기
    const trimmedToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;

    if (!token) {
        console.error("토큰이 없습니다.");
        return;
    }

    try {
        const response = await axios.get(`http://localhost:8080/boards/${boardId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${trimmedToken}`
            },
        });

        if (response.status === 200) {
            console.log("게임방 정보:", response.data);
            return response.data;
        }
    } catch (error) {
        console.error("게시글을 찾지 못했습니다", error);
        if (error.response && error.response.status === 404) {
            alert("게시글을 찾지 못했습니다.");
        }
    }
};

export default getBoardRequest;
