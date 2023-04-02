import { Instructor, Student } from "@prisma/client";

type Props = {
    user: Instructor | Student;
}
const UserItem: React.FC<Props> = ({ user }) => {
    //TODO: finish user item component
    return (
        <li>
            User: {user?.id}
        </li>

    )
}

export default UserItem;
