import { Card, CardContent, CardHeader } from '../ui/card';

export function AssignmentSkeleton() {
  return (
    <Card className="overflow-hidden bg-white border-border/50 animate-pulse">
      <CardHeader className="pb-3 flex flex-row items-start justify-between space-y-0">
        <div className="h-6 bg-secondary w-3/4 rounded-md"></div>
        <div className="h-8 w-8 bg-secondary rounded-full"></div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="h-8 bg-secondary/50 w-full rounded-md"></div>
          <div className="h-8 bg-secondary/50 w-full rounded-md"></div>
        </div>
      </CardContent>
    </Card>
  );
}

export function AssignmentGridSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          <div className="h-8 bg-secondary w-48 rounded-md animate-pulse"></div>
          <div className="h-4 bg-secondary/50 w-64 rounded-md animate-pulse"></div>
        </div>
        <div className="flex w-full md:w-auto items-center gap-3">
          <div className="h-10 bg-secondary w-full md:w-64 rounded-md animate-pulse"></div>
          <div className="h-10 w-10 bg-secondary rounded-md animate-pulse"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <AssignmentSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
