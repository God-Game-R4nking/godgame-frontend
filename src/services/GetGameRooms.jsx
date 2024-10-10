import axios from 'axios';
import { getLocalStorage } from '../utils/LocalStorageManager';

// 회원 정보 가져오기
const getGameRoomsRequest = async () => {
    
    try {
        const response = await axios.get('http://localhost:8080/game-rooms',  {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            console.log("게임방 정보:", response.data);
            return response.data;
        }
    } catch (error) {
        console.error("게임 방 정보 가져오기 실패", error);
        if (error.response && error.response.status === 404) {
            alert("게임방을 찾지 못했습니다.");
        }
    }
};

export default getGameRoomsRequest;
