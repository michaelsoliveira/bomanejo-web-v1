import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

const SelectableRowList = ({ data, callBack }: any) => {
  const [selectedRows, setSelectedRows] = useState<any>([]);

  const handleRowClick = (rowId: any) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter((id: any) => id !== rowId));
      callBack(selectedRows.filter((id: any) => id !== rowId))
    } else {
      setSelectedRows([...selectedRows, rowId]);
      callBack([...selectedRows, rowId])
    }
  };

  const handleSelectAll = () => {
    if (selectedRows?.length < data?.length) {
      setSelectedRows(data.map(({ id }: any) => id));
      callBack(data.map(({ id }: any) => id))
    } else {
      setSelectedRows([]);
      callBack([])
    }
};

  return (
    <div className='w-full'>
      <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem] text-sm">
        <input
          className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault"
          checked={selectedRows?.length === data?.length}
          onChange={handleSelectAll}  
        />
          <label className="inline-block pl-[0.15rem] hover:cursor-pointer">
            Selecionar Todos
        </label>
      </div>
        
      <ul className="text-sm text-gray-900 bg-white border border-gray-200 rounded-lg h-[25rem] overflow-y-auto">
      {data.map((row: any, idx: number) => (
        <li 
            key={row.id}
            onClick={() => handleRowClick(row.id)}
            className={
              classNames(
                selectedRows.includes(row.id) && (idx === 0 ? 'rounded-t-lg text-white bg-blue-700' : 'text-white bg-blue-700'),
                (idx === 0 && 'border-t-lg'),
                (idx === data.length -1 && 'rounded-b-lg border-b-lg'),
                (idx < data.length-1 && 'border-b'),
                (!selectedRows.includes(row.id) && 'hover:bg-gray-100 hover:text-blue-700'),
                'block w-full px-4 py-2 border-gray-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700'
              )
            }
          >
            {row.label}
          </li>
          )
        )}
      </ul>
    </div>
  );
};

export default SelectableRowList;