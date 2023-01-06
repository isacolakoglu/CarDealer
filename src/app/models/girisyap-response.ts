export interface GirisyapResponse {
  email: string;
  password: string;


  idToken: string;

  id: any;
  registered?: boolean;
  expiresIn: string;
  localId: string;
  refreshToken: string;
}
