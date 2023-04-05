
import { ListTypes, UserProfile, UILesson } from "~/types/uiTypes"
import LessonItem from "./lessonItem"
import UserItem from "./userItem"
import { Role, User } from "@prisma/client"
import AdminItem from "./adminItem"


type Props = {
    userRole: Role;
    data: UserProfile[] | User[] | UILesson[];
    listType: ListTypes
}
const List: React.FC<Props> = ({ userRole, data, listType }) => {

    return (

        <ul className="w-3/4 h-full flex flex-col gap-3 items-center">
            {
                data.map((element, index) => {
                    if (listType === ListTypes.USERS) {
                        if (userRole === Role.ADMIN)
                            return <AdminItem key={index} user={element as User} />
                        return <UserItem key={index} user={element as UserProfile} />
                    }
                    return <LessonItem key={index} lesson={element as UILesson} />


                })
            }

        </ul>

    )
}

export default List;
