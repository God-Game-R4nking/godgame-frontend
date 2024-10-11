import axios from 'axios';

// 게시글 여러개 가져오기
const getRankRequest = async () => {
    const response = await axios.get("http://localhost:8080/ranking", null, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response;
};

export default getRankRequest;
