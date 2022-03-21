import { useRouter } from "next/router"
import Modal from "react-modal"
import Content from "./Content"

export default function CustomModal({...props}){
    const router = useRouter()
    return (
        <Modal 
            isOpen={!!router.query.id} 
            onRequestClose={() => router.push("/")} 
            ariaHideApp={false}
            style={{
                overlay: {
                    zIndex: "60",
                    backgroundColor: "rgb(31 41 55 0)"
                },
                content: {
                    backgroundColor: "rgb(249 250 251)"
                }
            }}
        >
            <Content>
                {props.children}
            </Content>
        </Modal>
    )
}