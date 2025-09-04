import React, { Fragment } from 'react';
import Form,{ FormField } from "../../../framework/components/form/form";
import {TimeTable} from "../../../entities/app/timeTable";

export interface Props {
    timeTable?: TimeTable,
    onChanged: Function;
    onValidationChanged?: Function;
}

const TimeTableWizard: React.FunctionComponent<Props> = (props) => {

    function handleFieldValidationChanged(isValid: boolean) {
        if (props.onValidationChanged) {
            props.onValidationChanged(isValid);
        }
    }
    
    function buildForm() {
        if (!props.timeTable) {
            return;
        }
        
        const fields: FormField[] = [
            {
                label: "Name",
                id: "name",
                value: props.timeTable.name,
                onFieldChanged: props.onChanged,
                type: "text",
                required: true,
                validationPattern: undefined,
                selectOptions: undefined,
            },
            {
                label: "Published",
                id: "isPublished",
                value: props.timeTable.isPublished,
                onFieldChanged: props.onChanged,
                type: "checkbox",
                required: true,
                validationPattern: undefined,
                selectOptions: undefined,
            }
        ];
        
        return(
            <Fragment>
                <div className="fieldSetHeader">
                    <Form fields={fields} 
                          onFieldValidationChanged={handleFieldValidationChanged}
                          formObject={props.timeTable}/>
                </div>
            </Fragment>
        )
    }
    
    return (
        <div>
            {buildForm()}
        </div>
    )
}

export default TimeTableWizard;