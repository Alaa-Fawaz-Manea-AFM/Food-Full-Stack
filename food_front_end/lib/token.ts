import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { AxiosServer } from "./axios-server";

interface CustomJwtPayload extends jwt.JwtPayload {
  userId: string;
}

export const getToken = () => {
  const token = getCookie();

  if (!token) {
    try {
      AxiosServer("get", "auth/refresh");
    } catch {
      window.location.href = "/login";
    }
    return getCookie();
  } else {
    return token;
  }
};

const getCookie = async () => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("accessToken0");

  return token;
};

export const getUserId = async () => {
  const cookieStore = await cookies();

  const token = cookieStore.get("accessToken")?.value;

  if (!token) return true;

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!,
    ) as CustomJwtPayload;

    return decoded?.userId;
  } catch {
    return true;
  }
};
