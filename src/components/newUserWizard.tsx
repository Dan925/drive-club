import { Role } from "@prisma/client";


type Props = {
    userRole: Role
}
const NewUserWizard: React.FC<Props> = ({ userRole }) => {

    const title = userRole === Role.STUDENT ? "Create New Student" : "Create New Instructor"
    //TODO: Finish student wizard

    return (
        <div className="w-40 h-80 flex flex flex-col">
            <h3 >{title}</h3>
        </div>

    )
}

export default NewUserWizard;
