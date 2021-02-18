import React, { useState } from 'react';
import {
    Button,
    TextField,
    TableBody,
    TableCell,
    TableRow,
    Table,
    TableHead,
    Heading,
    ToggleButton,
    Switch,
    DisplayText,
    Subheading
} from '@contentful/forma-36-react-components';
import '@contentful/forma-36-react-components/dist/styles.css';
import styled from "styled-components";
import { init  } from "@contentful/app-sdk";

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
        margin: 0.25rem;
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
        if (col <= 0) {
            return;
        }
        setCol(col - 1);
    }

    /**
     * removes the end/bottom row of the table
     */
    const removeRow = () => {
        if (tableData.length <= 0) {
            return;
        }
        let newTableData = [...tableData];
        newTableData.pop();
        updateTableStateAndField(newTableData);
    }

    const renderTableRows = () => {
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

    // const renderHeader = () => {
        
    //     //  return tableData.slice(0, 1).map((row, rowIdx) => {
    //     //     return <TableRow key={"row" + rowIdx}>
    //     //         {renderRow(row, rowIdx)}
    //     //     </TableRow>

    //     // });
    //         return renderRow(tableData[0], 0)
    // }

    return (
        <>
            <Table>
                <TableHead>
                    {/* <tr> */}
                        {/* {renderHeader()} */}
                    {/* </tr> */}
                </TableHead>
                <TableBody>
                    {renderTableRows()}
                </TableBody>
            </Table>
            <Subheading>
                Rows: {tableData.length} Columns: {col}
            </Subheading>
            <HorizontalDiv>
                <ToggleButton isActive={useHeader}  onToggle={handleToggleHeader}
                >Headers</ToggleButton>
            </HorizontalDiv>
            <HorizontalDiv>
                <Button buttonType="primary" size="small" onClick={addRow}>Add Row</Button>
                <Button buttonType="primary" size="small" onClick={removeRow}>Remove Row</Button>
            </HorizontalDiv>
            <HorizontalDiv>
                <Button buttonType="primary" size="small" onClick={addCol}>Add Column</Button>
                <Button buttonType="primary" size="small" onClick={removeCol}>Remove Column</Button>
            </HorizontalDiv>
        </>
    )
}

export default TableExtension;

// build the html for the rows, create the data on save? Data should be a variable as it's to re-render the page.