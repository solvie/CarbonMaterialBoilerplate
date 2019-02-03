import React, { Component } from 'react';
import 'carbon-components/css/carbon-components.css';
import { DataTable } from 'carbon-components-react';

const {
  Table, TableHead, TableHeader, TableBody, TableCell, TableContainer, TableRow
} = DataTable;

// Given that we have the following rows with the fields `foo`, `bar`, and `baz`

class DataTableChildren extends Component {
  render() {
    const rows = [
      {
        name: 'Angela Cortez',
        assigned: 'Beatriz',
        tasks: '3',
        status: 'NEW'
      },
      {
        name: 'Pablo Cortez',
        assigned: 'Beatriz',
        tasks: '2',
        status: 'ADOPTION ONGOING'
      }
    ];

    // We would have a headers array like the following
    const headers = [
      {
        // `key` is the name of the field on the row object itself for the header
        key: 'name',
        // `header` will be the name you want rendered in the Table Header
        header: 'Full Name',
      },
      {
        key: 'assigned',
        header: 'Assigned',
      },
      {
        key: 'tasks',
        header: 'Tasks',
      },
      {
        key: 'status',
        header: 'Status',
      }
    ];

    return (
      <DataTable
        rows={rows}
        headers={headers}
        render={({ rows, headers, getHeaderProps }) => (
          <TableContainer title="Children">
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

export default DataTableChildren;
