'use client';

import { useState } from 'react';

export default function ExpandableDescription({ description, preview }: { description: string; preview: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
        {expanded ? description : preview}
      </p>
      <button
        type="button"
        onClick={() => setExpanded((previous) => !previous)}
        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#b68235] transition hover:text-[#8d5d1a]"
      >
        {expanded ? 'Read less' : 'Read more'}
        <span aria-hidden="true">{expanded ? '\u2212' : '+'}</span>
      </button>
    </>
  );
}