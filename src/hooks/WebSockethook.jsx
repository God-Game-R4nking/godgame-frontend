import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { getLocalStorage } from '../utils/LocalStorageManager';

const useWebSocket = () => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [drawingData, setDrawingData] = useState([]);
  const token = getLocalStorage('token'); // 로컬 스토리지에서 토큰 가져오기
  const [websocketUrl, setWebsocketUrl] = useState(null);
  const [userId, setUserId] = useState();

  useEffect(() => {
    const authenticateAndConnect = async () => {

      try {
        const response = await axios.post('http://localhost:8080/api/authenticate', null, {
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
          },
        });
        console.log("Response123", response);
        const userId = response.data.userId;
        const websocketUrl = response.data.websocketUrl; // response.data에서 URL을 가져옴
        setWebsocketUrl(websocketUrl);
        setUserId(userId);
      } catch (error) {
        console.error('Error during authentication:', error);
      }
    };

    if (token) {
      authenticateAndConnect();
    }
  }, [token]);

  useEffect(() => {
    if (websocketUrl) {
      const ws = new WebSocket(`${websocketUrl}?userId=${userId}`);
      console.log("ws",ws)
      ws.onopen = () => {
        console.log('WebSocket Connected');
        setIsConnected(true);
      };

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        const parseMessage = JSON.parse(message);
        if (parseMessage.type === "DRAWING_DATA" || parseMessage.type === "FULL_CANVAS") {
          setDrawingData((prevData) => [...prevData, message]);
        } else if(parseMessage.type === "reset"){
          setDrawingData([]);
          setMessages((prevMessages) => [...prevMessages, message]);
        } else {
          setMessages((prevMessages) => [...prevMessages, message]);
        }
      };

      ws.onclose = () => {
        console.log('WebSocket Disconnected');
        setIsConnected(false);
      };

      setSocket(ws);

      return () => {
        ws.close();
      };
    }
  }, [websocketUrl]);

  const sendMessage = useCallback((requestBody) => {
    if (socket && isConnected) {
      const message = {
        memberId : requestBody.memberId,
        gameRoomId : requestBody.gameRoomId,
        type : requestBody.type,
        nickName : requestBody.nickName,
        content : requestBody.content
      };
      socket.send(JSON.stringify(message));
    }
  }, [socket, isConnected]);

 
  const sendDrawingData = useCallback((data) => {
    if (socket && isConnected) {
      socket.send(JSON.stringify(data));
    }
  }, [socket, isConnected]);

  return { isConnected, messages, drawingData, sendMessage, sendDrawingData};
};

export default useWebSocket;
