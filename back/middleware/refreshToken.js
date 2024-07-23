const refreshToken = async () => {
  try {
    const response = await fetch(
      'http://localhost:5000/auth/refresh-token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken:
            localStorage.getItem('refreshToken'),
        }),
      },
    )

    const data = await response.json()
    if (response.ok) {
      localStorage.setItem('token', data.accessToken)
      return data.accessToken
    } else {
      setError('Не удалось обновить токен')
    }
  } catch (error) {
    setError('Не удалось обновить токен')
  }
  return null
}
