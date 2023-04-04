
import { ListTypes } from "~/types/uiTypes"
import LessonItem from "./lessonItem"
import UserItem from "./userItem"

import { Instructor, Student, Lesson } from "@prisma/client"

type Props = {
    data: Instructor[] | Student[] | Lesson[],
    listType: ListTypes
}
const List: React.FC<Props> = ({ data, listType }) => {

    return (

        <ul className="w-3/4 h-full flex flex-col items-center">
            {
                data.map((element, index) => {
                    if (listType === ListTypes.USERS)
                        return <UserItem key={index} user={element as Student | Instructor} />
                    return <LessonItem key={index} lesson={element as Lesson} />


                })
            }

        </ul>

    )
}

export default List;
