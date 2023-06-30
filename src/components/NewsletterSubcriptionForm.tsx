import { createSignal, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_PUBLIC_KEY, SUPABASE_PUBLIC_URL } from "../config";

const supabase = createClient(SUPABASE_PUBLIC_URL, SUPABASE_PUBLIC_KEY);

const isValidEmail = (email: string) => {
  const emailRegex = new RegExp(
    /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
    "gm"
  );
  return emailRegex.test(email);
};

const ERROR_MESSAGES = {
  exists: "Seems like you already subscribed!",
  unexpected: "Ops, something goes wrong, check email and try again.",
  invalidEmail: "Please check and correct the email address.",
};

function NewsletterSubscriptionForm() {
  const [email, setEmail] = createSignal("");
  const [status, setStatus] = createStore<{
    errorMessage: null | string;
    email: string;
    success: boolean;
  }>({
    errorMessage: null,
    email: "",
    success: false,
  });

  async function submitEmail() {
    setStatus("errorMessage", null);
    setStatus("success", false);
    const { error } = await supabase.from("subscribers").insert([
      {
        email: email(),
      },
    ]);

    if (error) {
      if (error.code === "23505")
        setStatus("errorMessage", ERROR_MESSAGES.exists);
      else setStatus("errorMessage", ERROR_MESSAGES.unexpected);

      return;
    }

    setStatus("success", true);
  }

  async function handleSubmit(e: Event) {
    e.preventDefault();

    if (!email()) return;

    if (isValidEmail(email())) {
      submitEmail();
    } else {
      setStatus("errorMessage", ERROR_MESSAGES.invalidEmail);
    }
  }

  return (
    <div class="text-sm flex-1">
      <form class="md:flex gap-2 justify-end" onSubmit={handleSubmit}>
        <input
          class="w-full lg:w-[240px] px-4 py-2 mb-4 md:mb-0 bg-gray-500 rounded focus:outline-none"
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          class={`min-w-[120px] py-2 rounded font-medium w-full md:w-auto text-white ${
            status.success ? "bg-teal-600" : "bg-indigo-500"
          }`}
          disabled={status.success}
        >
          {status.success ? "Subscribed" : "Subscribe"}
        </button>
      </form>

      <Show when={status.errorMessage}>
        <div class="absolute mt-1 w-full left-0 text-sm">
          {status.errorMessage}
        </div>
      </Show>
    </div>
  );
}

export default NewsletterSubscriptionForm;
