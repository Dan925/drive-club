import { useSession } from "next-auth/react"
import NavBar from "./Navbar";
type Props = {
    children?: JSX.Element | JSX.Element[]
}
const Layout = ({ children }: Props) => {
    const { data: sessionData } = useSession();
    if (sessionData) {

        return (
            <>
                <NavBar />
                {children}
            </>
        )
    }
    return <>{children}</>

}

export default Layout;
