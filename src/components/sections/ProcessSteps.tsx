type Step = { number: string; title: string; description: string };

export function ProcessSteps({ steps }: { steps: readonly Step[] }) {
  return (
    <ol className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-5">
      {steps.map((step, index) => (
        <li
          key={step.number}
          data-reveal
          style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
          className="border-b border-line py-8 sm:pr-8 lg:border-b-0 lg:border-l lg:px-6 lg:py-10 lg:first:border-l-0 lg:first:pl-0"
        >
          <p className="index-number text-sm">{step.number}/</p>
          <h3 className="type-subheading mt-6">{step.title}</h3>
          <p className="type-body mt-4 text-muted">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
