import ms, { type StringValue } from "ms"

export const getCookie = (name: string) => {
  const match = document.cookie.match(new RegExp('(^| )'+ name + '=([^;]+)'))
  return match ? match[2] : null
}

export const setCookie = (name: string, value?: string, time?: StringValue) => {
  let expires = '';

  if (time) {
    const milliseconds = ms(time);
    const date = new Date();
    date.setTime(date.getTime() + milliseconds)
    expires = '; expires=' + date.toUTCString()
  }

  document.cookie = `${name}=${value || ''}${expires}; path=/; SameSite=Lax`
}