interface Props {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({
  title,
  subtitle,
}: Props) {
  return (
    <div className="mb-12 text-center">
      <h2 className="text-4xl font-bold text-white">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-3 text-slate-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}