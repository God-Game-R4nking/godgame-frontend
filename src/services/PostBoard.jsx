import axios from 'axios';
import { getLocalStorage } from '../utils/LocalStorageManager';

//게시판 생성 요청
const sendBoardRequest = async (titleString, contentString) => {
    const token = getLocalStorage('token'); // localStorage에서 토큰 가져오기

    console.log(token);

    if (!token) {
        console.error("토큰이 없습니다.");
        return;
    }
    const response = await axios.post('http://localhost:8080/boards',
        {
            title: titleString,
            content: contentString,
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
    return response;

};

export default sendBoardRequest;
