import { Role } from "@prisma/client";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import List from "~/components/list";
import { api } from "~/utils/api";
import { useState } from "react";
import { ListTypes } from "~/types/uiTypes";
import NewLessonForm from "~/components/newLessonForm";
import { withAuthSessionRoles } from "~/utils/withAuthSession";

const LessonsPage: NextPage = () => {

    const { data: sessionData } = useSession()
    const [addNewLesson, setAddNewLesson] = useState<boolean>(false);
    const { data: userLessons, isLoading } = api.lessonsRouter.getUserLessons.useQuery()

    const canCreateLessons = sessionData?.user.role === Role.INSTRUCTOR

    return (
        <>

            {canCreateLessons && addNewLesson && <div className="fixed w-full h-full bg-bgrd-b opacity-50 z-10 flex flex-col justify-center"></div>}

            <main className="w-full h-full py-3 flex flex-col items-center z-1 gap-5">
                <div className="flex gap-10">
                    <h1>Lessons List</h1>
                    {canCreateLessons &&

                        <button
                            className="z-10 rounded-full bg-white/10 px-5 py-3 font-semibold text-white no-underline transition hover:bg-accent"
                            onClick={() => setAddNewLesson(state => !state)}
                        >
                            {addNewLesson ? "Close" : "+New Lesson"}
                        </button>

                    }
                    {canCreateLessons && addNewLesson && <NewLessonForm setOpenForm={setAddNewLesson} />}



                </div>
                {userLessons && <List data={userLessons} listType={ListTypes.LESSONS} />}
                {isLoading && <h3>..Loading</h3>}
            </main>
        </>
    )
}

const getServerSideProps = withAuthSessionRoles([Role.ADMIN, Role.INSTRUCTOR, Role.STUDENT]);
export { getServerSideProps }

export default LessonsPage;
