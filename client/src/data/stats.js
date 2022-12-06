import { useCallback, useEffect, useState } from 'react';
import { getStats, createLink} from '../api/index';
import { toast } from 'react-toastify';

export const useStats = () => {
  const [stats, setStats] = useState([]);
  const [createdLink, setCreatedLink] = useState({});
  const [creatingLink, setCreatingLink] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(100);

  const showError = (response) => {
    if(response.error) {
      toast.error(response.error)
    }
  }
  const useGetStats = useCallback(async (offset = 0, limit = 100) => {
    const response = await getStats(offset, limit);
    const jsonResponse = await response.json()
    setStats(jsonResponse.data || []);
    showError(jsonResponse)
  }, []);

  const create = async (body) => {
    setCreatingLink(true)
    const response = await createLink(body);
    const jsonResponse = await response.json()
    setCreatedLink(jsonResponse.data || {})
    setCreatingLink(false);
    showError(jsonResponse)
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useGetStats(offset, limit);
  }, [limit, offset, useGetStats]);

  return { stats, create, createdLink, setCreatedLink, creatingLink, offset, setOffset, limit, setLimit }
}