import { NextRouter } from 'next/router';
import apiClient from '@/apiClient';
import { AuthResponse } from '@/types';

export const login = async (
  email: string,
  password: string,
  router: NextRouter
) => {
  try {
    const response = await apiClient.post<AuthResponse>('/auth/login', {
      email,
      password,
    });

    const { User, accessToken } = response.data;
    localStorage.setItem('User', JSON.stringify(User));
    localStorage.setItem('accessToken', accessToken);
    router.push('/add-meal');
  } catch (error) {
    console.error(error);
  }
};