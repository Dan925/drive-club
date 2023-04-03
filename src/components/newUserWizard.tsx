import { Role } from "@prisma/client";
import { SetStateAction } from "react";
import { Dispatch } from "react";
import { FormEventHandler, useRef, useState } from "react";
import { api } from "~/utils/api";
type Props = {
    userRole: Role;
    setOpenWizard: Dispatch<SetStateAction<boolean>>

}
const NewUserWizard: React.FC<Props> = ({ userRole, setOpenWizard }) => {

    const [disabledSubmit, setDisabledSubmit] = useState<boolean>(false);
    const formRef = useRef<HTMLFormElement>(null)
    const trpcUtils = api.useContext()

    const getUserMutation = () => {
        if (userRole === Role.STUDENT) {
            return api.usersRouter.createStudent.useMutation({
                onSuccess: () => {
                    setOpenWizard(false);
                    trpcUtils.usersRouter.getAllStudents.invalidate();

                }

            });


        }
        return api.usersRouter.createInstructor.useMutation({
            onSuccess: () => {
                setOpenWizard(false);
                trpcUtils.usersRouter.getAllInstructors.invalidate();

            }
        });

    }

    const { mutate, error } = getUserMutation();




    const title = userRole === Role.STUDENT ? "Create New Student" : "Create New Instructor"


    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        setDisabledSubmit(true);

        if (formRef.current) {
            const formData = new FormData(formRef.current);
            const firstName = formData.get('firstName')?.toString();
            const lastName = formData.get('lastName')?.toString();
            const email = formData.get('email')?.toString();
            const phoneNumber = formData.get('phoneNumber')?.toString();
            if (firstName && lastName && email && phoneNumber)
                mutate({ firstName, lastName, email, phoneNumber })
        }

    }
    return (
        <div className="fixed top-56 rounded-md w-180 h-2/3 flex flex flex-col justify-center gap-4 z-20 bg-gray items-center p-3">
            <h2 className="text-3xl font-bold ">{title}</h2>
            <form action="#" className="flex flex-col gap-3" onSubmit={handleSubmit} ref={formRef}>
                <input className="p-3 rounded-lg text-bgrd-b" type="text" placeholder="First Name" name="firstName" required />
                <input className="p-3 rounded-lg text-bgrd-b" type="text" placeholder="Last Name" name="lastName" required />
                <input className="p-3 rounded-lg text-bgrd-b" type="email" placeholder="Email" name="email" required />
                <input className="p-3 rounded-lg text-bgrd-b" type="tel" placeholder="xxx-xxx-xxxx" name="phoneNumber" required pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />

                <input className="rounded-lg bg-bgrd-b px-10 py-3 font-semibold text-white no-underline transition hover:bg-accent hover:cursor-pointer" type="submit" disabled={disabledSubmit} />
                {error && error.message}

            </form>
        </div>

    )
}

export default NewUserWizard;
