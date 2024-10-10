import axios from 'axios';
import { getLocalStorage } from '../utils/LocalStorageManager';

// 게시글 여러개 가져오기
const getBoardsRequest = async (page, size) => {
    const token = getLocalStorage('token'); // localStorage에서 토큰 가져오기

    if (!token) {
        console.error("토큰이 없습니다.");
        return;
    }

    try {
        const response = await axios.get(`http://localhost:8080/boards`,  {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token // 토큰을 Authorization 헤더에 추가
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

export default getBoardsRequest;
