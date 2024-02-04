import React from "react";
import GridRow from "../../../entities/framework/gridRow";
import './grid.css';
import LwmButton from "../button/lwm-button";
import GridColumn from "../../../entities/framework/gridColumn";

export interface Props {
    columns: GridColumn[];
    rows: GridRow[];
    editClicked: Function | undefined;
    deletClicked: Function | undefined;
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
       
        return(
        <div className="gridOuterContainer">
            <div className="gridContent">
                <div className="gridContentHeader">
                    {this.generateHeaderRow()}
                </div>
                {this.props.rows.map(row => 
                <div className="gridContentRow">
                    {this.generateRow(row.columnData, row.id)}
                </div>)}
            </div>
        </div>);
    }

    private generateHeaderRow() {
        const columns: JSX.Element[] = [];
         
            this.props.columns.forEach(column => {
                columns.push(
                    <div className="gridHeaderColumn">
                        {column.lable}
                    </div>);
                });

                columns.push(
                    <div className="gridHeaderColumn">                  
                    </div>
                )

        return columns;
    }

    private generateRow(columnData: any, rowId: number) {
        const columns: JSX.Element[] = [];
            Object.entries(columnData).map((column: any) => 
            {
                if (this.props.columns.map(c => c.name).includes(column[0]) && column[0] !== "id") {
                    columns.push(
                    <div className="gridContentColumn" title={column[1]}>
                        {this.generateContent(column, rowId)}
                    </div>);
                }
            })

            columns.push(
                <div className="gridContentColumn">
                    {this.generateGridButtons(rowId)}
                </div>
            )
            
            return columns;
    }

    private generateContent(content: any, rowId: number) {
        if(!content[1]) {
            return "-"
        }

        return <LwmButton isSelected={false} onClick={this.handleEditClicked.bind(this, rowId)} name={content[1]}/>
    }

    private generateGridButtons(rowId: number) {
            const buttons: JSX.Element[] = [];

            if (this.props.editClicked) {
                buttons.push(<LwmButton isSelected={false} onClick={this.handleEditClicked.bind(this, rowId)} name="Edit"></LwmButton>)
            }

            if (this.props.deletClicked) {
                buttons.push(<LwmButton isSelected={false} onClick={this.handleDeleteClicked.bind(this, rowId)} name="Delete"></LwmButton>)
            }

            return buttons;
    }

    private handleEditClicked(rowId: number) {
        if (!this.props.editClicked) { return; }
        const rowClicked = this.props.rows.find(row => row.id == rowId);
        this.props.editClicked(rowClicked?.columnData);
    }

    private handleDeleteClicked(rowId: number) {
        if (!this.props.deletClicked) { return; }
        const rowClicked = this.props.rows.find(row => row.id == rowId);
        this.props.deletClicked(rowClicked?.columnData);
    }
}
