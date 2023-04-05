import { Role } from "@prisma/client";
import { SetStateAction } from "react";
import { Dispatch } from "react";
import { FormEventHandler, useRef, useState } from "react";
import { CreateUserType } from "~/types/uiTypes";
import { api } from "~/utils/api";
type Props = {
    userRole: Role;
    setOpenForm: Dispatch<SetStateAction<boolean>>

}
const NewUserForm: React.FC<Props> = ({ userRole, setOpenForm }) => {

    const [disabledSubmit, setDisabledSubmit] = useState<boolean>(false);
    const formRef = useRef<HTMLFormElement>(null)
    const trpcUtils = api.useContext()

    const getUserMutation = () => {

        const newStudentMutation = api.usersRouter.createStudent.useMutation({
            onSuccess: () => {
                setOpenForm(false);
                trpcUtils.usersRouter.getAllStudents.invalidate();

            }

        });


        const newInstructorMutation = api.usersRouter.createInstructor.useMutation({
            onSuccess: () => {
                setOpenForm(false);
                trpcUtils.usersRouter.getAllInstructors.invalidate();

            }
        });

        const newAdminMutation = api.usersRouter.createAdmin.useMutation({
            onSuccess: () => {
                setOpenForm(false);
                trpcUtils.usersRouter.getAllAdmins.invalidate();

            }
        });
        return { createStudent: newStudentMutation.mutate, createInstructor: newInstructorMutation.mutate, createAdmin: newAdminMutation.mutate }

    }

    const { createAdmin, createStudent, createInstructor }: ReturnType<typeof getUserMutation> = getUserMutation();




    const getTitle = () => {
        if (userRole === Role.STUDENT)
            return "Create New Student"

        else if (userRole === Role.INSTRUCTOR)
            return "Create New Instructor"
        else
            return "Create New Admin"

    }

    const createUserHandler = ({ firstName, lastName, email, phoneNumber }: CreateUserType) => {
        if (firstName && lastName && email && phoneNumber) {
            if (userRole == Role.INSTRUCTOR)
                createInstructor({ firstName, lastName, email, phoneNumber })
            else
                createStudent({ firstName, lastName, email, phoneNumber })


        }

    }
    const createAdminHandler = (email: string | undefined) => {
        if (email)
            createAdmin({ email })
    }
    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        setDisabledSubmit(true);

        if (formRef.current) {
            const formData = new FormData(formRef.current);
            if (userRole === Role.ADMIN) {
                const email = formData.get('email')?.toString();
                createAdminHandler(email);
            } else {

                const firstName = formData.get('firstName')?.toString();
                const lastName = formData.get('lastName')?.toString();
                const email = formData.get('email')?.toString();
                const phoneNumber = formData.get('phoneNumber')?.toString();
                createUserHandler({ firstName, lastName, email, phoneNumber })
            }
        }

    }
    return (
        <div className="fixed top-56 rounded-md w-180 h-fit flex flex flex-col justify-center gap-4 z-20 bg-gray items-center p-3">
            <h2 className="text-3xl font-bold ">{getTitle()}</h2>
            <form action="#" className="flex flex-col gap-3" onSubmit={handleSubmit} ref={formRef}>
                {userRole === Role.ADMIN ?

                    <input className="p-3 rounded-lg text-bgrd-b" type="email" placeholder="Email" name="email" required />
                    :
                    <>
                        <input className="p-3 rounded-lg text-bgrd-b" type="text" placeholder="First Name" name="firstName" required />
                        <input className="p-3 rounded-lg text-bgrd-b" type="text" placeholder="Last Name" name="lastName" required />
                        <input className="p-3 rounded-lg text-bgrd-b" type="email" placeholder="Email" name="email" required />
                        <input className="p-3 rounded-lg text-bgrd-b" type="tel" placeholder="xxx-xxx-xxxx" name="phoneNumber" required pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />

                    </>
                }
                <input className="rounded-lg bg-bgrd-b px-10 py-3 font-semibold text-white no-underline transition hover:bg-accent hover:cursor-pointer" type="submit" disabled={disabledSubmit} />


            </form>
        </div>

    )
}

export default NewUserForm;
