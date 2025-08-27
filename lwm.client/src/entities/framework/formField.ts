export type FormField = {
    label: string,
    type: string,
    id: string,
    onFieldChanged: Function;
    value: string | number | Date | undefined;
    required: boolean;
    validationPattern: string | undefined;
    selectOptions: JSX.Element[] | undefined;
    isInvalid?: boolean;
}