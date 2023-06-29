const BASE_URL = 'https://auth.nomoreparties.co';

function getResponseData(res, setErrorMessage) {
  if (!res.ok) {
    //получаем ответ от сервера с текстом ошибки, чтобы передать его в попап
    res.text().then((text) => {
      setErrorMessage(JSON.parse(text).message || JSON.parse(text).error);
    });
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

async function request(url, options, setErrorMessage) {
  const res = await fetch(`${BASE_URL}${url}`, options);
  return getResponseData(res, setErrorMessage);
}

export function register(email, password, setErrorMessageRegister) {
  return request(
    '/signup',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    },
    setErrorMessageRegister
  );
}

export function login(email, password, setErrorMessageLogin) {
  return request(
    '/signin',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    },
    setErrorMessageLogin
  ).then((data) => {
    if (data.token) {
      localStorage.setItem('token', data.token);
      return data;
    }
  });
}

export function getContent(token) {
  return request('/users/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}
