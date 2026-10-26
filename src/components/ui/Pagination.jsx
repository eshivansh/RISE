export default function Pagination({ page, totalPages, onChange }) {
  return (
    <div className="pagination">
      <button type="button" disabled={page === 1} onClick={() => onChange(page - 1)}>
        Prev
      </button>
      <span>Page {page} of {totalPages}</span>
      <button type="button" disabled={page === totalPages} onClick={() => onChange(page + 1)}>
        Next
      </button>
    </div>
  );
}
