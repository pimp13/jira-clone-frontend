import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Home() {
  return (
    <div>
      <Input placeholder="hello input" />
      <Button>Click Me!</Button>
      <Button disabled variant="destructive">
        Click Me!
      </Button>
      <Button variant="secondary">Click Me!</Button>
      <Button variant="ghost">Click Me!</Button>
      <Button variant="muted">Click Me!</Button>
      <Button variant="teritary">Click Me!</Button>
      <Button size="lg" variant="outline">
        Click Me!
      </Button>
    </div>
  );
}
