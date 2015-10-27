/**
 * Main entrypoint for validating user login
 * @class LoginValidator
 */
class LoginValidator {
	loginUsername: HTMLInputElement;
	loginPassword: HTMLInputElement;
	loginSubmit: HTMLButtonElement;

	/**
	 * @constructs LoginValidator
	 */
	constructor() {
		this.loginUsername = <HTMLInputElement> window.document.getElementById('loginUsername');
		this.loginPassword = <HTMLInputElement> window.document.getElementById('loginPassword');
		this.loginSubmit = <HTMLButtonElement> window.document.getElementById('loginSubmit');
	}

	/**
	 * Activates / deactivates submit button in the login form
	 *
	 * @returns {undefined}
	 */
	private onInput ():void {
		if (this.isNotEmpty()) {
			this.activateSubmit();
		} else {
			this.deactivateSubmit();
		}
	}

	/**
	 * Checks if both username and password fields are not empty
	 *
	 * @returns {boolean}
	 */
	private isNotEmpty ():boolean {
		return !!(this.loginUsername.value.length && this.loginPassword.value.length);
	}

	/**
	 * @returns {undefined}
	 */
	private activateSubmit ():void {
		this.loginSubmit.disabled = false;
	}

	/**
	 * @returns {undefined}
	 */
	private deactivateSubmit ():void {
		this.loginSubmit.disabled = true;
	}

	/**
	 * Starts continuous checking for new input
	 *
	 * @returns {undefined}
	 */
	public watch (): void {
		this.onInput();
		window.document.getElementById('loginForm')
			.addEventListener('input', this.onInput.bind(this));
	}
}
