export interface UyeResponse {
  firstName: string;
  lastName: string;
  userName: string;
  gender: string;
  telephoneNo: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: string;

  id: any;
  registered?: boolean;
  expiresIn: string;
  localId: string;
  refreshToken: string;

}
