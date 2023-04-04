import { Dispatch, SetStateAction, useState } from "react"
import { api } from "~/utils/api";
import { FormEventHandler } from "react";
import AddressInput from "./addressInput";

type Props = {
    setOpenForm: Dispatch<SetStateAction<boolean>>
    lessonId: string
}
const LessonLocationForm: React.FC<Props> = ({ setOpenForm, lessonId }) => {

    const [disabledSubmit, setDisabledSubmit] = useState<boolean>(false);
    const [pickUpLocation, setPickUpLocation] = useState<string>("")
    const [dropOffLocation, setDropOffLocation] = useState<string>("")

    const trpcUtils = api.useContext()

    const { mutate, error } = api.lessonsRouter.bookLessonById.useMutation({
        onSuccess: () => {
            setOpenForm(false);
            trpcUtils.lessonsRouter.getUserLessons.invalidate();

        }
    });


    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        setDisabledSubmit(true);

        if (pickUpLocation && dropOffLocation)
            mutate({ lessonId, pickUpLocation, dropOffLocation })

    }


    return (
        <div className="fixed top-56 rounded-md w-[300px] h-[300px] flex flex flex-col justify-center gap-4 z-20 bg-gray items-center p-3">
            <h2 className="text-3xl font-bold ">Book Lesson</h2>
            <form action="#" className="flex flex-col gap-3 w-full" onSubmit={handleSubmit} >
                <AddressInput value={pickUpLocation} onChange={setPickUpLocation} placeholder="Pick Up Location" />
                <AddressInput value={dropOffLocation} onChange={setDropOffLocation} placeholder="Drop Off Location" />




                <input className="rounded-lg bg-bgrd-b px-10 py-3 font-semibold text-white no-underline transition hover:bg-accent hover:cursor-pointer" type="submit" disabled={disabledSubmit} />
                {error && error.message}

            </form>
        </div>

    )
}

export default LessonLocationForm;
