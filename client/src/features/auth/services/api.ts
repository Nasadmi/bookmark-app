export const login = async ({ email, password }: { email:string, password: string }) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (response.status === 401) {
      return {
        message: 'Unauthorized'
      }
    }

    const json = await response.json() as { token: string }
    return {
      token: json.token
    }
  } catch (err) {
    if (err instanceof TypeError) {
      return {
        message: 'Connection refused, please try again later'
      }
    }

    console.error(err);
    return null
  }
}

export const register = async ({ email, password }: { email:string, password: string }) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (response.status === 409) {
      return {
        message: 'User already exists, try to log in'
      }
    }

    return 'Created'
  } catch (err) {
    if (err instanceof TypeError) {
      return {
        message: 'Connection refused, please try again later'
      }
    }

    console.error(err);
    return null
  }
}