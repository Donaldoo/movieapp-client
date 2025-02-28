import { httpClient } from "../httpClient"

export interface RegisterUserRequest {
  email: string
  password: string
}

export default function registerUser(data: RegisterUserRequest): Promise<string> {
    return httpClient.post("api/register", data)
}