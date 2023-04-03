import { getSession } from "next-auth/react"
import { Role } from "@prisma/client"
import { NextPageContext } from "next"

export const withAuthSessionRoles = (roles: Role[]) => {
    return async function getServerSideProps(context: NextPageContext) {
        const session = await getSession(context)
        if (!session || !roles.includes(session.user.role)) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            }
        }
        return {
            props: {}
        }
    }


}

