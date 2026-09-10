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
export function trackContactSubmitted(source: string) {
  push('contact_submitted', { source });
}

export function trackCompanySizeSelected(employeeCount: number) {
  push('company_size_selected', { employeeCount });
}

export function trackRecommendationClick(employeeCount: number, destination: 'quote' | 'products') {
  push('recommendation_click', { employeeCount, destination });
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
