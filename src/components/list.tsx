
import { ListTypes, UserProfile, UILesson } from "~/types/uiTypes"
import LessonItem from "./lessonItem"
import UserItem from "./userItem"



type Props = {
    data: UserProfile[] | UILesson[],
    listType: ListTypes
}
const List: React.FC<Props> = ({ data, listType }) => {

    return (

        <ul className="w-3/4 h-full flex flex-col gap-3 items-center">
            {
                data.map((element, index) => {
                    if (listType === ListTypes.USERS)
                        return <UserItem key={index} user={element as UserProfile} />
                    return <LessonItem key={index} lesson={element as UILesson} />


                })
            }

        </ul>

    )
}

export default List;
