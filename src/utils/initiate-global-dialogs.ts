/* eslint-disable no-console */
export class GlobalDialog {
  static dialogs = new Set<string>();
  static wrapperElement: HTMLElement | null = null;

  /**
   * Initialize the GlobalDialog by setting up the wrapper and triggers.
   */
  static init() {
    this.setupWrapper();
    this.setupTriggers();
  }

  /**
   * Sets up the dialog wrapper and adds necessary listeners.
   */
  private static setupWrapper() {
    this.wrapperElement = document.querySelector(
      '[data-dialog-element="wrapper"]'
    ) as HTMLElement | null;

    if (!this.wrapperElement) {
      console.warn('Dialog wrapper not found.');
      return;
    }

    // Collect dialog IDs
    const dialogElements = this.wrapperElement.querySelectorAll<HTMLElement>('[id^="popup-"]');
    dialogElements.forEach((element) => {
      const { id } = element;
      if (id) this.dialogs.add(id);
    });

    // Add listeners to close buttons
    const closeButtons = this.wrapperElement.querySelectorAll('[data-dialog-element="close-btn"]');
    closeButtons.forEach((button) => {
      button.setAttribute('role', 'button');
      button.addEventListener('click', () => {
        this.closeDialog();
      });
    });
  }

  /**
   * Sets up dialog triggers for elements linking to dialogs.
   */
  private static setupTriggers() {
    const triggers = document.querySelectorAll<HTMLLinkElement>('a[href^="#popup-"]');
    triggers.forEach((trigger) => {
      const instanceId = this.extractId(trigger.href);
      if (!instanceId || !this.dialogs.has(instanceId)) return;

      trigger.href = '';

      trigger.addEventListener('click', (event) => {
        event.preventDefault();
        this.openDialog(instanceId);
      });
    });
  }

  /**
   * Opens a dialog by its ID.
   */
  static openDialog(id: string) {
    if (!this.dialogs.has(id) || !this.wrapperElement) {
      console.warn(`Dialog with ID "${id}" not found.`);
      return;
    }

    this.wrapperElement.setAttribute('data-dialog', id);
    this.wrapperElement.classList.remove('global-dialog-hidden');
    this.wrapperElement.classList.add('global-dialog-visible');
  }

  /**
   * Closes the currently open dialog.
   */
  static closeDialog() {
    if (!this.wrapperElement) return;

    this.wrapperElement.setAttribute('data-dialog', '');
    this.wrapperElement.classList.remove('global-dialog-visible');
    this.wrapperElement.classList.add('global-dialog-hidden');
  }

  /**
   * Extracts the dialog ID from a URL or href string.
   */
  private static extractId(url: string): string | null {
    const hashIndex = url.indexOf('#');
    return hashIndex !== -1 ? url.slice(hashIndex + 1) : null;
  }
}
