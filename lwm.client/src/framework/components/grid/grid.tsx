import React from "react";
import GridColumns from "../../types/gridColumns";
import GridRow from "../../types/gridRow";
import './grid.css';
import LwmButton from "../button/lwm-button";

export interface Props {
    columns: GridColumns[];
    rows: GridRow[];
    editClicked: Function;
    deletClicked: Function;
}
 
export interface State {

}
 
export default class Grid extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {}
    }

    render() { 
        return this.renderGrid();
    }

    private renderGrid() {
        console.log(Object.values(this.props.rows));
        
        return(
        <div className="gridOuterContainer">
            <div className="gridHeader">
                { this.props.columns.map(column => 
                    <div className="gridHeaderColumn">
                        {column.lable}
                    </div>
                )}
            </div>
            <div className="gridContent">
            {this.props.rows.map(row => 
                <div className="gridContentRow">
                    {this.generateRow(row.columnData, row.id)}
                </div>)}
            </div>
        </div>);
    }

    private generateRow(columnData: any, rowId: number) {

        const columns: JSX.Element[] = [];
            Object.entries(columnData).map((column: any) => 
            {
                if (this.props.columns.map(c => c.name).includes(column[0]) && column[0] !== "id") {
                    columns.push(
                    <div className="gridContentColumn">
                        {column[1]}
                    </div>);
                }
            })

            columns.push(
                <div className="gridContentColumn">
                    <LwmButton isSelected={false} onClick={this.handleEditClicked.bind(this, rowId)} name="Edit"></LwmButton>
                    <LwmButton isSelected={false} onClick={this.handleDeleteClicked.bind(this, rowId)} name="Delete"></LwmButton>
                </div>
            )
            

            return columns;
    }

    private handleEditClicked(rowId: number) {
        const rowClicked = this.props.rows.find(row => row.id == rowId);
        this.props.editClicked(rowClicked?.columnData);
    }

    private handleDeleteClicked(rowId: number) {
        const rowClicked = this.props.rows.find(row => row.id == rowId);
        this.props.deletClicked(rowClicked?.columnData);
    }
}
