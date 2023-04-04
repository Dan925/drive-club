import { Lesson, Role } from "@prisma/client";
import LessonLocationForm from "./lessonLocationForm";
import { api } from "~/utils/api";
import formatRelative from 'date-fns/formatRelative'
import formatDistance from 'date-fns/formatDistance'
import { useState } from "react";
import { useSession } from "next-auth/react";

type Props = {
    lesson: Lesson;
}
const LessonItem: React.FC<Props> = ({ lesson }) => {
    const [openBookingForm, setOpenBookingForm] = useState<boolean>(false)
    const [disabledCancelBtn, setDisabledCancelBtn] = useState<boolean>(false)
    const { data: sessionData } = useSession()
    const trpcUtils = api.useContext()
    const canBookLesson = sessionData?.user.role === Role.STUDENT;
    const canCancelLesson = !lesson.canceled;
    const { mutate } = api.lessonsRouter.cancelLessonById.useMutation({
        onSuccess: () => {
            trpcUtils.lessonsRouter.getUserLessons.invalidate()
            setDisabledCancelBtn(false);
        }
    })

    const handleCancelLesson = () => {
        setDisabledCancelBtn(true)
        mutate({ lessonId: lesson.id })
    }

    return (
        <>
            {canBookLesson && openBookingForm && <div className="fixed w-full h-full bg-bgrd-b opacity-50 z-10 flex flex-col justify-center"></div>}
            <div className="flex flex-col bg-white/10 w-[500px] h-[200px] justify-between rounded drop-shadow-xl font-bold p-5">
                <p>Starts At: {formatRelative(lesson.startAt, new Date())}</p>
                <p>Duration: {formatDistance(lesson.endAt, lesson.startAt)}</p>
                <div className="flex w-full gap-3">

                    {
                        canBookLesson &&
                        <button
                            className="rounded-full bg-white/10 px-5 py-3 font-semibold text-white no-underline transition hover:bg-accent"
                            onClick={() => setOpenBookingForm(true)}

                        >
                            Book Lesson
                        </button>
                    }

                    {
                        canCancelLesson ?
                            <button
                                className="rounded-full bg-white/10 px-5 py-3 font-semibold text-white no-underline transition hover:bg-accent"
                                disabled={disabledCancelBtn}
                                onClick={handleCancelLesson}
                            >
                                Cancel Lesson
                            </button>
                            :
                            <p>Status: Canceled</p>
                    }
                </div>
            </div>

            {openBookingForm && <LessonLocationForm setOpenForm={setOpenBookingForm} lessonId={lesson.id} />}
        </>
    )
}

export default LessonItem;
