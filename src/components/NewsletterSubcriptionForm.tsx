import { createSignal, Show } from "solid-js";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_PUBLIC_KEY, SUPABASE_PUBLIC_URL } from "../config";
// import { trackServerIssues, trackSubscription } from "../scripts/bee";

const supabase = createClient(SUPABASE_PUBLIC_URL, SUPABASE_PUBLIC_KEY);

const isValidEmail = (email: string) => {
  const emailRegex = new RegExp(
    /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
    "gm"
  );
  return emailRegex.test(email);
};

function NewsletterSubscriptionForm() {
  const [email, setEmail] = createSignal("");
  const [status, setStatus] = createSignal();

  async function submitEmail() {
    const { error, status } = await supabase.from("subscribers").insert([
      {
        email: email(),
      },
    ]);

    if (!status || error) {
      trackServerIssues(email(), error.message);
      setStatus("error");
      return;
    }

    trackSubscription(email());
    setStatus("success");
  }

  async function handleSubmit(e: Event) {
    e.preventDefault();

    if (!email()) return;

    if (isValidEmail(email())) {
      submitEmail();
    } else {
      setStatus("error");
    }
  }

  return (
    <div class="relative ">
      <form class="flex gap-2" onSubmit={handleSubmit}>
        <input
          class="w-full px-4 py-2 bg-gray-500 rounded focus:outline-none"
          type="email"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          class={`min-w-[120px] py-2 rounded font-medium text-white ${
            status() === "success" ? "bg-gray-700" : "bg-indigo-500"
          }`}
        >
          {status() === "success" ? "Welcome" : "Subscribe"}
        </button>
      </form>

      <Show when={status() === "error"}>
        <div class="absolute mt-1 w-full left-0">
          Something goes wrong! Please try again.
        </div>
      </Show>
    </div>
  );
}

export default NewsletterSubscriptionForm;
