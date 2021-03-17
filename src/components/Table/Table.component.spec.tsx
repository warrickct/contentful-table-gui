import React from 'react';
import TableExtension from './Table.component';

import { render } from '@testing-library/react';

describe('Table', () => {

    it('Component exists', () => {
        const { getByText } = render(<TableExtension></TableExtension>)
        expect( getByText('Column')).toBeInTheDocument();
    })
})

