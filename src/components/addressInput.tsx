import { Dispatch, SetStateAction } from "react"
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

type Props = {
    value: string,
    onChange: Dispatch<SetStateAction<string>>,
    placeholder: string,
}

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
const AddressInput: React.FC<Props> = ({ value, onChange, placeholder }) => {
    return (
        <div className="text-bgrd-b">

            <GooglePlacesAutocomplete
                apiKey={GOOGLE_API_KEY}
                selectProps={{
                    value: value,
                    onChange: onChange,
                    placeholder: placeholder
                }}
            />

        </div>
    )

}

export default AddressInput;
