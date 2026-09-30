interface TurnstileOptions {
  sitekey: string;
  action: string;
  theme: 'light';
  size: 'flexible' | 'compact';
  'response-field': boolean;
  callback: (token: string) => void;
  'expired-callback': () => void;
  'error-callback': () => void;
}
interface TurnstileAPI {
  render: (container: HTMLElement, options: TurnstileOptions) => string;
  reset: (widgetId: string) => void;
}
declare global {
  interface Window { turnstile?: TurnstileAPI; roweTurnstileReady?: () => void; }
}
function renderWidgets(): void {
  document.querySelectorAll<HTMLElement>('[data-turnstile-widget]').forEach((widget) => {
    if (widget.dataset.widgetId) return;
    const wrapper = widget.closest<HTMLElement>('[data-turnstile-wrapper]');
    const tokenInput = wrapper?.querySelector<HTMLInputElement>('input[name="cf-turnstile-response"]');
    const status = wrapper?.querySelector<HTMLElement>('[data-verification-status]');
    const update = (token: string, message: string): void => {
      if (tokenInput) tokenInput.value = token;
      if (status) status.textContent = message;
    };
    try {
      const id = window.turnstile?.render(widget, {
        sitekey: widget.dataset.sitekey || '', action: widget.dataset.action || 'intake',
        theme: 'light', size: widget.clientWidth < 300 ? 'compact' : 'flexible', 'response-field': false,
        callback: (token) => update(token, 'Verification complete.'),
        'expired-callback': () => update('', 'Verification expired. Please complete the challenge again.'),
        'error-callback': () => update('', 'Verification is unavailable. Please refresh and try again.'),
      });
      if (id) widget.dataset.widgetId = id;
    } catch {
      update('', 'Verification could not start. Please refresh and try again.');
    }
  });
}
export function initTurnstile(): void {
  if (!document.querySelector('[data-turnstile-widget]')) return;
  if (window.turnstile) { renderWidgets(); return; }
  window.roweTurnstileReady = renderWidgets;
  if (document.querySelector('#rowe-turnstile-api')) return;
  const script = document.createElement('script');
  script.id = 'rowe-turnstile-api';
  script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=roweTurnstileReady';
  script.async = true;
  script.defer = true;
  script.addEventListener('error', () => {
    document.querySelectorAll<HTMLElement>('[data-verification-status]').forEach((status) => {
      status.textContent = 'Verification could not load. Please refresh and try again.';
    });
  });
  document.head.append(script);
}
export function resetVerification(form: HTMLFormElement): void {
  const widget = form.querySelector<HTMLElement>('[data-turnstile-widget]');
  const input = form.querySelector<HTMLInputElement>('input[name="cf-turnstile-response"]');
  if (input) input.value = '';
  if (widget?.dataset.widgetId) {
    window.turnstile?.reset(widget.dataset.widgetId);
    const status = form.querySelector<HTMLElement>('[data-verification-status]');
    if (status) status.textContent = 'Please complete the security verification again.';
  }
}
