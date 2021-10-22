import axios from "axios";

// receber code via string
// recuperar access_token no gh
// verificar se o user existe
//  sim = gerar token
//  nao = cria e gera um token
// fim retornar token com infos do user log

interface IAccessTokenResponse {
    access_token: string
}
interface IUserResponse{
    avatar_url: string,
    login: string,
    id: number,
    name: string
}

class AuthenticateUserService{
 async execute(code: string){
    const url = "https/github.com/login/oauth/access_token";

    const {data: accessTokenResponse} = await axios.post<IAccessTokenResponse>(url, null,{
        params:{
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code,
            
        },
        headers:{
            "Accept": "aplication/json",
        },
    });
    const response = await axios.get<IAccessTokenResponse>("https://api.github.com/user", {
        headers:{
            authorization: `Bearer ${accessTokenResponse.access_token}`,
        },
    });

    return response.data;

 }
}

export { AuthenticateUserService }