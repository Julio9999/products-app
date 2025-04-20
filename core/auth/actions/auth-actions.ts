import { productsApi } from "../../api/productsApi";
import { User } from "../interface/user";

export interface AuthResponse {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
  token: string;
}

const returnUserToken = (data: AuthResponse): { user: User; token: string } => {

  const { token, ...user } = data;

  return {
    user,
    token,
  };
};


export const authLogin = async (email: string, password: string) => {
    email = email.toLowerCase();

    try {
        const {data} = await productsApi.post<AuthResponse>('/auth/login', {
            email, password
        });

        return returnUserToken(data)
    } catch (error) {
        console.log(error);
        // throw new Error('User and/or password not valid')
        return null;
    }
}

export const authCheckStatus = async () => {

    try {
        
        const { data } = await productsApi.get('/auth/check-status');
        return returnUserToken(data);

    } catch (error) {
        return null;
    }

}

interface Params {
    fullName: string;
    email: string;
    password: string;
}
export const authRegister = async ({fullName, email, password}: Params) => {

    try {
        const resp = await productsApi.post('/auth/register', {
            fullName,
            email,
            password
        })

        return resp

    } catch(error){
        console.log(error)
        return null;
    }
}


