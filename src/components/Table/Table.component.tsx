import React, { Component, useState } from 'react';
import { Button } from '@contentful/forma-36-react-components';
import '@contentful/forma-36-react-components/dist/styles.css';

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
    const [rowCount, setRowCount] = useState([]);
    const [colCount, colCount] = useState(0);

    const [tableData, setTableData] = useState(null);

    // thoughts: adding row / cell alter the data, re-render the whole table based on when the data model changes.
    // adding row/ column will add empty table objects which will be rendered 

    const addRow = () => {
        // little bit of admin surrounding adding row. If row is reduced and data inside, maybe add alert?
        setRowCount(rowCount.push([]))
        
    }

    const addCell = () => {
        
    }

    return (
        <>
            <table>
                <tr>
                    <td>
                        <div>hi</div>
                    </td>
                </tr>
            </table>
            <Button buttonType="primary">Add Row</Button>
            <Button buttonType="primary">Add Column</Button>
        </>
    )
}

export default Table;