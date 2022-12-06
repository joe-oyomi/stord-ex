const baseUrl = process.env.REACT_APP_BACKEND_URL;

export const getStats = (offset=0, limit=100) => {
  const url = `${baseUrl}/stats?offset=${offset}&limit=${limit}`
  return fetch(url,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
  })
}

export const createLink = (body) => {
  const url = `${baseUrl}/shorten`
  return fetch(url,
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    });
}