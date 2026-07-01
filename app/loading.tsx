export default function Loading() {
  return (
    <div className="skeleton-page">
      <div className="skeleton wide" />
      <div className="skeleton-grid">{Array.from({ length: 8 }).map((_, i) => <div className="skeleton card" key={i} />)}</div>
    </div>
  );
}
