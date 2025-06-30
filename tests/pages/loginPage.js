class LoginPage {
    constructor(page) {
      this.page = page;
      this.usernameInput = page.locator('#username');
      this.passwordInput = page.locator('#password');
      this.submitButton = page.locator('button[type="submit"]');
      this.flashMessage = page.locator('#flash');
    }
  
    async goto() {
      await this.page.goto('/login');
    }
  
    async login(username, password) {
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      await this.submitButton.click();
    }
  }
  
  module.exports = { LoginPage };
  