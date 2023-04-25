function NewsletterSubscriptionForm() {
  return (
    <form class="flex gap-2">
      <input
        class="w-full max-w-[300px] px-4 py-2 bg-gray-500 rounded focus:outline-none"
        type="text"
        placeholder="Enter your email..."
      />
      <button class="px-6 py-2 bg-indigo-500 rounded">Subscribe</button>
    </form>
  );
}

export default NewsletterSubscriptionForm;
