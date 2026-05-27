export function NoAssignmentsIllustration() {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto text-primary/20"
    >
      <rect x="50" y="30" width="100" height="140" rx="12" fill="currentColor" opacity="0.2" />
      <rect x="65" y="60" width="70" height="8" rx="4" fill="currentColor" opacity="0.5" />
      <rect x="65" y="80" width="50" height="8" rx="4" fill="currentColor" opacity="0.5" />
      <rect x="65" y="100" width="60" height="8" rx="4" fill="currentColor" opacity="0.5" />
      <rect x="65" y="120" width="70" height="8" rx="4" fill="currentColor" opacity="0.5" />
      
      <circle cx="140" cy="150" r="30" fill="currentColor" opacity="0.8" />
      <path d="M130 150L137 157L150 144" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      
      <circle cx="60" cy="40" r="8" fill="#F97316" />
      <circle cx="160" cy="60" r="12" fill="#F97316" opacity="0.5" />
      <path d="M40 160L50 140L60 160Z" fill="#F97316" opacity="0.6" />
    </svg>
  );
}
