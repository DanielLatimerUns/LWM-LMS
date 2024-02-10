import React from "react";
import './form.css'
import FormField from "../../../entities/framework/formField";

interface Props {
    fields: FormField[];
    onFieldValidationChanged: Function;
}


 const Form: React.FunctionComponent<Props> = (props) => {

    // componentDidMount(): void {
    //     const isFormValid = this.validateAllFields();
    //     this.props.onFieldValidationChanged(isFormValid);
    // }

    function buildFormField(field: FormField) {
        if (field.type === 'select') {
            return(
                <select
                    id={field.id}
                    value={field.value}
                    className={!validateField(field) ?  "invalid-input" : ""}
                    onChange={(e: any) => handleFormChange(e, field)}>
                        {field.selectOptions}
                </select>
            )
        }

        return(
            <input
                type={field.type}
                id={field.id}
                value={field.value}
                onChange={(e: any) => handleFormChange(e, field)}
                pattern={field.validationPattern}
                className={!validateField(field) ?  "invalid-input" : ""}
                required/>
        )
    }

    function handleFormChange(e: any, field: FormField ) {
        field.value = e.target.value;

        const isChangedFieldValid = validateField(field);
        props.onFieldValidationChanged(isChangedFieldValid);

        if (isChangedFieldValid) {
            props.onFieldValidationChanged(validateAllFields(field.id));
        }

        field.onFieldChangedSuccsess(e);
    }

    function validateAllFields(fieldToExclude?: string) {
        for (const field of props.fields) {
            if (fieldToExclude && field.id === fieldToExclude) {
                continue;
            }

            const isValid = validateField(field)
            if (!isValid) {
                return false;
            }
        }

        return true;
    }

    function validateField(field: FormField): boolean {
        if (field.required &&
            (field.value === undefined ||
                field.value === "" ||
                field.value === "-1" ||
                field.value === -1 ||
                field.value === null ||
                Number.isNaN(field.value))) {
            return false;
        }

        if (field.validationPattern && (field.value !== undefined && field.value !== "")) {
            if (!field.value) {
                return false;
            }

            const regex = new RegExp(field.validationPattern);
            if (!regex.test(field.value.toString())) {
                return false;
            }
        }
        return true;
    }

    return (
        <div className="formFieldContainer">
            {props.fields.map(field =>
                <div className="formField">
                    <label>{field.label}</label>
                    <div className="formFieldInput">
                        {buildFormField(field)}
                    </div>
                </div>)}
        </div>
     );
}

export default Form;
