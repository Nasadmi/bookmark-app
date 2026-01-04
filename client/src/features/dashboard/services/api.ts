import type { UserData } from "../types/api";

export const getUser = async (token: string) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 404) {
      return {
        message: "Not Found",
      };
    }

    const json = (await response.json()) as UserData;
    return json;
  } catch (err) {
    if (err instanceof TypeError) {
      return {
        message: "Connection refused, please try again later",
      };
    }

    console.error(err);
    return null;
  }
};
