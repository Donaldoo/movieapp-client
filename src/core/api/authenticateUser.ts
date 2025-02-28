import { httpClient } from "../httpClient";
import { RegisterUserRequest } from "./registerUser";

export type LoginResponse = {
  token: string
  user: {
    userId: string
  }
}


export default function authenticateUser(data: RegisterUserRequest): Promise<LoginResponse> {
    return httpClient.post("auth", data)
}