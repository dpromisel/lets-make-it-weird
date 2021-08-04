import Cookies from "cookies-ts";
const cookies = new Cookies();

// export const backendEndpoint = "http://localhost:3000/";
export const backendEndpoint =
  "https://v5nauyw95l.execute-api.us-east-1.amazonaws.com/Prod/";
export const setTempStorage = (key: string, value: any) => {
  return cookies.set(key, value);
};

export const getTempStorage = (key: string) => {
  return cookies.get(key);
};
