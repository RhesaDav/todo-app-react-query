import { http } from "@/http";
import { AxiosResponse } from "axios";

const LOGIN_API_URL = `/api/login`;

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  try {
    const response: AxiosResponse<LoginResponse> = await http.post(LOGIN_API_URL, credentials);
    const { data } = response;
    return data;
  } catch (error) {
    throw new Error('Failed to login');
  }
}
