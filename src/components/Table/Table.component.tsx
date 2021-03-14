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
    Subheading,
    HelpText,
    IconButton
} from '@contentful/forma-36-react-components';
import '@contentful/forma-36-react-components/dist/styles.css';
import styled from "styled-components";
import { init } from "@contentful/app-sdk";

let primaryButtonColor = 'rgb(46, 117, 212)';
// let headerColor = '#8897cf';
let headerColor = '#c3cfd5';

const StyledButton = styled(Button)`
    min-width: 25%%
`;

const StyledToggleButton = styled(ToggleButton)`
    margin: 0.25rem;
`;

const StyledFileInput = styled.input`
        display: none;
`;

const StyledLabel = styled.label`
    color: white;
    font-size: 0.875rem;
    font-weight: 500;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    border-color: #2e75d4;
    background-color: ${primaryButtonColor};
`;


// background-color: ${(props: any) => props.headers === 'true' ? "#798cd4" : 'white'}
const StyledTableHead = styled(TableHead)`
        th {
            // background-color: ${headerColor};
        }
`;

const StyledTableCell = styled(TableCell) <{ useHeaderColor: boolean }>`
        padding 1rem;
        display: flex;
        align-items: center;
        justify-content: center; 
        flex-direction: column;
        // width: 100%
        // height: 100%
        // background-color: aliceblue !important;
        ${props => props.useHeaderColor ? `background-color: ${headerColor} !important;` : null};
`;

// const StyledVerticalDiv = styled.div`
//     display: flex;
//     flex-direction: column;
//     background-color: pink;
// `;

const StyledDeleteButton = styled(Button)`
    align-self: center;
`;

const StyledTableContainer = styled.div`
    width: 100%;
    overflow-x: auto;
    padding: 1rem;
    display: flex;
    flex-direction: row;
`;

const StyledTableRow = styled(TableRow)`
    // margin: 0.25rem;
    display: flex;
    flex-direction: row;

    :hover  {
        background-color: unset !important;
    }
`;

const HorizontalDiv = styled.div`
    width: 70%;
    display: flex;
    justify-content: center;
    flex-direction: horizontal;
    
    > * {
        margin: 0.25rem;
    }
`;

const TableExtension = (props: any) => {

    const [tableData, setTableData] = useState<any[]>([]);
    const [col, setColumnSize] = useState<number>(3);
    const [useHorizontalHeaders, setHorizontalHeaders] = useState(true);
    const [useVerticalHeaders, setVerticalHeaders] = useState(true);

    /**
     * Starts the entension window auto resizing and unpacks saved table data and metadata.
     */
    const initializeExtension = () => {
        init((sdk: any) => {
            sdk.window.startAutoResizer();
            let data = sdk.field.getValue();
            if (data && data.tableData && data.useHeaders) {
                setTableData(data.tableData);
                setHorizontalHeaders(data.useHeader);
            }
        });
    }

    useEffect(() => {
        initializeExtension();
    }, [])


    /**
     * Reserves the state of horizontal header state and updates contentful field value.
     */
    const handleToggleHorizontalHeaders = () => {
        console.log({ tableData });
        setHorizontalHeaders(!useHorizontalHeaders);
        updateTableStateAndField(tableData);
    }

    const handleToggleVerticalHeaders = () => {
        console.log({ tableData });
        setVerticalHeaders(!useVerticalHeaders);
        updateTableStateAndField(tableData);
    }


    /**
     * Reserves the state of vertical header state and updates contentful field value.
     */
    /** wrapper to ensure table changes synchronize with contentful field value changes. */
    const updateTableStateAndField = (tableData: any[]) => {
        // updating react component state
        setTableData(tableData);

        // // update the field value
        init((sdk: any) => {
            sdk.field.setValue({
                useHorizontalHeaders,
                useVerticalHeaders,
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
        let additionalRow = new Array(col).fill("");
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
                let row2 = row.concat(new Array(newColSize - row.length).fill(""));
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
                        <StyledTableCell useHeaderColor={false}>
                            <Button aria-label={`Delete row ${rowIdx}`} icon="Delete" onClick={() => removeSelectedRow(rowIdx)}></Button>
                        </StyledTableCell>
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
            let useHeaderColor = (useVerticalHeaders && cellIdx === 0) || (rowIdx == 0 && useHorizontalHeaders);
            return <StyledTableCell useHeaderColor={useHeaderColor}>
                {rowIdx === 0 ?
                    <StyledDeleteButton
                        icon="Delete"
                        aria-label={`Delete column ${cellIdx}`}
                        onClick={() => removeSelectedColumn(cellIdx)}>
                    </StyledDeleteButton>
                    : null
                }
                <TextField
                    name={`table-cell-y${rowIdx}-x${cellIdx}`}
                    id={`table-cell-y${rowIdx}-x${cellIdx}`}
                    labelText={``}
                    value={item}
                    aria-label={`Text field input for row ${rowIdx}, cell ${cellIdx}`}
                    onChange={e => updateCellData(e, rowIdx, cellIdx)}
                    textarea
                ></TextField>
            </StyledTableCell>
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
        // resetting value so re-uploading triggers onchange.
        e.target.value = null;
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
        if (useHorizontalHeaders) {
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
            <HorizontalDiv>
                <StyledLabel htmlFor="csv-file">
                    Import .csv
                </StyledLabel>
                <StyledFileInput id="csv-file" onChange={(e) => loadCsv(e)} type="file" accept=".csv"></StyledFileInput>
            </HorizontalDiv>
            <HorizontalDiv>
                <StyledToggleButton isActive={useVerticalHeaders} onToggle={handleToggleVerticalHeaders}
                >Vertical Headers</StyledToggleButton>
                <StyledToggleButton isActive={useHorizontalHeaders} onToggle={handleToggleHorizontalHeaders}
                >Horizontal Headers</StyledToggleButton>
            </HorizontalDiv>
            <HorizontalDiv>
                <StyledButton isFullWidth={true} buttonType="primary" size="small" icon="Plus" onClick={addRow} aria-label="Add new row">Row</StyledButton>
                <StyledButton isFullWidth={true} buttonType="primary" size="small" icon="Minus" onClick={removeRow} aria-label="Remove end row">Row</StyledButton>
                <StyledButton isFullWidth={true} buttonType="primary" size="small" icon="Plus" aria-label="Add new column" onClick={addCol}>Column</StyledButton>
                <StyledButton isFullWidth={true} buttonType="primary" size="small" icon="Minus" aria-label="Remove end column" onClick={removeEndCol}>Column</StyledButton>
            </HorizontalDiv>
            <StyledTableContainer>
                <Table>
                    {renderTable()}
                </Table>
            </StyledTableContainer>
            <Subheading>
                Grid Dimensions: {tableData.length} x {col}
            </Subheading>
            <HelpText>
                {'You can use basic text modifiers to alter text. bold: **your text**, strike through: ~~your text~~, underline: <u>your text</u>, links: [link title](link url)'}
            </HelpText>
        </>
    )
}

export default TableExtension;