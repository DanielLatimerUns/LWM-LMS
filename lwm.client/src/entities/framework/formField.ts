export default interface FormField {
    label: string,
    type: string,
    id: string,
    onFieldChangedSuccsess: Function;
    value: string | number | undefined;
    required: boolean;
    validationPattern: string | undefined;
    selectOptions: JSX.Element[] | undefined;
    isInvalid?: boolean;
}