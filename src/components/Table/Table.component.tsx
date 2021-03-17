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
let headerColor = '#c3cfd5';

const StyledButton = styled(Button)`
    width: 25%%
`;

const StyledToggleButton = styled(ToggleButton)`
    margin: 0.25rem;
    width: 35% !important;
`;

const StyledFileInput = styled.input`
        display: none;
`;

const StyledLabel = styled.label`
    width: 25%;
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
        // th {
        //     // background-color: ${headerColor};
        // }
`;

const StyledTableCell = styled(TableCell) <{ useHeaderColor: boolean }>`
        padding 1rem;
        display: flex;
        align-items: center;
        justify-content: center; 
        flex-direction: column;
        ${props => props.useHeaderColor ? `background-color: ${headerColor} !important;` : null};
`;

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
    display: flex;
    flex-direction: row;
    justify-content: center;

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
            if (!! data) {
                if (!! data.tableData) {
                    setTableData(data.tableData);
                }
                if (typeof(data.useVerticalHeaders) == 'boolean') {
                    setVerticalHeaders(data.useVerticalHeaders);
                }
                if (typeof(data.useHorizontalHeaders) == 'boolean') {
                    setHorizontalHeaders(data.useHorizontalHeaders);
                }
            }
            
        });
    }

    useEffect(() => {
        storeFieldValues();
        // console.log({tableData});
        // console.log({useHorizontalHeaders});
        // console.log({useVerticalHeaders});
    }, [tableData, useHorizontalHeaders, useVerticalHeaders]);

    useEffect(() => {
        initializeExtension();
    }, [])

    /**
     * Reserves the state of horizontal header state and updates contentful field value.
     */
    const handleToggleHorizontalHeaders = () => {
        setHorizontalHeaders(!useHorizontalHeaders);
    }


    const handleToggleVerticalHeaders = () => {
        setVerticalHeaders(!useVerticalHeaders);
    }

    /** uses header and table state data and stores them in content field */
    const storeFieldValues = () => {
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
        setTableData(table);
    }

    const addCol = () => {
        console.log("adding col");
        let newColSize = col + 1;
        setColumnSize(newColSize);
        // go through all the pre-existing rows and increase their size.
        let newTable = normalize2DArrayLength([...tableData], newColSize);
        setTableData(newTable)
    }

    const normalize2DArrayLength = (arr: any, size: number) => {
        console.log({size});
        arr.forEach((row: any, index: number) => {
            if (row.length < size) {
                // increase the row size.
                let row2 = row.concat(new Array(size - row.length).fill(""));
                console.log(row2);
                arr[index] = row2;
            } if (row.length > size) {
                arr[index] = row.slice(0, size);

            }
        });
        return arr;
    }

    /**
     * reduces the column size for the next row to be created
     */
    const removeEndCol = () => {
        console.log('removing col');
        if (col <= 0) {
            return;
        }
        let newColumnSize = col - 1;
        setColumnSize(newColumnSize);
        // go through all the pre-existing rows and increase their size.
        let newTable = normalize2DArrayLength([...tableData], newColumnSize);
        setTableData(newTable);
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
        setTableData(newTableData);
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
                        {col > 0 ?
                            <StyledTableCell useHeaderColor={false}>
                                <Button aria-label={`Delete row ${rowIdx}`} icon="Delete" onClick={() => removeSelectedRow(rowIdx)}></Button>
                            </StyledTableCell> : null
                        }
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
        setTableData(newTableData);
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
                if (typeof (csvText) == 'string') {
                    csvToTable(csvText);
                }
            }
        };
        reader.readAsText(files[0]);
        // resetting value so re-uploading triggers onchange.
        e.target.value = null;
    }


    const csvToCells = (str: string) => {

        if (str === "" || str === "\n") {
            return [];
        }

        let curCellText: any = "";
        let cells: string[] = [];
        let inQuotes: boolean = false;

        for (let i = 0; i < str.length; i++) {
            let char = str[i];

            if (char === ',') {
                if (!inQuotes) {
                    // separate cell at comma, reset cell text
                    cells.push(curCellText);
                    curCellText = '';
                } else {
                    // dont separate as a cell, add as a displayed comma.
                    curCellText += char;
                }
            }
            else if (char === '"') {
                // if theres a starting quote, activate inQuotes
                if (inQuotes) {
                    // close existing quote
                    inQuotes = false;
                }
                else {
                    if (str.indexOf('"', i + 1) > -1) {
                        // another quote to come - start quote block
                        inQuotes = true;
                    } else {
                        // no more quotes, add as a solitary quote character.
                        curCellText += char;
                    }
                }
            } else {
                // regular character, append to the cell text
                curCellText += char;
            }
        }
        cells.push(curCellText); // push final cell
        return cells;
    }

    /**
     * Converts a csv formatted text into a 2D table data array.
     */
    const csvToTable = (text: string) => {
        let maxCols = 0;
        let lines = text.split('\n');

        // removing trailing newline character
        if (lines[lines.length - 1] == "") {
            lines.splice(lines.length - 1);
        }

        // convert text into tablerow arrays
        let newTableData = lines.map((line: string) => {
            let cells = csvToCells(line);
            // update column setting for the table
            maxCols = maxCols < cells.length ? cells.length : maxCols;
            return cells;
        });
        setColumnSize(maxCols);
        let normalizedTableData = normalize2DArrayLength(newTableData, maxCols)
        setTableData(normalizedTableData);
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
        console.log('removing selected row');
        let newTableData = [...tableData];
        newTableData.splice(rowIndex, 1);
        setTableData(newTableData);
    }

    const removeSelectedColumn = (colIndex: number) => {
        console.log('removing selected row');
        let newTableData = [...tableData];
        newTableData.forEach(row => {
            row.splice(colIndex, 1);
        });
        setColumnSize(col - 1);
        setTableData(newTableData);
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