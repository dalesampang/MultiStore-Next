"use client";

export default function OrderNowButton({ slug }) {
  const pageUsername = "AntiparaManila"; // your FB Page username
  const productUrl = `https://antiparamanila.store/ai-glasses/${slug}?ref=messenger`;
  const templateMessage = `Hi Antipara Manila, I'm interested in ordering ${productUrl}`;

  const messengerUrl = `https://m.me/${pageUsername}?text=${encodeURIComponent(
    templateMessage
  )}`;
  const handleClick = () => {
    // ✅ Fire GA4 event
    window.gtag?.("event", "order_now_click", {
      event_category: "engagement",
      event_label: slug,
      value: 1,
    });
  };

  return (
    <a
      href={messengerUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="inline-flex font-medium text-custom-sm py-[7px] px-5 rounded-[5px] bg-blue text-white ease-out duration-200 hover:bg-blue-dark">
      Order Now
    </a>
  );
}
