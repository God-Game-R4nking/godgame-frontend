import axios from 'axios';

// 회원가입 요청 함수
export const createGame = async (requestBody) => {
    const {gameRoomName, memberId, gameId} = requestBody;
    const based_url = process.env.REACT_APP_BACKEND_URL;
    const response = await axios.post(based_url + 'game-rooms', gameRoomName, memberId, gameId, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return response;  // 성공 시 서버에서 받은 데이터를 반환
};