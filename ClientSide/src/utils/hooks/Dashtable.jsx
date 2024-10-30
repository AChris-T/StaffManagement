import { sampleData } from '@/db/data';
import { useMemo, useState } from 'react';

export default function Dashtable() {
  const [data] = useState(sampleData);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(5);

  const totalPages = useMemo(
    () => Math.ceil(data.length / rowPerPage),
    [data, rowPerPage]
  );
  const total = data.length;

  const currentData = useMemo(() => {
    const startIdx = (currentPage - 1) * rowPerPage;
    return data.slice(startIdx, startIdx + rowPerPage);
  }, [data, currentPage, rowPerPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = Number(event.target.value);
    setRowPerPage(newRowsPerPage);
    setCurrentPage(1);
  };
  const currentDataRange = `${(currentPage - 1) * rowPerPage + 1} to ${Math.min(
    currentPage * rowPerPage,
    data.length
  )}`;
  return {
    data: currentData,
    totalPages,
    currentPage,
    rowPerPage,
    currentDataRange,
    dataCount: data.length,
    handlePageChange,
    handleNextPage,
    handlePrevPage,
    handleRowsPerPageChange,
    total,
  };
}
