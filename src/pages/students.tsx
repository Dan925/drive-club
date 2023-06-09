import { NextPage } from "next";
import { useState } from "react";
import { api } from "~/utils/api";
import List from "~/components/list";
import { ListTypes } from "~/types/uiTypes";
import NewUserForm from "~/components/newUserForm";
import { Role } from "@prisma/client";
import { withAuthSessionRoles } from "~/utils/withAuthSession";

const StudentsPage: NextPage = () => {
    const [addNewStudent, setAddNewStudent] = useState<boolean>(false);
    const { data: students, isLoading } = api.usersRouter.getAllStudents.useQuery();


    return (
        <>

            {addNewStudent && <div className="fixed w-full h-full bg-bgrd-b opacity-50 z-10 flex flex-col justify-center"></div>}

            <main className="w-full h-full py-3 flex flex-col items-center z-1 gap-4">
                <div className="flex gap-10">
                    <h1>Student List</h1>
                    <button
                        className="z-10 rounded-full bg-white/10 px-5 py-3 font-semibold text-white no-underline transition hover:bg-accent"
                        onClick={() => setAddNewStudent(state => !state)}
                    >
                        {addNewStudent ? "Close" : "+New Student"}
                    </button>
                </div>
                {addNewStudent && <NewUserForm userRole={Role.STUDENT} setOpenForm={setAddNewStudent} />}
                {students && <List data={students} listType={ListTypes.USERS} />}
                {isLoading && <h3>..Loading</h3>}
            </main>
        </>
    )

}

const getServerSideProps = withAuthSessionRoles([Role.ADMIN]);
export { getServerSideProps }

export default StudentsPage;
