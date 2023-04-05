import { NextPage } from "next";
import { useState } from "react";
import { api } from "~/utils/api";
import List from "~/components/list";
import { ListTypes } from "~/types/uiTypes";
import NewUserForm from "~/components/newUserForm";
import { Role } from "@prisma/client";
import { withAuthSessionRoles } from "~/utils/withAuthSession";
const InstructorsPage: NextPage = () => {
    const [addNewInstructor, setAddNewInstructor] = useState<boolean>(false);
    const { data: instructors, isLoading } = api.usersRouter.getAllInstructors.useQuery();
    return (
        <>
            {addNewInstructor && <div className="fixed w-full h-full bg-bgrd-b opacity-50 z-10 flex flex-col justify-center"></div>}
            <main className="w-full h-full py-3 flex flex-col items-center gap-4">
                <div className="flex gap-10">
                    <h1>Instructor List</h1>
                    <button
                        className="z-10 rounded-full bg-white/10 px-5 py-3 font-semibold text-white no-underline transition hover:bg-accent"
                        onClick={() => setAddNewInstructor(state => !state)}
                    >
                        {addNewInstructor ? "Close" : "+New Instructor"}
                    </button>
                </div>
                {addNewInstructor && <NewUserForm userRole={Role.INSTRUCTOR} setOpenForm={setAddNewInstructor} />}
                {instructors && <List data={instructors} listType={ListTypes.USERS} />}
                {isLoading && <h3>..Loading</h3>}
            </main>
        </>
    )

}
const getServerSideProps = withAuthSessionRoles([Role.ADMIN]);
export { getServerSideProps }
export default InstructorsPage;
