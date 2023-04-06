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
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    const [pickUpLocation, setPickUpLocation] = useState<any>(null)
    const [dropOffLocation, setDropOffLocation] = useState<any>(null)

    const trpcUtils = api.useContext()

    const { mutate, error } = api.lessonsRouter.bookLessonById.useMutation({
        onSuccess: async () => {
            setOpenForm(false);
            await trpcUtils.lessonsRouter.getUserLessons.invalidate();
            await trpcUtils.lessonsRouter.getAvailableLessons.invalidate();

        }
    });


    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        setDisabledSubmit(true);

        if (pickUpLocation && dropOffLocation)
            console.log(pickUpLocation, dropOffLocation)
        /*eslint-disable @typescript-eslint/no-unsafe-member-access */
        mutate({ lessonId, pickUpLocation: pickUpLocation?.label, dropOffLocation: dropOffLocation?.label })

    }


    return (
        <div className="fixed top-56 rounded-md w-[300px] h-[300px] flex flex-col justify-center gap-4 z-20 bg-gray items-center p-3">
            <h2 className="text-3xl font-bold ">Book Lesson</h2>
            <form action="#" className="flex flex-col gap-3 w-full" onSubmit={handleSubmit} >
                <AddressInput value={pickUpLocation} onChange={setPickUpLocation} placeholder="Pick Up Location" />
                <AddressInput value={dropOffLocation} onChange={setDropOffLocation} placeholder="Drop Off Location" />
                <input className="rounded-lg bg-bgrd-b px-10 py-3 font-semibold text-white no-underline transition hover:bg-accent hover:cursor-pointer" type="submit" disabled={disabledSubmit} />
                <button className="rounded-lg bg-bgrd-b px-10 py-3 font-semibold text-white no-underline transition hover:bg-accent hover:cursor-pointer" onClick={() => setOpenForm(state => !state)}>Close</button>
                {error && error.message}

            </form>
        </div>

    )
}

export default LessonLocationForm;
