import {JSX} from "react";

export type FormField = {
    label: string,
    type: string,
    id: string,
    onFieldChanged: Function;
    value?: string | number;
    checkedValue?: boolean;
    required: boolean;
    validationPattern: string | undefined;
    selectOptions: JSX.Element[] | undefined;
    isInvalid?: boolean;
    isReadOnly?: boolean;
    isHidden?: boolean;
}