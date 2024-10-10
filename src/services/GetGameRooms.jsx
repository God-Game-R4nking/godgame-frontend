import axios from 'axios';

// 회원 정보 가져오기
const getGameRoomsRequest = async () => {
    const response = await axios.get('http://localhost:8080/game-rooms', {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return response.data;
};

export default getGameRoomsRequest;
