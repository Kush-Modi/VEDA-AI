export function StudentInfo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 my-8 p-6 bg-secondary/30 rounded-xl border border-border/50">
      <div className="flex items-end gap-3">
        <span className="font-semibold whitespace-nowrap">Name:</span>
        <div className="flex-1 border-b border-dashed border-muted-foreground/50 h-5" />
      </div>
      <div className="flex items-end gap-3">
        <span className="font-semibold whitespace-nowrap">Roll Number:</span>
        <div className="flex-1 border-b border-dashed border-muted-foreground/50 h-5" />
      </div>
      <div className="flex items-end gap-3 md:col-span-2">
        <span className="font-semibold whitespace-nowrap">Class & Section:</span>
        <div className="flex-1 border-b border-dashed border-muted-foreground/50 h-5" />
      </div>
    </div>
  );
}
