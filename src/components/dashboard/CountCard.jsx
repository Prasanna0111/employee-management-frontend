export default function CountCard({ count, title }) {
  return (
    <div className="count-card flex flex-column gap-1">
      <div className="txt-primary text-2xl">{count}</div>
      <div className="txt-secondary text-xl">{title}</div>
    </div>
  );
}
