// get data from the form
// make requst to api

import { For, createEffect, createSignal, onCleanup } from "solid-js";
import { clickOutside } from "../helpers/dom";

const clickOut = clickOutside;

const TARGET_URL = "/tools/paraphrasing";

type Tone = {
  text: string;
  value: string;
};

const TONES = [
  {
    text: "Friendly",
    value: "friendly",
  },
  {
    text: "Authoritative",
    value: "authoritative",
  },
  {
    text: "Professional",
    value: "professional",
  },
  {
    text: "Inspirational",
    value: "inspirational",
  },
  {
    text: "Sarcastic",
    value: "sarcastic",
  },
  {
    text: "Humorous",
    value: "humorous",
  },
  {
    text: "Persuasive",
    value: "persuasive",
  },
  {
    text: "Informative",
    value: "informative",
  },
  {
    text: "Casual",
    value: "casual",
  },
  {
    text: "Sympathetic",
    value: "sympathetic",
  },
];

const FormParaphrase = () => {
  const [content, setContent] = createSignal("");
  const [tone, setTone] = createSignal<Tone>(TONES[0]);
  const [showOptions, setShowOptions] = createSignal(false);

  function handleSetTone(value: Tone) {
    setTone(value);
    setShowOptions(false);
  }

  function escListener(event: KeyboardEvent) {
    if (event.key === "Escape") setShowOptions(false);
  }

  createEffect(() => {
    if (window !== undefined) {
      window.addEventListener("keydown", escListener);
      onCleanup(() => window.removeEventListener("keydown", escListener));
    }
  });

  function submit() {
    const url = `https://app.contentgenius.io/tools/paraphrasing/?content=${content()}&tone=${
      tone().value
    }&targetUrl=${TARGET_URL}`;

    window.location.href = url;
  }

  return (
    <div class="p-8 bg-white border border-gray-200 rounded-md">
      <div class="flex items-center gap-4 mb-8">
        <div class="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full text-pink-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-list-restart"
          >
            <path d="M21 6H3"></path>
            <path d="M7 12H3"></path>
            <path d="M7 18H3"></path>
            <path d="M12 18a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L11 14"></path>
            <path d="M11 10v4h4"></path>
          </svg>
        </div>
        <div class="text-xl font-semibold text-gray-900">Paraphrasing</div>
      </div>
      <div class="flex flex-col">
        <label for="content" class="font-medium mb-2">
          What content would you like to paraphrase?
        </label>
        <textarea
          id="content"
          name="content"
          class="border px-4 py-4 rounded-md"
          value={content()}
          onKeyUp={(e: Event) =>
            setContent((e.target as HTMLInputElement).value)
          }
          placeholder="Place original content..."
          maxLength={1000}
        />
        <div class="text-right">
          <span class="text-pink-500 text-sm font-medium">
            {content().length}/1000
          </span>
        </div>
      </div>
      <div class="flex flex-col mb-8 relative">
        <label for="content" class="font-medium mb-2">
          Choose a tone
        </label>
        <button class="text-left block" onClick={() => setShowOptions(true)}>
          <div class="border px-4 py-4 rounded-md appearance-none bg-[url(/icons/cheveron-down.svg)] bg-no-repeat bg-[right_16px_top_16px] bg-[length:20px_20px]">
            {tone().text}
          </div>
        </button>
        {showOptions() && (
          <div
            // @ts-expect-error
            use:clickOut={() => setShowOptions(false)}
            class="absolute top-[100%] z-30 w-full bg-white py-2 border border-gray-200 shadow-lg mt-1 rounded-md"
          >
            <For each={TONES}>
              {(tone) => (
                <button
                  class="block w-full text-left px-4 py-2 hover:bg-gray-100 transition cursor-pointer"
                  onClick={() => handleSetTone(tone)}
                >
                  {tone.text}
                </button>
              )}
            </For>
          </div>
        )}
      </div>
      <div>
        <button
          onClick={submit}
          class="inline-block bg-[#D7009B] text-fuchsia-50 px-4 py-2 md:px-6 md:py-3 font-medium rounded-full whitespace-nowrap"
        >
          Paraphrase
        </button>
      </div>
    </div>
  );
};

export default FormParaphrase;
