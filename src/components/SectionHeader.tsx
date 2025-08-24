import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('flex flex-col md:flex-row md:items-center md:justify-between mb-10', className)}>
      <div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
        <p className="text-gray-400 my-2">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

export function SectionAction({ className, ...props }:{className:string}) {
  return (
    <Button
      variant="outline"
      className={cn('mt-4 md:mt-0', className)}
      {...props}
    />
  );
}