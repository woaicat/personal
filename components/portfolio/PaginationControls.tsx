type PaginationControlsProps = {
  page: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  sectionClassName?: string;
  containerClassName?: string;
};

export function PaginationControls({
  page,
  totalPages,
  onPrevious,
  onNext,
  sectionClassName = "",
  containerClassName = "container pager"
}: PaginationControlsProps) {
  return (
    <section className={`pagination${sectionClassName ? ` ${sectionClassName}` : ""}`}>
      <div className={containerClassName}>
        <button className="btn btn-ghost" type="button" onClick={onPrevious} disabled={page <= 1}>
          上一页
        </button>
        <span>
          第 {page} 页，共 {totalPages} 页
        </span>
        <button className="btn btn-ghost" type="button" onClick={onNext} disabled={page >= totalPages}>
          下一页
        </button>
      </div>
    </section>
  );
}
