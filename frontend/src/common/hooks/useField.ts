import React from "react";


export const useField = (type: string, id: string, initialValue:string) => {
    const [value, setValue] = React.useState(initialValue);
    const label = id
    const name = id

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return {
        type,
        id,
        label,
        name,
        value,
        onChange,
    };
}