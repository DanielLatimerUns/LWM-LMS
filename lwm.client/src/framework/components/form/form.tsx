import React from "react";
import './form.css'
import { FormField } from "../../../entities/framework/formField";

interface Props {
    fields: FormField[];
    onFieldValidationChanged: Function;
    formObject: any;
}

 const Form: React.FunctionComponent<Props> = (props) => {
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
        
        if (field.type === 'checkbox') {
            return(
                <input
                    type={field.type}
                    id={field.id}
                    checked={field.value}
                    onChange={(e: any) => handleFormChange(e, field)}
                    pattern={field.validationPattern}
                    className={!validateField(field) ?  "invalid-input" : ""}
                    required/>
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

    function handleFormChange(e: any, field: FormField) {
        field.value = field.type === 'checkbox' ? (e.target.value === "on") : e.target.value;

        const isChangedFieldValid = validateField(field);
        props.onFieldValidationChanged(isChangedFieldValid);

        if (isChangedFieldValid) {
            props.onFieldValidationChanged(validateAllFields(field.id));
        }

        const changedObject = Object.assign({}, props.formObject);
        const targetField = field.value

        for (const key in changedObject) {
            if (key === e.target.id) {
                (changedObject as any)[key] = targetField;
            }
        }
        
        field.onFieldChanged(changedObject);
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

    const form = (
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
    
    props.onFieldValidationChanged(validateAllFields());
    return form;
}

export default Form;
export type { FormField };