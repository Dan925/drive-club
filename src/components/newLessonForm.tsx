
import { SetStateAction } from "react";
import { Dispatch } from "react";
import { FormEventHandler, useState } from "react";
import { api } from "~/utils/api";
import { addHours, format } from "date-fns";

type Props = {
    setOpenForm: Dispatch<SetStateAction<boolean>>

}

const NewLessonForm: React.FC<Props> = ({ setOpenForm }) => {

    const [disabledSubmit, setDisabledSubmit] = useState<boolean>(false);
    const [startAt, setStartAt] = useState<string>("");
    const [endAt, setEndAt] = useState<string>("");

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

        if (startAt && endAt) {
            const data = { startAt: startAt.concat(':00Z'), endAt: endAt.concat(':00Z') }
            console.log(data);
            mutate(data)
        }

    }


    return (
        <div className="fixed top-56 rounded-md w-280 h-2/3 flex flex flex-col justify-center gap-4 z-20 bg-gray items-center p-3">
            <h2 className="text-3xl font-bold ">Lesson</h2>
            <form action="#" className="flex flex-col gap-3" onSubmit={handleSubmit} >
                <label htmlFor="startAt">Start At:</label>
                <input className="p-3 rounded-lg text-bgrd-b" type="datetime-local" placeholder="Start At" value={startAt} onChange={(e) => setStartAt(e.target.value)} name="startAt" required min={format(new Date(), 'yyyy-MM-ddTHH:mm')} />

                <label htmlFor="startAt">End At:</label>
                {startAt ?
                    <input className="p-3 rounded-lg text-bgrd-b" type="datetime-local" placeholder="End At" name="endAt" value={endAt} onChange={(e) => setEndAt(e.target.value)} required min={startAt} max={format(addHours(new Date(startAt), 2), "yyyy-MM-dd/HH:mm").replace('/', 'T')} />
                    :

                    <input className="p-3 rounded-lg text-bgrd-b" type="datetime-local" placeholder="End At" name="endAt" value={endAt} onChange={(e) => setEndAt(e.target.value)} required min={startAt} disabled={true} />

                }


                <input className="rounded-lg bg-bgrd-b px-10 py-3 font-semibold text-white no-underline transition hover:bg-accent hover:cursor-pointer" type="submit" disabled={disabledSubmit} />
                {error && error.message}

            </form>
        </div>

    )
}

export default NewLessonForm;
