import { Role } from "@prisma/client";
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router";
const NavBar: React.FC = () => {
    const router = useRouter();
    const currentRoute = router.pathname;
    const { data: sessionData } = useSession();
    const linkClass = (path: string) => path === currentRoute ? "text-accent" : "text-gray";
    const navLinks = [
        {
            path: '/lessons',
            title: 'My Lessons',
            adminOnly: false,
            adminTitle: "All Lessons",
            studentsOnly: false,
        },
        {
            path: '/lessons/available',
            title: 'Open Lessons',
            adminOnly: false,
            studentsOnly: true,
        },

        {
            path: '/students',
            title: 'Students',
            adminOnly: true,
            studentsOnly: false,

        },
        {
            path: '/instructors',
            title: 'Instructors',
            adminOnly: true,
            studentsOnly: false,
        },
    ]

    return (
        <div className="w-full h-20 bg-bgrd-b flex justify-between items-center p-6">
            <h1>Drive Club</h1>
            <ul className="flex gap-7">
                {
                    navLinks.map(({ path, adminTitle, title, adminOnly, studentsOnly }, index) => {
                        if (adminOnly) {
                            if (sessionData && sessionData.user?.role === Role.ADMIN)
                                return (
                                    <li key={index}>
                                        <Link href={path} className={linkClass(path)}>{adminTitle ?? title}</Link>

                                    </li>
                                )
                        } else if (studentsOnly) {

                            if (sessionData && sessionData.user?.role === Role.STUDENT) {
                                return (
                                    <li key={index}>
                                        <Link href={path} className={linkClass(path)}>{adminTitle ?? title}</Link>

                                    </li>
                                )

                            }
                        }
                        else {

                            return (
                                <li key={index}>
                                    <Link href={path} className={linkClass(path)}>{adminTitle ?? title}</Link>

                                </li>
                            )
                        }
                    })
                }
                <li>
                    <button
                        className="rounded-full bg-white/10 px-10 py-1 font-semibold text-white no-underline transition hover:bg-accent"
                        onClick={() => signOut()}
                    >
                        Sign Out
                    </button>

                </li>

            </ul>

        </div>
    )
}

export default NavBar;
