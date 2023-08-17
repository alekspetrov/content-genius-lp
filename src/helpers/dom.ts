import { onCleanup } from "solid-js";

export function clickOutside(el: Element, accessor: () => () => void) {
  const onClick = (e: Event) => {
    return !el.contains(e.target as Node) && accessor()?.();
  };

  document.body.addEventListener("click", onClick);

  onCleanup(() => {
    document.body.removeEventListener("click", onClick);
  });
}
