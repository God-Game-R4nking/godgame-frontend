import { useState } from 'react';
import getMemberRequest from "../services/GetMember";
import { getLocalStorage, setLocalStorage } from '../utils/LocalStorageManager';

export const useMember = () => {
  const [member, setMember] = useState(getLocalStorage('member') ? JSON.parse(getLocalStorage('member')) : null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMember = async () => {
    if (!member) {
      try {
        setLoading(true);
        const response = await getMemberRequest();
        setMember(response.data);
        setLocalStorage('member', JSON.stringify(response.data));
        setLoading(false);
      } catch (err) {
        setError("서버 에러입니다");
        setLoading(false);
      }
    }
  };

  return { member, loading, error, fetchMember };
};