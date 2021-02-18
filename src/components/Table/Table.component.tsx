import React, { Component, useState } from 'react';
import { Button, SkeletonDisplayText, TextField, TableBody, TableCell, TableRow, Table, TableHead, Heading, SectionHeading } from '@contentful/forma-36-react-components';
import '@contentful/forma-36-react-components/dist/styles.css';
import styled from "styled-components";
import { render } from '@testing-library/react';

import { init, locations, Locations } from "@contentful/app-sdk";

const TableHeader = styled.th`
    background-color: pink;
`;

// interface TableCellProps {
//     useHeader: boolean;
// }

const CustomTableCell = styled.td`
    padding: 0rem;
`
// TODO: Add dynamic header color based on state -- background-color: ${(props: TableCellProps) => props.useHeader ? "#ffffff" : "#e2e2e2"};

const CustomTableRow = styled.tr`
    padding: 0em;
    margin: 0em;
    // background-color: green;
`
const HorizontalDiv = styled.div`
    display: flex;
    // margin: 1rem;
    flex-direction: horizontal;
    
    > * {
        margin: 0.5rem;
    }
`;

// TODO: Import in form 36 fcss for more consistent styling

const TableExtension = (props: any) => {

    init((sdk: any) => {
        sdk.window.startAutoResizer();
    });

    // a set of rows.
    const [tableData, setTableData] = useState<any[]>([]);
    const [row, setRow] = useState<string[]>([]);
    const [col, setCol] = useState<number>(0);
    const [useHeader, toggleHeader] = useState(true);

    const handleToggleHeader = () => {
        toggleHeader(!useHeader);
        updateTableStateAndField(tableData);
    }


    /** wrapper to ensure table changes synchronize with contentful field value changes. */
    const updateTableStateAndField = (tableData: any[]) => {
        // updating react component state
        setTableData(tableData);

        // // update the field value
        init((sdk: any) => {
            sdk.field.setValue({
                useHeader,
                tableData
            });
            // console.log(sdk.field.getValue());
        })
    }



    /**
     * Adds a row to the table with a size determined by the current column count.
     */
    const addRow = () => {
        if (col <= 0) {
            return;
        }
        let table: any[] = [...tableData];
        let additionalRow = new Array(col).fill(null);
        table.push(additionalRow);
        updateTableStateAndField(table);
        console.log({ tableData });
    }

    const addCol = () => {
        setCol(col + 1);
        // TODO: expand all columns for existing rows?
    }

    /**
     * reduces the column size for the next row to be created
     */
    const removeCol = () => {
        setCol(col - 1);
    }

    /**
     * removes the end/bottom row of the table
     */
    const removeRow = () => {
        let newTableData = [...tableData];
        newTableData.pop();
        updateTableStateAndField(newTableData);
    }

    const renderTableBody = () => {
        return tableData.map((row, rowIdx) => {
            return <TableRow key={"row" + rowIdx}>
                {renderRow(row, rowIdx)}
            </TableRow>
        });
    }

    /**
     * Updates the table data with values from a table cell.
     */
    const updateCellData = (event: any, rowIdx: number, cellIdx: number) => {
        let newTableData = [...tableData]; // copy the object
        newTableData[rowIdx][cellIdx] = event.target.value // update the singular cell entry
        updateTableStateAndField(newTableData); // update the tableData state. (not sure if it's necessary?)
        console.log({ tableData });
    }


    /**
     * Creates a row within the table
     * @param row A row which is an array of string values
     * @param rowIdx The index of the row currently being created
     */
    const renderRow = (row: string[], rowIdx: number) => {
        return row.map((item, cellIdx) => {
            return <TableCell>
                <TextField
                    name={`table-cell-y${rowIdx}-x${cellIdx}`}
                    id={`table-cell-y${rowIdx}-x${cellIdx}`}
                    labelText={``}
                    // helpText={`Input your text.`}
                    // TODO: Implement better header visual indicator
                    // helpText={rowIdx == 0  && useHeader ? 'Header' : ''}
                    aria-label={`Input for row ${rowIdx}, cell ${cellIdx}`}
                    onChange={e => updateCellData(e, rowIdx, cellIdx)}
                    textarea
                ></TextField>
            </TableCell>
        });
    }

    return (
        <>
            <Heading>Custom Table</Heading>
            <Table>
                <TableHead>
                    <tr>
                        {/* {renderHeader()} */}
                    </tr>
                </TableHead>
                <TableBody>
                    {renderTableBody()}
                </TableBody>
            </Table>
            <div>
                Rows: {tableData.length}, Columns: {col}
            </div>
            <div>
                Headers: {useHeader ? 'on' : 'off'}
            </div>
            <div>

            </div>
            <HorizontalDiv>
                <Button buttonType="primary" size="small" onClick={addRow}>Add Row</Button>
                <Button buttonType="primary" size="small" onClick={removeRow}>Remove Row</Button>
            </HorizontalDiv>
            <HorizontalDiv>
                <Button buttonType="primary" size="small" onClick={addCol}>Add Column</Button>
                <Button buttonType="primary" size="small" onClick={removeCol}>Remove Column</Button>
            </HorizontalDiv>
            <HorizontalDiv>
                <Button buttonType="primary" size="small" onClick={handleToggleHeader}>Toggle Header</Button>
            </HorizontalDiv>
        </>
    )
}

export default TableExtension;

// build the html for the rows, create the data on save? Data should be a variable as it's to re-render the page.