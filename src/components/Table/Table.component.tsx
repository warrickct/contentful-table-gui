import React, { useEffect, useState } from 'react';
import {
    Button,
    TextField,
    TableBody,
    TableCell,
    TableRow,
    Table,
    TableHead,
    ToggleButton,
    Subheading
} from '@contentful/forma-36-react-components';
import '@contentful/forma-36-react-components/dist/styles.css';
import styled from "styled-components";
import { init } from "@contentful/app-sdk";


// background-color: ${(props: any) => props.headers === 'true' ? "#798cd4" : 'white'}
const StyledTableHead = styled(TableHead)`
        th {
            background-color: #8897cf;
        }
`;

const StyledVerticalDiv = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledTableContainer = styled.div`
    width: 100%;
    overflow-x: auto;
    padding: 1rem;
    display: flex;
    flex-direction: row;
    background-color: grey;
`;

const StyledTableRow = styled(TableRow)`
    background-color: pink;
    border-radius: 0.25rem;
    margin: 0.25rem;
`;

const HorizontalDiv = styled.div`
    display: flex;
    // margin: 1rem;
    flex-direction: horizontal;
    
    > * {
        margin: 0.25rem;
    }
`;

const TableExtension = (props: any) => {

    const [tableData, setTableData] = useState<any[]>([]);
    const [col, setColumnSize] = useState<number>(3);
    const [useHeader, setHeader] = useState(true);

    /**
     * Starts the entension window auto resizing and unpacks saved table data and metadata.
     */
    const initializeExtension = () => {
        init((sdk: any) => {
            sdk.window.startAutoResizer();
            let data = sdk.field.getValue();
            setTableData(data.tableData);
            setHeader(data.useHeader);
        });
    }

    useEffect(() => {
        initializeExtension();
    }, [])

    const handleToggleHeader = () => {
        console.log({ tableData });
        setHeader(!useHeader);
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
    }

    const addCol = () => {
        let newColSize = col + 1;
        setColumnSize(newColSize);
        // go through all the pre-existing rows and increase their size.
        let newTable = [...tableData];
        // console.log({newTable});
        newTable.forEach((row, index) => {
            if (row.length < newColSize) {
                // increase the row size.
                let row2 = row.concat(new Array(newColSize - row.length).fill(null));
                newTable[index] = row2;
            }
        });
        // console.table(newTable);
        updateTableStateAndField(newTable);
    }

    /**
     * reduces the column size for the next row to be created
     */
    const removeEndCol = () => {
        if (col <= 0) {
            return;
        }
        let newColumnSize = col - 1;
        setColumnSize(newColumnSize);
        // go through all the pre-existing rows and increase their size.
        let newTable = [...tableData];
        newTable.forEach((row, index) => {
            if (row.length > newColumnSize) {
                console.log('reducing column size');
                // increase the row size.
                let row2 = row.slice(0, newColumnSize);
                newTable[index] = row2;
            }
        });
        updateTableStateAndField(newTable);
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

    /**
     * Generates the table rows from table data
     * @param start starting index of the rows you wish to render
     * @param end index to end rendering rows
     */
    const renderTableRows = (start: number | null = null, end: number | null = null) => {
        if (tableData.length <= 0) {
            return;
        }
        let styledRows = [];
        // remapping the values to work with for-loop
        start = start ? start : 0;
        end = end ? end : tableData.length;
        for (let rowIdx = start; rowIdx < end; rowIdx++) {
            let row = tableData[rowIdx];
            styledRows.push(
                <>
                    <StyledTableRow key={"row" + rowIdx}>
                        {renderTableCells(row, rowIdx)}
                        <TableCell>
                            <Button icon="Delete" onClick={() => removeSelectedRow(rowIdx)}></Button>
                        </TableCell>
                    </StyledTableRow>
                </>
            )
        }
        return styledRows;
    }

    /**
     * Updates the table data with values from a table cell.
     */
    const updateCellData = (event: any, rowIdx: number, cellIdx: number) => {
        let newTableData = [...tableData]; // copy the object
        newTableData[rowIdx][cellIdx] = event.target.value // update the singular cell entry
        updateTableStateAndField(newTableData); // update the tableData state. (not sure if it's necessary?)
    }

    /**
     * Creates the cells of a row within the table
     * @param row A row which is an array of string values
     * @param rowIdx The index of the row currently being created
     */
    const renderTableCells = (row: string[], rowIdx: number) => {
        return row.map((item, cellIdx) => {
            return <TableCell>
                <StyledVerticalDiv>
                    {rowIdx === 0 ?
                        <Button icon="Delete" onClick={() => removeSelectedColumn(cellIdx)}></Button>
                        : null
                    }
                    <TextField
                        name={`table-cell-y${rowIdx}-x${cellIdx}`}
                        id={`table-cell-y${rowIdx}-x${cellIdx}`}
                        labelText={``}
                        value={item}
                        // helpText={`Input your text.`}
                        aria-label={`Input for row ${rowIdx}, cell ${cellIdx}`}
                        onChange={e => updateCellData(e, rowIdx, cellIdx)}
                        textarea
                    ></TextField>
                </StyledVerticalDiv>
            </TableCell>
        });
    }

    /**
     * Loads a csv file into the table component.
     * @param e event
     */
    const loadCsv = (e: any) => {
        let files = e.target.files;
        let reader = new FileReader();
        reader.onload = function (e) {
            if (e && e.target && e.target.result) {
                let csvText = e.target.result;
                console.log(typeof (csvText));
                if (typeof (csvText) == 'string') {
                    csvToTable(csvText);
                }
            }
        };
        reader.readAsText(files[0]);
    }

    /**
     * Converts a csv formatted text into a 2D table data array.
     */
    const csvToTable = (text: string) => {
        let maxCols = 0;
        let lines = text.split('\n');
        let newTableData = lines.map((line: string) => {
            let cells = line.split(',');
            // update column setting for the table
            maxCols = maxCols < cells.length ? cells.length : maxCols;
            return cells;
        });
        setColumnSize(maxCols);
        updateTableStateAndField(newTableData);
    }

    /**
     * Determines what table type to create and renders it.
     */
    const renderTable = () => {
        if (useHeader) {
            return (
                <>
                    <StyledTableHead>
                        {renderTableRows(0, 1)}
                    </StyledTableHead>
                    <TableBody>
                        {renderTableRows(1)}
                    </TableBody>
                </>
            )
        } else {
            return (
                <TableBody>
                    {renderTableRows()}
                </TableBody>
            )
        }
    }

    /**
     * Removes a single row at the index specified
     */
    const removeSelectedRow = (rowIndex: number) => {
        let newTableData = [...tableData];
        newTableData.splice(rowIndex, 1);
        updateTableStateAndField(newTableData);
    }

    const removeSelectedColumn = (colIndex: number) => {
        let newTableData = [...tableData];
        newTableData.forEach(row => {
            row.splice(colIndex, 1);
        });
        setColumnSize(col - 1);
        updateTableStateAndField(newTableData);
    }

    return (
        <>
            <input onChange={(e) => loadCsv(e)} type="file" accept=".csv"></input>
            <StyledTableContainer>
                <Table>
                    {renderTable()}
                </Table>
            </StyledTableContainer>
            <Subheading>
                Rows: {tableData.length} Columns: {col}
            </Subheading>
            <HorizontalDiv>
                <ToggleButton isActive={useHeader} onToggle={handleToggleHeader}
                >Headers</ToggleButton>
            </HorizontalDiv>
            <HorizontalDiv>
                <Button buttonType="primary" size="small" onClick={addRow}>Add Row</Button>
                <Button buttonType="primary" size="small" onClick={removeRow}>Remove Row</Button>
            </HorizontalDiv>
            <HorizontalDiv>
                <Button buttonType="primary" size="small" onClick={addCol}>Add Column</Button>
                <Button buttonType="primary" size="small" onClick={removeEndCol}>Remove Column</Button>
            </HorizontalDiv>
        </>
    )
}

export default TableExtension;