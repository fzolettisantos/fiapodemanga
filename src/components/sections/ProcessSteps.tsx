import { ProcessIcon } from "./ProcessIcon";

type Step = { number: string; title: string; description: string };

export function ProcessSteps({ steps }: { steps: readonly Step[] }) {
  return (
    <div className="process-steps relative">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-line">
        <div className="process-line h-full origin-left scale-x-100 bg-accent" />
      </div>
    <ol className="grid sm:grid-cols-2 lg:grid-cols-5">
      {steps.map((step, index) => (
        <li
          key={step.number}
          data-reveal
          style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
          className="border-b border-line py-8 sm:pr-8 lg:border-b-0 lg:border-l lg:px-6 lg:py-10 lg:first:border-l-0 lg:first:pl-0"
        >
          <ProcessIcon index={index} />
          <p className="index-number mt-8 flex items-center gap-3 text-sm">
            <span
              aria-hidden="true"
              className="process-dot size-2.5 rounded-full border border-accent bg-accent"
              style={{ "--i": index } as React.CSSProperties}
            />
            {step.number}/
          </p>
          <h3 className="type-subheading mt-6">{step.title}</h3>
          <p className="type-body mt-4 text-muted">{step.description}</p>
        </li>
      ))}
    </ol>
    </div>
  );
}
