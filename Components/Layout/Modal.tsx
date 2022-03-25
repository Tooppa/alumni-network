import { useKeycloak } from "@react-keycloak/ssr"
import { KeycloakInstance } from "keycloak-js"
import { useRouter } from "next/router"
import Modal from "react-modal"
import { useQuery } from "react-query"
import { getGroup } from "../../Queries/Group"
import { getTopic } from "../../Queries/Topic"
import { GroupType, TopicType } from "../../Types/Data"
import GroupDetails from "../GroupDetails"
import TopicDetails from "../TopicDetails"
import Content from "./Content"

export default function CustomModal(){
    const router = useRouter()
    const { keycloak } = useKeycloak<KeycloakInstance>()
    const token: string | undefined = keycloak?.token

    const Detail = () => {
        if (!!router.query.idt && !!token)
            return (
                <TopicDetails topicId={Number(router.query.idt)} token={token}/>
            )
        else if (!!router.query.idg && !!token)
            return (
                <GroupDetails groupId={Number(router.query.idg)} token={token}/>
            )
        else return <></>
    }

    return (
        <Modal
            id="modal"
            isOpen={!!router.query.idg || !!router.query.idt}
            onAfterClose={() => {
                document.body.style.overflowY = "scroll"
            }}
            onAfterOpen={() => {
                document.body.style.overflowY = "hidden"
            }}
            onRequestClose={() => router.push("/")}
            ariaHideApp={false}
            style={{
                overlay: {
                    zIndex: "60",
                    backgroundColor: "rgba(31, 41, 55, 0.5)",
                },
                content: {
                    backgroundColor: "rgb(249 250 251)",
                    maxWidth: "768px",
                    position: 'absolute',
                    left: '0',
                    right: '0',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    border: "none",
                    borderRadius: "0.125rem",
                    paddingTop: "0",
                }
            }}
        >
            <Content>
                <Detail />
            </Content>
        </Modal >
    )
}