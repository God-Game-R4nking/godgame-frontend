import axios from 'axios';
import { getLocalStorage } from '../utils/LocalStorageManager';

//게임 방 생성 요청
const sendGameStartRequest = async (gameRoomId) => {
    const token = getLocalStorage('token'); // localStorage에서 토큰 가져오기

    if (!token) {
        console.error("토큰이 없습니다.");
        return;
    }

    try {
        const response = await axios.post(`http://localhost:8080/game-rooms/${gameRoomId}/start`, null, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
        });
        if(response.status === 200 || response.status === 201){
            console.log("성공");
        }
    }catch(error) {
        console.error("실패", error);
        if(error.response.status === 409){
            alert("오류입니다");
        }
    }
};

export default sendGameStartRequest;
