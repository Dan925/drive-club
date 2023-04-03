import { NextPage } from "next";
import { withAuthSessionRoles } from "~/utils/withAuthSession";
import { Role } from "@prisma/client";

const OpenLessons: NextPage = () => {

    return (
        <main className="w-full h-full py-3 flex flex-col items-center z-1">
            <h1>Open Lessons List</h1>

        </main>

    )

}

const getServerSideProps = withAuthSessionRoles([Role.STUDENT]);
export { getServerSideProps }

export default OpenLessons;
