
import { useState } from "react"
import { api } from "~/utils/api"
import { User } from "@prisma/client"
type Props = {
    user: User
}
const AdminItem: React.FC<Props> = ({ user }) => {

    const [disabledDeleteBtn, setDisabledDeleteBtn] = useState<boolean>(false)
    const trpcUtils = api.useContext()


    const { mutate } = api.usersRouter.deleteUserById.useMutation({
        onSuccess: () => {
            trpcUtils.usersRouter.getAllAdmins.invalidate()
            setDisabledDeleteBtn(false);
        }
    })

    const handleDeleteUser = () => {
        setDisabledDeleteBtn(true)
        const response = window.confirm("You are about to delete this user account, are you sure you want to go through with this action?")
        if (response) {
            mutate({ userId: user.id })
        }
    }
    return (

        <div className="flex flex-col bg-white/10 w-[500px] h-fit gap-2 rounded drop-shadow-xl font-bold p-5">
            <p>email: {user.email}</p>
            <div className="flex w-full gap-3">

                <button
                    className="rounded-full bg-white/10 px-5 py-3 font-semibold text-white no-underline transition hover:bg-accent"
                    disabled={disabledDeleteBtn}
                    onClick={handleDeleteUser}
                >
                    Delete User
                </button>
            </div>
        </div>
    )

}
export default AdminItem;
