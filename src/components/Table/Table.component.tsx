import React, { Component, useState } from 'react';
import { Button, TextField } from '@contentful/forma-36-react-components';
import '@contentful/forma-36-react-components/dist/styles.css';
import styled from "styled-components";
import { render } from '@testing-library/react';

const TableCell = styled.td`
    padding: 1rem;
`

const TableRow = styled.tr`
    padding: 0.5em;
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

// import Cell from '../'
// import Row from '../'

const Row = () => {
    return (
        <tr>

        </tr>
    )
}

const Table = () => {
    // these might cause re-render loop?

    // a set of rows.
    const [tableData, setTableData] = useState<any[]>([]);
    const [row, setRow] = useState<string[]>([]);
    const [col, setCol] = useState<number>(0);

    // thoughts: adding row / cell alter the data, re-render the whole table based on when the data model changes.
    // adding row/ column will add empty table objects which will be rendered 

    /**
     * Adds a row to the table with a size determined by the current column count.
     */
    const addRow = () => {
        // little bit of admin surrounding adding row. If row is reduced and data inside, maybe add alert?
        // setRowCount(rowCount.push([]))

        // let newTable = tableData;
        // console.log({newTable});

        // let newArr = [...newTable];
        // console.log({newArr}); 

        // add a row to the table, the size of the column size.
        let table: any[] = [...tableData];
        let additionalRow = new Array(col).fill(null);
        table.push(additionalRow);

        // console.log({table});
        setTableData(table);
        console.log({ tableData });
    }

    const addCol = () => {
        setCol(col + 1);
        // copy current table
        // let newTable = tableData;
        let newTable = [...tableData];
        // console.log({ newTable });

        // // iterate through table rows
        // newTable.map((row, index) => {
        //     // if curRow length < col
        //     if (row.length < col) {
        //         // copy cur Row and create new, larger row w/ old values spread into it
        //         let newRow = new Array(col);


        //         // TODO: this isn't right. Should be some padding function
        //         newRow.push(...row);

        //         // store the new row with pad
        //     }
        // })


        // table[that row]
    }

    const removeCol = () => {
        // some trickier logic for removing a column.
    }

    const renderTable = () => {
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
        setTableData(newTableData); // update the tableData state. (not sure if it's necessary?)
        console.log({ tableData });
    }


    const renderRow = (row: string[], rowIdx: number) => {
        return row.map((item, cellIdx) => {
            return <TableCell>
                <TextField
                    name={`table-cell-y${rowIdx}-x${cellIdx}`}
                    id={`table-cell-y${rowIdx}-x${cellIdx}`}
                    labelText={``}
                    // helpText={`Input your text.`}
                    aria-label={`Input for row ${rowIdx}, cell ${cellIdx}`}
                    onChange={e => updateCellData(e, rowIdx, cellIdx)}
                    textarea
                ></TextField>
            </TableCell>
        });
    }

    return (
        <>
            <table>
                <tbody>
                    <thead>

                    </thead>
                    {renderTable()}
                </tbody>
            </table>
            <div>
                Row: {row}, Col: {col}
            </div>
            <div>

            </div>
            <HorizontalDiv>
                <Button buttonType="primary" onClick={addRow}>Add Row</Button>
                <Button buttonType="primary" onClick={addCol}>Add Column</Button>
            </HorizontalDiv>
        </>
    )
}

export default Table;



// build the html for the rows, create the data on save? Data should be a variable as it's to re-render the page.