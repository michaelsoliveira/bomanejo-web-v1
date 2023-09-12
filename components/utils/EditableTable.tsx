import classNames from "classnames";
import React, { useState } from "react";
import { SortIcon, SortUpIcon, SortDownIcon } from './Icons'
const { useTable, useFilters, useGlobalFilter, useAsyncDebounce, useSortBy, usePagination } = require('react-table')

const EditableTable = ({ columns, data, setData, handleButtonClick, disabledSort }: any) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
      initialState: { hiddenColumns: ['id'] }
    },
    useFilters, // useFilters!
    useGlobalFilter,
    useSortBy,
    usePagination)

  const handleInputChange = (event: any, row: any, columnId: any) => {
    const newData = data.map((rowData: any) => {
      if (rowData.id === row.original.id) {
        return { ...rowData, [columnId]: event.target.value };
      }
      return rowData;
    });
    setData(newData);
  }

  const isEven = (idx: number) => idx % 2 === 0

  return (
    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 h-96 overflow-y-auto">
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
          <thead>
            {headerGroups.map((headerGroup: any, key: any) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={key}>
                {headerGroup.headers.map((column: any, i: any) => (
                  <th
                    key={i}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className="flex flex-row">
                    {column.render("Header")}
                    {/* Add a sort direction indicator */}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? <SortDownIcon className="w-4 h-4 text-gray-400" />
                          : <SortUpIcon className="w-4 h-4 text-gray-400" />
                        : (
                          <SortIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                        )}
                    </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-300 w-full">
            {rows.map((row: any, i: number) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} 
                    key={i}
                    className={classNames('hover:bg-indigo-200 hover:bg-opacity-10', isEven(i) ? 'bg-gray-200 bg-opacity-25' : '')}>
                    {row.cells.map((cell: any, i: any) => {
                    return (
                      <td
                        key={i}
                        {...cell.getCellProps()}
                        className="px-6 py-4 whitespace-nowrap"
                      >
                        {cell.column?.editEnable ? (
                          row.original?.isEditing ? (
                            <input
                            type="text"
                            defaultValue={cell.value}
                            onChange={(e) =>
                              handleInputChange(e, row, cell.column.id)
                            }
                            className={classNames([
                              'relative inline-flex px-2 py-1 w-full rounded leading-none transition-colors ease-in-out placeholder-gray-500 text-gray-700 border border-gray-300 hover:border-blue-400 focus:outline-none focus:border-blue-400 focus:ring-blue-400 focus:ring-4 focus:ring-opacity-30',
                            ])}
                          />
                          ) : (
                            cell.render("Cell")
                          )
                        ) : (
                          cell.render("Cell")
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditableTable