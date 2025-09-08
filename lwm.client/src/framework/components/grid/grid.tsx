import React, {JSX} from "react";
import {GridRow, GridColumn} from "../../../entities/framework/grid.ts";
import './grid.css';
import LwmButton from "../button/lwm-button";
import Spinner from '../../../assets/loading_spinner.gif';
import {ButtonConfig} from "../../../entities/framework/lwmButton.ts";

export interface Props {
    columns: GridColumn[];
    rows: GridRow[];
    editClicked: Function | undefined;
    deleteClicked: Function | undefined;
    customButtons?: ButtonConfig[]
    isDataLoading: boolean
}

export type {GridColumn, GridRow}
const Grid: React.FunctionComponent<Props> = (props: Props) => {
    function renderGrid() {
        return (
            <div className="gridOuterContainer">
                <div className="gridContent">
                    <div className="gridContentHeader">
                        {generateHeaderRow()}
                    </div>
                    {generateRows()}
                </div>
            </div>);
    }

    function generateHeaderRow() {
        const columns: JSX.Element[] = [];

        props.columns.forEach(column => {
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

    function generateRows() {
        if (props.isDataLoading) {
            return <div className="gridLoading">
                <img src={Spinner}/>
            </div>;
        }
        
        if (props.rows.length === 0) {
            return <div className="gridNoRecords">No Records</div>;
        }

        return (
            props.rows.map(row =>
                <div className="gridContentRow" onClick={() => handleEditClicked(row.id)}>
                    {generateRow(row.columnData, row.id)}
                </div>));
    }

    function generateRow(columnData: any, rowId: number) {
        const columns: JSX.Element[] = [];
        Object.entries(columnData).map((column: any) => {
            if (props.columns.map(c => c.name).includes(column[0]) && column[0] !== "id") {
                columns.push(
                    <div className="gridContentColumn">
                        {generateContent(column)}
                    </div>);
            }
        })

        columns.push(
            <div className="gridContentColumn">
                {generateGridButtons(rowId)}
            </div>
        )

        return columns;
    }

    function generateContent(content: any) {
        if (!content[1]) {
            return "-"
        }
        
        if (typeof content[1] === 'boolean') {
            return content[1] ? "Yes" : "No";
        }
        
        return content[1];
    }

    function generateGridButtons(rowId: number) {
        const buttons: JSX.Element[] = [];

        if (props.deleteClicked) {
            buttons.push(<LwmButton isSelected={false} onClick={() => handleDeleteClicked(rowId)}
                                    name="Delete"></LwmButton>)
        }

        props.customButtons?.forEach(button => {
            buttons.push(<LwmButton isSelected={false} onClick={() => button.onClick(rowId)}
                                    name={button.name}></LwmButton>);
        })

        return buttons;
    }

    function handleEditClicked(rowId: number) {
        if (!props.editClicked) {
            return;
        }

        const rowClicked = props.rows.find(row => row.id == rowId);
        props.editClicked(rowClicked?.columnData);
    }

    function handleDeleteClicked(rowId: number) {
        if (!props.deleteClicked) {
            return;
        }

        const rowClicked = props.rows.find(row => row.id == rowId);
        props.deleteClicked(rowClicked?.columnData);
    }


    return renderGrid()
}

export default Grid;