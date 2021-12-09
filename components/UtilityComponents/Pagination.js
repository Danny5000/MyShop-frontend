function Pagination({ handleBack, handleForward, page, isNextPageEmpty }) {
  return (
    <span className="flex items-center pt-4">
      <button
        onClick={handleBack}
        disabled={page === 1}
        className={`buttonGreen ${page === 1 ? "cursor-not-allowed" : null}`}
      >
        Previous Page
      </button>
      <p className="pl-4 pr-4">{`Page ${page}`}</p>
      <button
        disabled={isNextPageEmpty}
        onClick={handleForward}
        className={`buttonGreen ${
          isNextPageEmpty ? "cursor-not-allowed" : null
        }`}
      >
        Next Page
      </button>
    </span>
  );
}

export default Pagination;
