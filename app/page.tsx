import { Button } from "@/components/ui/button";
import { TestComponent } from "@/features/test";

export default function Home() {
  return (
    <div>
      <Button>Click Me!</Button>
      <Button variant="destructive">Click Me!</Button>
      <Button variant="secondary">Click Me!</Button>
      <Button variant="ghost">Click Me!</Button>
      <Button variant="muted">Click Me!</Button>
      <Button variant="teritrary">Click Me!</Button>
      <Button variant="outline">Click Me!</Button>
      <TestComponent />
    </div>
  );
}
