import { useRouter } from "next/router"
import Modal from "react-modal"
import Content from "./Content"

export default function CustomModal({...props}){
    const router = useRouter()
    return (
        <Modal 
            isOpen={!!props.id} 
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
                }
            }}
        >
            <Content>
                {props.children}
            </Content>
        </Modal>
    )
}