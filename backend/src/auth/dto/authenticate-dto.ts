export class LoginDto {
  email: string;
  password: string;
}

export class RegisterDto {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}
