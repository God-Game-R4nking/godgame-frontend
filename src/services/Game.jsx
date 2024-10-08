import axios from 'axios';

const createGame = async (requestBody) => {
    const based_url = process.env.REACT_APP_BACKEND_URL;
    try {
        const response = await axios.post(based_url + 'game-rooms', requestBody, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 201) {  // 방이 성공적으로 생성됨
            return response.data;  // 서버에서 받은 데이터를 반환
        }
    } catch (error) {
        if (error.response && error.response.status === 500) {
            alert("한 유저는 하나의 방만 생성해야 합니다");
        } else {
            console.error("방 생성 실패", error);
        }
    }
    return null;  // 에러 발생 시 null 반환
};


export default createGame;