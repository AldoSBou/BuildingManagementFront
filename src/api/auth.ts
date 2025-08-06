import client from './client';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  type: string | null;
  userId: number;
  name: string;
  email: string;
  role: string;
  buildingId: number | null;
  expiresIn: number;
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const res = await client.post<{ success: boolean; data: LoginResponse }>('auth/login', payload);
  return res.data.data;
}

export async function refreshTokenRequest() {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) throw new Error('No refresh token disponible');

  const res = await client.post('/auth/refresh-token', { refreshToken });
  return res.data.data;
}