export interface LoginDto {
    email: string;
    password: string;
  }
  
  export interface RegisterDto {
    email: string;
    password: string;
    name?: string;
  }
  
  export interface SSOLoginDto {
    email: string;
  }
  
  export interface TokenPayload {
    userId: number;
    email: string;
  }