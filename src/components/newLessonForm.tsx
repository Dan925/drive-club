
import { SetStateAction } from "react";
import { Dispatch } from "react";
import { FormEventHandler, useRef, useState } from "react";
import { api } from "~/utils/api";
import AddressInput from "./addressInput";
import add from "date-fns/add";

type Props = {
    setOpenForm: Dispatch<SetStateAction<boolean>>

}

const NewLessonForm: React.FC<Props> = ({ setOpenForm }) => {

    const [disabledSubmit, setDisabledSubmit] = useState<boolean>(false);
    const [startAt, setStartAt] = useState<string>("");
    const [endAt, setEndAt] = useState<string>("");
    const [pickUpLocation, setPickUpLocation] = useState<string>("")
    const [dropOffLocation, setDropOffLocation] = useState<string>("")

    const formRef = useRef<HTMLFormElement>(null)
    const trpcUtils = api.useContext()

    const { mutate, error } = api.lessonsRouter.createLesson.useMutation({
        onSuccess: () => {
            setOpenForm(false);
            trpcUtils.lessonsRouter.getUserLessons.invalidate();

        }
    });


    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        setDisabledSubmit(true);

        if (formRef.current) {
            if (startAt && endAt && pickUpLocation && dropOffLocation)
                mutate({ startAt, endAt, pickUpLocation, dropOffLocation })
        }

    }
    return (
        <div className="fixed top-56 rounded-md w-280 h-2/3 flex flex flex-col justify-center gap-4 z-20 bg-gray items-center p-3">
            <h2 className="text-3xl font-bold ">Create Lesson</h2>
            <form action="#" className="flex flex-col gap-3" onSubmit={handleSubmit} >
                <input className="p-3 rounded-lg text-bgrd-b" type="datetime-local" placeholder="Start At" value={startAt} onChange={(e) => setStartAt(e.target.value)} name="startAt" required min={new Date().toISOString().replace('Z', '')} />
                <input className="p-3 rounded-lg text-bgrd-b" type="datetime-local" placeholder="End At" name="endAt" value={endAt} onChange={(e) => setEndAt(e.target.value)} required min={startAt} max={startAt??add(new Date(startAt),{minutes:30})} />

                <AddressInput value={pickUpLocation} onChange={setPickUpLocation} placeholder="Pick Up Location" />
                <AddressInput value={dropOffLocation} onChange={setDropOffLocation} placeholder="Drop Off Location" />




                <input className="rounded-lg bg-bgrd-b px-10 py-3 font-semibold text-white no-underline transition hover:bg-accent hover:cursor-pointer" type="submit" disabled={disabledSubmit} />
                {error && error.message}

            </form>
        </div>

    )
}

export default NewLessonForm;
