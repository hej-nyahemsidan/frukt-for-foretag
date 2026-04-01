// Google Tag Manager dataLayer helpers

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

function push(event: string, data?: Record<string, unknown>) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
}

// Quote/order request submitted
export function trackQuoteSubmitted(totalPrice: number, itemCount: number) {
  push('quote_submitted', { totalPrice, itemCount });
}

// Contact form submitted
export function trackContactSubmitted() {
  push('contact_submitted');
}

// Exit intent lead captured
export function trackExitIntentLead() {
  push('exit_intent_lead');
}

// Product added to cart
export function trackAddToCart(productName: string, price: number, quantity: number, day?: string) {
  push('add_to_cart', { productName, price, quantity, day });
}

// Cart viewed / checkout started
export function trackBeginCheckout(totalPrice: number, itemCount: number) {
  push('begin_checkout', { totalPrice, itemCount });
}
