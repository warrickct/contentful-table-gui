import React, { useEffect, useState } from 'react';
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
import { init } from "@contentful/app-sdk";

const TableHeader = styled.th`
    background-color: pink;
`;

// interface TableCellProps {
//     useHeader: boolean;
// }


// max-width: ${window.innerWidth};
// overflow-x: auto;
// background-color: green;
// padding: 1rem;

const TableContainer = styled.div`
    width: 100%;
    overflow-x: auto;
    padding: 1rem;

`;
// .table---fixed {
//     table-layout: auto;
//     width: 100%;
// }

const CustomTableCell = styled.td`
    padding: 0rem;
`;
// TODO: Add dynamic header color based on state -- background-color: ${(props: TableCellProps) => props.useHeader ? "#ffffff" : "#e2e2e2"};

const StyledTableRow = styled(TableRow)`
    background-color: ${(props: any) => props.headers === 'true' ? "#e1e7eb" : 'white'}
`;


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

    // a set of rows.
    const [tableData, setTableData] = useState<any[]>([]);
    const [row, setRow] = useState<string[]>([]);
    const [col, setCol] = useState<number>(0);
    const [useHeader, setHeader] = useState(true);


    useEffect(() => {
        initializeExtension();
    }, [])

    const handleToggleHeader = () => {
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
        console.log({ tableData });
        setCol(col + 1);
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
            return <StyledTableRow headers={`${useHeader && rowIdx == 0}`} key={"row" + rowIdx}>
                {renderRow(row, rowIdx)}
            </StyledTableRow>
        });
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
                    value={item}
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
        // <TableContainer></TableContainer>
        <>
            <TableContainer>
                <Table className="table---fixed">
                    <TableHead>
                    </TableHead>
                    <TableBody>
                        {renderTableRows()}
                    </TableBody>
                </Table>
            </TableContainer>
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
                <Button buttonType="primary" size="small" onClick={removeCol}>Remove Column</Button>
            </HorizontalDiv>
        </>
    )
}

export default TableExtension;

// build the html for the rows, create the data on save? Data should be a variable as it's to re-render the page.