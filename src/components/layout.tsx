import { useSession } from "next-auth/react"
import NavBar from "./Navbar";
type Props = {
    children?: JSX.Element | JSX.Element[]
}
const Layout = ({ children }: Props) => {
    const { data: sessionData } = useSession();
    if (sessionData) {

        return (
            <div className="h-screen font-firaCode">
                <NavBar />
                {children}
            </div>
        )
    }
    return <>{children}</>

}

export default Layout;
