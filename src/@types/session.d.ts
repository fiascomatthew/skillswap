import session from 'express-session';

declare module 'express-session' {
  export interface SessionData {
    connectedUser: {
      id: number;
      firstname: string;
      image: string | undefined;
    };
  }
}
