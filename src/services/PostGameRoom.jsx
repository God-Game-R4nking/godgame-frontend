import axios from 'axios';

//게임 방 생성 요청
const sendGameRoomRequest = async (requestBody) => {
    try {
        const response = await axios.post('http://localhost:8080/game-rooms', requestBody, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200 || response.status === 201){
            console.log("성공");
        }
    }catch(error) {
        console.error("실패", error);
        if(error.response.status === 409){
            alert("이미 있는 회원입니다");
        }
    }
};

export default sendGameRoomRequest;
