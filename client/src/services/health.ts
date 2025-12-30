export const apiHealth = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/health`)
    if (response.status === 503) {
      return false
    } else {
      return true
    }
  } catch (err) {
    return false;
  }
}