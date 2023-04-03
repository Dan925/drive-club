import { Lesson } from "@prisma/client";

type Props = {
    lesson: Lesson;
}
const LessonItem: React.FC<Props> = ({ lesson }) => {
    //TODO: finish lesson item component
    return (
        <li>
            Lesson: {lesson?.id}
        </li>

    )
}

export default LessonItem;
