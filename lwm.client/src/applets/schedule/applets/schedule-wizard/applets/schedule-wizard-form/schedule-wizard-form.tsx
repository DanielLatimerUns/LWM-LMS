import React from "react";
import Form from "../../../../../../framework/components/form/form";
import Group from "../../../../../../entities/domainModels/group";
import Schedule from "../../../../../../entities/domainModels/schedule";

interface Props {
    schedule: Schedule;
    handleFormChange: Function;
    groups: Group[];
}
 
interface State {
}
 
export default class ScheduleWizardForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }
    render() { 
        return ( 
            <div className="personWizardFormContainer">
                <Form>
                    <select 
                            key="Day Of Week" 
                            id="schedualedDayOfWeek"
                            value={this.props.schedule.schedualedDayOfWeek}
                            onChange={this.props.handleFormChange.bind(this)}>
                                <option value={undefined}>Select a Day</option>
                                <option value={1}>Monday</option>
                                <option value={2}>Tuesday</option>
                                <option value={3}>Wednesday</option>
                                <option value={4}>Thursday</option>
                                <option value={5}>Friday</option>
                                <option value={6}>Saterday</option>
                                <option value={7}>Sunday</option>
                    </select>
                    <input 
                        key="Start Time" 
                        type="time" 
                        id="schedualedStartTime"
                        readOnly= {false}
                        value={this.props.schedule.schedualedStartTime}
                        onChange={this.props.handleFormChange.bind(this)}/>
                    <input 
                        key="End Time" 
                        type="time"
                        id="schedualedEndTime" 
                        value={this.props.schedule.schedualedEndTime}
                        onChange={this.props.handleFormChange.bind(this)}/>
                    <select 
                            key="Group" 
                            id="groupId"
                            value={this.props.schedule.groupId}
                            onChange={this.props.handleFormChange.bind(this)}>
                                <option value={undefined}>Select a Group</option>
                                {this.props.groups.map(group => 
                                    <option value={group.id
                                    }>{group.name}</option>
                                )}
                    </select>
                </Form>
            </div>
        );
    }
}
