export type User = {
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    token?: string;
  };
  
  export type LoginCredentials = {
    email: string;
    password: string;
  };
  
  export type RegisterCredentials = {
    name: string;
    email: string;
    password: string;
    role?: 'user' | 'admin';
  };
  