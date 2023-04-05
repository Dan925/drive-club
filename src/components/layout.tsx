import { useSession } from "next-auth/react"
import NavBar from "./Navbar";
type Props = {
    children?: JSX.Element | JSX.Element[]
}

import { Fira_Code } from "next/font/google"

const fira_code = Fira_Code({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-fira-code"
})

const Layout = ({ children }: Props) => {
    const { data: sessionData } = useSession();
    if (sessionData) {

        return (
            <div className={`${fira_code.variable} h-screen font-firaCode`}>
                <NavBar />
                {children}
            </div>
        )
    }
    return <main className={`${fira_code.variable} font-firaCode`}>{children}</main>

}

export default Layout;
