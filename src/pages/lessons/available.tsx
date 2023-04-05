import { NextPage } from "next";
import { withAuthSessionRoles } from "~/utils/withAuthSession";
import { Role } from "@prisma/client";
import List from "~/components/list";
import { api } from "~/utils/api";
import { ListTypes, UILesson } from "~/types/uiTypes";

const OpenLessons: NextPage = () => {
    const { data: openLessons, isLoading } = api.lessonsRouter.getAvailableLessons.useQuery()
    return (
        <main className="w-full h-full py-3 flex flex-col items-center z-1">
            <h1>Open Lessons List</h1>
            {isLoading && "Loading..."}
            {openLessons && <List listType={ListTypes.LESSONS} data={openLessons as UILesson[]} />}

        </main>

    )

}

const getServerSideProps = withAuthSessionRoles([Role.STUDENT]);
export { getServerSideProps }

export default OpenLessons;
