import { useKeycloak } from "@react-keycloak/ssr"
import { KeycloakInstance } from "keycloak-js"
import { useRouter } from "next/router"
import { useQuery } from "react-query"
import { login } from "../Queries/User"

const LoginManager = () =>{
    const { keycloak } = useKeycloak<KeycloakInstance>()
    const token: string | undefined = keycloak?.token
    const router = useRouter()
    const {status} = useQuery('login', () => login(token), { 
        enabled: !!token, 
        onError: () => router.reload()
    })

    return <></>
}

export default LoginManager