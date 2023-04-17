import React from 'react';

const styles = {
  buttonStyle : {
    backgroundColor: "#ffffff",
    border: "1px solid #cccccc",
    borderRadius: "4px",
    color: "#333333",
    cursor: "pointer",
    fontWeight: 500,
    margin: "0 5px",
    padding: "6px 12px"
  },
  ort : {
    display: "flex",
     justifyContent: "center",
      marginTop: '20px' 
  }
}
const PaginationButtons = ({ startPage, endPage, handlePageChange }) => {
  return (
    <>
      {Array.from({ length: endPage - startPage + 1}, (_, i) => startPage + i).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          style={ styles.buttonStyle }
        >
          {page}
        </button>
      ))}
    </>
  );
}



const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {

  let startPage, endPage;
  if (totalPages <= 5) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= 3) {
      startPage = 1;
      endPage = 5;
    } else if (currentPage + 2 >= totalPages) {
      startPage = totalPages - 4;
      endPage = totalPages;
    } else {
      startPage = currentPage - 2;
      endPage = currentPage + 2;
    }
  }

  return (
    <div>
      <div style={ styles.ort }>
        <PaginationButtons startPage={startPage} endPage={endPage} handlePageChange={onPageChange} />
      </div>
    </div>
  );
}

export default CustomPagination;

