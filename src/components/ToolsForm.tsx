import { For, createEffect, createSignal, onCleanup } from "solid-js";
import { Dynamic } from "solid-js/web";
import { clickOutside } from "../helpers/dom";
import { createStore } from "solid-js/store";

const clickOut = clickOutside;

type Option = {
  text: string;
  value: string;
};

type Field = {
  value: string;
  type: "textarea" | "select";
  label: string;
  limit?: number;
  placeholder?: string;
  optionName?: string;
  options?: Option[];
};

const OPTIONS = [
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
];

interface Props {
  title: string;
  tool_name: string;
  cta: string;
  fields: Field[];
}

const Select = (props) => {
  const [showOptions, setShowOptions] = createSignal(false);

  function escListener(event: KeyboardEvent) {
    if (event.key === "Escape") setShowOptions(false);
  }

  createEffect(() => {
    if (window !== undefined) {
      window.addEventListener("keydown", escListener);
      onCleanup(() => window.removeEventListener("keydown", escListener));
    }
  });

  function handleSelectOption(option: Option) {
    props.setValue(option.value);
    setShowOptions(false);
  }

  return (
    <div class="flex flex-col mb-8 relative">
      <label for="content" class="font-medium mb-2">
        {props.label}
      </label>
      <button class="text-left block" onClick={() => setShowOptions(true)}>
        <div class="border px-4 py-4 rounded-md appearance-none bg-[url(/icons/cheveron-down.svg)] bg-no-repeat bg-[right_16px_top_16px] bg-[length:20px_20px]">
          {props.options.find((option) => option.value === props.value).text}
        </div>
      </button>
      {showOptions() && (
        <div
          // @ts-expect-error
          use:clickOut={() => setShowOptions(false)}
          class="absolute top-[100%] z-30 w-full bg-white py-2 border border-gray-200 shadow-lg mt-1 rounded-md"
        >
          <For each={props.options}>
            {(option) => (
              <button
                class="block w-full text-left px-4 py-2 hover:bg-gray-100 transition cursor-pointer"
                onClick={() => handleSelectOption(option)}
              >
                {option.text}
              </button>
            )}
          </For>
        </div>
      )}
    </div>
  );
};

const Textarea = (props) => {
  function handleSetValue(value: string) {
    props.setValue(value);
  }

  return (
    <div class="flex flex-col">
      <label for="content" class="font-medium mb-2">
        {props.label}
      </label>
      <textarea
        id="content"
        name="content"
        class="border px-4 py-4 rounded-md resize-none h-32"
        value={props.value}
        onInput={(e: Event) =>
          handleSetValue((e.target as HTMLInputElement).value)
        }
        placeholder="Place original content..."
        maxLength={1000}
      />
      <div class="text-right">
        <span class="text-pink-500 text-sm font-medium">
          {props.value.length}/1000
        </span>
      </div>
    </div>
  );
};

const FIELDS_MAP = {
  textarea: Textarea,
  select: Select,
};

const ToolsForm = (props: Props) => {
  const [fieldsStore, setFieldsStore] = createStore<{ fields: Field[] }>({
    fields: [],
  });

  createEffect(() => {
    setFieldsStore("fields", props.fields);
  });

  function submit() {
    const optionContent = fieldsStore.fields.find(
      (field) => field.optionName === "content"
    );

    // Uncomment to prevent sending of empty form
    // if (!optionContent?.value) return;

    const appUrl = "https://app.contentgenius.io";
    // const appUrl = "http://localhost:3000";
    const targetUrl = `/tools/${props.tool_name}`;
    let fields: any = [];

    fieldsStore.fields.forEach((field) => {
      // Expected link on the app <path>/?fields=[{ <field_name>: <data> }]&target_url="/tools/hello"
      fields.push({ [field.optionName as string]: field.value });
    });

    const redirectUrl = `${appUrl}${targetUrl}/?fields=${JSON.stringify(
      fields
    )}&targetUrl=${targetUrl}`;

    window.location.href = redirectUrl;
  }

  return (
    <div class="p-8 bg-white border border-gray-200 rounded-md shadow-lg font-['system-ui']">
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
        <div class="text-xl font-semibold text-gray-900">{props.title}</div>
      </div>
      {fieldsStore.fields.map((field: Field, index: number) => (
        <Dynamic
          component={FIELDS_MAP[field.type]}
          value={field.value}
          label={field.label}
          placeholder={field.placeholder}
          setValue={(value: string) =>
            setFieldsStore("fields", index, { value })
          }
          options={field.options}
        />
      ))}
      <div>
        <button
          onClick={submit}
          class="w-full lg:w-auto bg-[#D7009B] text-fuchsia-50 px-4 py-3 md:px-6 md:py-3 font-medium rounded-full whitespace-nowrap"
        >
          {props.cta}
        </button>
      </div>
    </div>
  );
};

export default ToolsForm;
