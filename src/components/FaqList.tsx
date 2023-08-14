import { createSignal, For, Show } from "solid-js";

const FAQ_DATA = [
  {
    question: "What is Content Genius?",
    answer:
      "Content Genius is a web-based SaaS product that uses AI-powered chat assistants and note-taking capabilities to help content creators generate high-quality content quickly and efficiently.",
  },
  {
    question: "How does Content Genius work?",
    answer:
      "Users can chat with context-aware AI assistants to find ideas and create notes to collect messages and change note content with AI assistance.",
  },
  {
    question: "Who can benefit from Content Genius?",
    answer:
      "Content creators, marketers, social media managers and any kind of professionals who need to generate high-quality content quickly and efficiently can benefit from Content Genius.",
  },
  {
    question: "How can I get started with Content Genius?",
    answer:
      "You can sign up for a free trial on the Content Genius website. Once you create an account, you can start using the platform right away.",
  },
  {
    question: "Is Content Genius easy to use?",
    answer:
      "Yes, Content Genius is designed to be user-friendly and easy to use. The chat assistants and note-taking features are intuitive and can help streamline the content creation process.",
  },
  {
    question: "Can Content Genius help me come up with new content ideas?",
    answer:
      "Yes, the AI-powered chat assistants can help you generate new content ideas by suggesting topics and providing inspiration.",
  },
  {
    question: "Is my content safe on Content Genius?",
    answer:
      "Yes, Content Genius takes data privacy and security very seriously. The platform uses industry-standard encryption and security protocols to protect your data.",
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
      class="border border-gray-200 pl-8 pr-4 py-4 space-y-4 bg-white text-left block w-full rounded-md"
    >
      <div class="flex items-center justify-between w-full">
        <div class="md:text-lg font-semibold text-gray-150">
          {props.item.question}
        </div>
        <div class="text-gray-450">
          <IconPlus />
        </div>
      </div>
      <Show when={openItemIndex() === props.index}>
        <div>{props.item.answer}</div>
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
