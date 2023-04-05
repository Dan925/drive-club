import { NextPage } from "next";
import { useState } from "react";
import { api } from "~/utils/api";
import List from "~/components/list";
import { ListTypes } from "~/types/uiTypes";
import NewUserForm from "~/components/newUserForm";
import { Role } from "@prisma/client";
import { withAuthSessionRoles } from "~/utils/withAuthSession";

const AdminsPage: NextPage = () => {

    const [addNewAdmins, setAddNewAdmins] = useState<boolean>(false);
    const { data: admins, isLoading } = api.usersRouter.getAllAdmins.useQuery();
    return (
        <>
            {addNewAdmins && <div className="fixed w-full h-full bg-bgrd-b opacity-50 z-10 flex flex-col justify-center"></div>}
            <main className="w-full h-full py-3 flex flex-col items-center gap-4">
                <div className="flex gap-10">
                    <h1>Admins List</h1>
                    <button
                        className="z-10 rounded-full bg-white/10 px-5 py-3 font-semibold text-white no-underline transition hover:bg-accent"
                        onClick={() => setAddNewAdmins(state => !state)}
                    >
                        {addNewAdmins ? "Close" : "+New Admin"}
                    </button>
                </div>
                {addNewAdmins && <NewUserForm userRole={Role.ADMIN} setOpenForm={setAddNewAdmins} />}
                {admins && <List data={admins} listType={ListTypes.USERS} userRole={Role.ADMIN} />}
                {isLoading && <h3>..Loading</h3>}
            </main>
        </>


    )
}




const getServerSideProps = withAuthSessionRoles([Role.ADMIN]);
export { getServerSideProps }

export default AdminsPage;
