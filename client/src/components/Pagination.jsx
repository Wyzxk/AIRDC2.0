import React, { useEffect } from "react";

export function Pagination({ nPages, currentPage, setCurrentPage }) {
  // This effect runs when the number of pages (nPages) changes.
  // It sets the current page to 1 when the number of pages changes.
  useEffect(() => {
    setCurrentPage(1);
  }, [nPages]);

  // Function to move to the next page
  const next = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };

  // Function to move to the previous page
  const prev = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  // Handles click on a specific page number
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generates the page numbers and stores them in the pageNumbers array
  const pageNumbers = [];
  for (let i = 1; i <= nPages; i++) {
    pageNumbers.push(
      <p
        key={i}
        // Determines CSS classes based on whether the current page is equal to i
        className={`text-sm font-medium leading-none cursor-pointer ${
          currentPage === i
            ? "text-sm font-medium leading-none cursor-pointer text-indigo-700 border-t border-indigo-400 pt-3 mr-4 px-2"
            : "text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400"
        } pt-3 mr-4 px-2`}
        // Calls the handlePageClick function with the corresponding page number when clicked
        onClick={() => handlePageClick(i)}
      >
        {i}
      </p>
    );
  }

  // Returns the pagination component
  return (
    <div className="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
      <div className="lg:w-3/5 w-full  flex items-center justify-between border-t border-gray-200">
        <div
          className="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer"
          onClick={prev}
        >
          <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.1665 4H12.8332"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1.1665 4L4.49984 7.33333"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1.1665 4.00002L4.49984 0.666687"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-sm ml-3 font-medium leading-none">Previous</p>
        </div>
        <div className="sm:flex hidden">{pageNumbers}</div>
        <div
          className="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer"
          onClick={next}
        >
          <p className="text-sm font-medium leading-none mr-3">Next</p>
          <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.1665 4H12.8332"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.5 7.33333L12.8333 4"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.5 0.666687L12.8333 4.00002"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
