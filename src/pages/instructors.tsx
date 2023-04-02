import { NextPage } from "next";
import { useState } from "react";
import { api } from "~/utils/api";
import List from "~/components/list";
import { ListTypes } from "~/types/uiTypes";
import NewUserWizard from "~/components/newUserWizard";
import { Role } from "@prisma/client";

const InstructorsPage: NextPage = () => {
    const [addNewInstructor, setAddNewInstructor] = useState<boolean>(false);
    const { data: instructors, isLoading } = api.usersRouter.getAllInstructors.useQuery();
    return (
        <main className="w-full h-full py-3 flex flex-col items-center justify-center">
            <div className="flex gap-10">
                <h1>Instructor List</h1>
                <button
                    className="rounded-full bg-white/10 px-5 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
                    onClick={() => setAddNewInstructor(state => !state)}
                >
                    {addNewInstructor ? "Close" : "+New Instructor"}
                </button>
            </div>
            {addNewInstructor && <NewUserWizard userRole={Role.INSTRUCTOR} />}
            {instructors && <List data={instructors} listType={ListTypes.USERS} />}
            {isLoading && <h3>..Loading</h3>}
        </main>
    )

}

export default InstructorsPage;
