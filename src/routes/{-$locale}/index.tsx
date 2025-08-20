import { createFileRoute } from "@tanstack/react-router";
import { fbt } from "fbtee";

export const Route = createFileRoute("/{-$locale}/")({
  component: Home,
});

function Home() {
  const greeting = fbt("Hello, World!", "Greeting");

  return (
    <div>
      <h1 className="text-4xl text-black">
        <fbt desc="Greeting">Welcome</fbt>
      </h1>
      {greeting}
    </div>
  );
}
