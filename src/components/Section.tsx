import React from "react";

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

export default function Section({ title, children }: SectionProps) {
  return (
    <section className="section">
      <h2 className="section-title">{title}</h2>
      <div>{children}</div>
    </section>
  );
}
