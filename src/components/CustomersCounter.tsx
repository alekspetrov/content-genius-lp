import { createClient } from "@supabase/supabase-js";
import {
  Resource,
  ResourceActions,
  ResourceSource,
  createEffect,
  createResource,
  createSignal,
} from "solid-js";

const supabase = createClient(
  "https://eylkhmggbowdktklmixg.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5bGtobWdnYm93ZGt0a2xtaXhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA0NDU0MTAsImV4cCI6MTk4NjAyMTQxMH0.ri7eSZzdv6M_TZhxDErKWNr58R8t4l240edRQ-DhWII"
);

async function getProfiles() {
  try {
    let { data, error } = await supabase.rpc("count_profiles");
    return data;
  } catch (error) {
    console.log(error);
  }
}
export default function CustomersCounter() {
  const [counter] = createResource(getProfiles);

  return <div>Trusted by {counter() ? counter() + "+" : null} customers</div>;
}
