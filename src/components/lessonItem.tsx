import { Role } from "@prisma/client";
import LessonLocationForm from "./lessonLocationForm";
import { api } from "~/utils/api";
import formatRelative from 'date-fns/formatRelative'
import formatDistance from 'date-fns/formatDistance'
import { useState } from "react";
import { useSession } from "next-auth/react";
import { UILesson } from "~/types/uiTypes";

type Props = {
    lesson: UILesson;
}
const LessonItem: React.FC<Props> = ({ lesson }) => {
    const [openBookingForm, setOpenBookingForm] = useState<boolean>(false)
    const [disabledCancelBtn, setDisabledCancelBtn] = useState<boolean>(false)
    const [disabledDeleteBtn, setDisabledDeleteBtn] = useState<boolean>(false)
    const { data: sessionData } = useSession()
    const trpcUtils = api.useContext()
    const canBookLesson = sessionData?.user.role === Role.STUDENT
    const canDeleteLesson = sessionData?.user.role !== Role.STUDENT && !lesson.booked

    const canSeeLessonInstructor = lesson.instructor && (canBookLesson || sessionData?.user.role === Role.ADMIN);
    const canSeeLessonStudent = lesson.student && (sessionData?.user.role === Role.INSTRUCTOR || sessionData?.user.role === Role.ADMIN);

    const canCancelLesson = !lesson.canceled && lesson.booked && (sessionData?.user.role === Role.ADMIN || sessionData?.user.id === lesson.instructor?.userId || sessionData?.user.id === lesson.student?.userId);
    const { mutate: cancelLessonById } = api.lessonsRouter.cancelLessonById.useMutation({
        onSuccess: async () => {
            await trpcUtils.lessonsRouter.getUserLessons.invalidate()
            setDisabledCancelBtn(false);
        }
    })

    const { mutate: deleteLessonById } = api.lessonsRouter.deleteLessonById.useMutation({
        onSuccess: async () => {
            await trpcUtils.lessonsRouter.getUserLessons.invalidate()
            setDisabledCancelBtn(false);
        }
    })

    const handleCancelLesson = () => {
        setDisabledCancelBtn(true)
        cancelLessonById({ lessonId: lesson.id })
    }

    const handleDeleteLesson = () => {
        setDisabledDeleteBtn(true)
        deleteLessonById({ lessonId: lesson.id })
    }
    return (
        <>
            {canBookLesson && openBookingForm && <div className="fixed w-full h-full bg-bgrd-b opacity-50 z-10 flex flex-col justify-center"></div>}
            <div className="flex flex-col bg-white/10 w-[500px] h-fit justify-between rounded drop-shadow-xl  p-5">
                <span className="flex">
                    <p className="font-bold">When: </p>
                    {formatRelative(lesson.startAt, new Date())}
                </span>
                <span className="flex">
                    <p className="font-bold"> Duration: </p>
                    {formatDistance(lesson.endAt, lesson.startAt)}
                </span>
                {lesson.booked &&
                    <>
                        <div className="w-full h-1 bg-accent"></div>
                        <span className="flex w-full">
                            <p className="font-bold"> Pick Up Location:</p>
                            {lesson.pickUpLocation}
                        </span>
                        <span className="flex">
                            <p className="font-bold"> Drop Off Location:</p>
                            {lesson.dropOffLocation}
                        </span>
                    </>
                }
                {canSeeLessonInstructor &&
                    <>
                        <div className="w-full h-1 bg-accent"></div>
                        <h3 className="text-lg">Instructor</h3>
                        <div className="w-full h-1 bg-accent"></div>
                        <p>First Name: {lesson.instructor.firstName}</p>
                        <p>Last Name: {lesson.instructor.lastName}</p>
                        <p>Phone Number: {lesson.instructor.phoneNumber}</p>
                    </>
                }
                {canSeeLessonStudent &&
                    <>
                        <div className="w-full h-1 bg-accent"></div>
                        <h3 className="text-lg">Booked by: </h3>
                        <div className="w-full h-1 bg-accent"></div>
                        <p>First Name: {lesson.student.firstName}</p>
                        <p>Last Name: {lesson.student.lastName}</p>
                        <p>Phone Number: {lesson.student.phoneNumber}</p>
                    </>
                }
                <div className="flex w-full gap-3">

                    {
                        canBookLesson && !lesson.booked &&
                        <button
                            className="rounded-full bg-white/10 px-5 py-3 font-semibold text-white no-underline transition hover:bg-accent"
                            onClick={() => setOpenBookingForm(true)}

                        >
                            Book Lesson
                        </button>
                    }

                    {
                        canCancelLesson &&
                        <button
                            className="rounded-full bg-white/10 px-5 py-3 font-semibold text-white no-underline transition hover:bg-accent"
                            disabled={disabledCancelBtn}
                            onClick={handleCancelLesson}
                        >
                            Cancel Lesson
                        </button>
                    }
                    {
                        canDeleteLesson &&
                        <button
                            className="rounded-full bg-white/10 px-5 py-3 font-semibold text-white no-underline transition hover:bg-accent"
                            disabled={disabledDeleteBtn}
                            onClick={handleDeleteLesson}
                        >
                            Delete Lesson
                        </button>
                    }
                    {lesson.canceled &&

                        <p>Status: Canceled</p>

                    }
                </div>
            </div>

            {openBookingForm && <LessonLocationForm setOpenForm={setOpenBookingForm} lessonId={lesson.id} />}
        </>
    )
}

export default LessonItem;
