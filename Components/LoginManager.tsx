import { useKeycloak } from "@react-keycloak/ssr"
import { KeycloakInstance } from "keycloak-js"
import { useQuery } from "react-query"
import { login } from "../Queries/User"

const LoginManager = () =>{
    const { keycloak } = useKeycloak<KeycloakInstance>()
    const token: string | undefined = keycloak?.token
    useQuery('login', () => login(token), { enabled: !!token })
    return <></>
}

export default LoginManager