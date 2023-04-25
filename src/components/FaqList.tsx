import { createSignal, For, Show } from "solid-js";

const FAQ_DATA = [
  {
    question: "What if...",
    answer: "This is!",
  },
  {
    question: "What if...",
    answer: "This is!",
  },
];

const IconPlus = () => {
  return (
    <svg
      class="stroke-current"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      xmlns="http://www.w3.org/2000/svg"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M12 5.78125V19.7812" />
      <path d="M5 12.7812H19" />
    </svg>
  );
};

const [openItemIndex, setOpenItemIndex] = createSignal(undefined);

function handleOpenItem(index) {
  if (index === openItemIndex()) setOpenItemIndex();
  else setOpenItemIndex(index);
}

function FaqListItem(props) {
  return (
    <button
      onClick={[handleOpenItem, props.index]}
      class="pl-8 pr-4 py-4 space-y-4 bg-gray-600 text-left block w-full rounded-md"
    >
      <div class="flex justify-between w-full ">
        <div class="text-lg font-semibold text-gray-150">
          {props.item.question}
        </div>
        <div class="text-gray-450">
          <IconPlus />
        </div>
      </div>
      <Show when={openItemIndex() === props.index}>
        <div class="">{props.item.answer}</div>
      </Show>
    </button>
  );
}

function FaqList() {
  return (
    <div class="space-y-2">
      <For each={FAQ_DATA}>
        {(question, idx) => <FaqListItem item={question} index={idx()} />}
      </For>
    </div>
  );
}

export default FaqList;
