import axios from 'axios';

// 게임 방 참여 요청
const sendGameRoomJoinRequest = async (gameRoomId, memberId) => {
    try {
        const response = await axios.post(`http://localhost:8080/game-rooms/${gameRoomId}/join/${memberId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200 || response.status === 201) {
            console.log("성공");
            return response.data;
        }
    } catch (error) {
        console.error("실패", error);
        if (error.response && error.response.status === 409) {
            alert("참여 할 수 없습니다");
        }
        throw error;
    }
};

export default sendGameRoomJoinRequest;