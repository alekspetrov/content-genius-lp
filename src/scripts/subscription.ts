import { createClient } from "@supabase/supabase-js";
import { SUPABASE_PUBLIC_KEY, SUPABASE_PUBLIC_URL } from "../config";
import { trackServerIssues, trackSubscription } from "../scripts/bee";

const ID_FORM = "js-form";
const ID_FORM_INPUT_EMAIL = "js-form-email";
const ID_FORM_MESSAGE = "js-success-message";
const ID_FORM_ERROR_MESSAGE = "js-error-message";
const ERR_MSG_SERVER_ERROR = "Oops! Something went wrong. Try again later.";

const emailInputElement = document.getElementById(
  ID_FORM_INPUT_EMAIL
) as HTMLFormElement;

const formElement = document.getElementById(ID_FORM);
const messageElement = document.getElementById(ID_FORM_MESSAGE);

function showSuccessMessage() {
  formElement.classList.add("hidden");
  messageElement.classList.remove("hidden");
}

function showErrorMessage() {
  document.getElementById(ID_FORM_ERROR_MESSAGE).innerHTML =
    ERR_MSG_SERVER_ERROR;
}

const supabase = createClient(SUPABASE_PUBLIC_URL, SUPABASE_PUBLIC_KEY);

// Validate and submit
async function onSubmit(e: Event) {
  e.preventDefault();

  const { error, status } = await supabase.from("subscribers").insert([
    {
      email: emailInputElement.value,
    },
  ]);

  if (status === 409) {
    showSuccessMessage();
    return false;
  }

  if (!status || error) {
    trackServerIssues(emailInputElement.value, error);
    showErrorMessage();
    return false;
  }

  trackSubscription(emailInputElement.value);
  showSuccessMessage();
}

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  onSubmit(e);
});
