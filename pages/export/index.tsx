import { GetServerSideProps } from 'next';
import React, { useState } from 'react';

const Export = ({ data }: any) => {
  const itemsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState(data);
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: string | null }>({
    key: null,
    direction: null,
  });

  // Function to handle pagination
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Function to handle filtering
  const handleFilter = (searchTerm: string) => {
    const filteredResults = data.filter((item: any) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(filteredResults);
  };

  // Function to handle sorting
  const handleSort = (key: string) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedData = [...filteredData].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];
      
      if (direction === 'asc') {
        return aValue?.localeCompare(bValue);
      } else {
        return bValue?.localeCompare(aValue);
      }
    });
    setFilteredData(sortedData);
  };

  // Calculate pagination boundaries
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentData = filteredData.slice(firstIndex, lastIndex);

  return (
    <div>
      {/* Filter input */}
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => handleFilter(e.target.value)}
      />

      {/* Table header */}
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>ID</th>
            <th onClick={() => handleSort('name')}>Name</th>
            <th onClick={() => handleSort('email')}>Email</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {/* Render table rows */}
          {currentData.map((item: any) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              {/* Add more cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div>
        {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }).map((_, index) => (
          <button key={index} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
    const data = [
        { id: "1", name: 'michael', email: 'fdgsadgf@rrr.com' },
        { id: "2", name: 'ertyerty', email: 'gfhmndnh@rrr.com' },
        { id: "3", name: 'ukjertywrty', email: 'nghnfdx@rrr.com' },
        { id: "4", name: 'nbveehgj', email: 'sdfg@rrr.com' },
        { id: "5", name: 'wrt6yjhfd', email: 'xcvbcx@rrr.com' },
        { id: "6", name: 'netwrtiwe', email: 'mthnew@rrr.com' },
        { id: "7", name: 'ujndsfgjeds', email: 'jtergfbw@rrr.com' },
        { id: "8", name: 'zdgjherthert', email: 'kiuteh@rrr.com' },
    ]
    return {
      props: {
        data
      },
    }
  }

export default Export;