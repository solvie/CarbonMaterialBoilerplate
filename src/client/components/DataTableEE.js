import React, { Component } from 'react';
import 'carbon-components/css/carbon-components.css';
import { DataTable } from "carbon-components-react";
const { Table, TableHead, TableHeader, TableBody, TableCell, TableContainer, TableRow } = DataTable;
    
// Given that we have the following rows with the fields `foo`, `bar`, and `baz`

class DataTableEE extends Component {
  render() {
    const rows = [
      {
        id: 'a',
        foo: 'Foo a',
        bar: 'Bar a',
        baz: 'Baz a',
      },
      {
        id: 'b',
        foo: 'Foo b',
        bar: 'Bar b',
        baz: 'Baz b',
      },
      {
        id: 'c',
        foo: 'Foo c',
        bar: 'Bar c',
        baz: 'Baz c',
      },
    ];
    
    // We would have a headers array like the following
    const headers = [
      {
        // `key` is the name of the field on the row object itself for the header
        key: 'foo',
        // `header` will be the name you want rendered in the Table Header
        header: 'Foo',
      },
      {
        key: 'bar',
        header: 'Bar',
      },
      {
        key: 'baz',
        header: 'Baz',
      },
    ];

    return (
      <DataTable
        rows={rows}
        headers={headers}
        render={({ rows, headers, getHeaderProps }) => (
          <TableContainer title="DataTable">
            <Table>
              <TableHead>
                <TableRow>
                  {headers.map(header => (
                    <TableHeader {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.id}>
                    {row.cells.map(cell => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      />
    );
  }
}

export default DataTableEE;