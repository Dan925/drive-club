import { Role } from "@prisma/client"
import { GetServerSidePropsContext } from "next"
import { getServerAuthSession } from "~/server/auth"

export const withAuthSessionRoles = (roles: Role[]) => {
    return async function getServerSideProps(context: GetServerSidePropsContext) {
        const pageContext = { req: context.req, res: context.res }
        const session = await getServerAuthSession(pageContext)
        console.log("session fetched: ", session)
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

