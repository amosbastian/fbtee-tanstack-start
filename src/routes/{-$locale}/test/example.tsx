import { createFileRoute } from "@tanstack/react-router";
import { fbt } from "fbtee";

export const Route = createFileRoute("/{-$locale}/test/example")({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: fbt("Hello, World!", "Greeting").toString() }],
  }),
});

function RouteComponent() {
  return <div>Hello "/-$locale/test/example"!</div>;
}
