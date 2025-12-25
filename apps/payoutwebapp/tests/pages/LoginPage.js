const LOGIN_PAGE_URL = `${process.env.DASHBOARD_URL}/auth/login?recpt=0`;

class LoginPage {
  constructor(page) {
    this.page = page;
    this.url = LOGIN_PAGE_URL;
    this.loginEmailUsername = page.locator('#username');
    this.loginEmailPassword = page.locator('#password');
    this.loginEmailSubmit = page.getByRole('button', { name: 'Log In' });

    this.loginAliasName = page.locator('#account_name');
    this.loginAliasUsername = page.locator('#username');
    this.loginAliasPassword = page.locator('#password');
    this.loginAliasSubmit = page.getByRole('button', { name: 'Log In' });
  }

  async load() {
    await this.page.goto(this.url);
  }

  async login_email(username, password) {
    await this.loginEmailUsername.fill(username);
    await this.loginEmailPassword.fill(password);
    await this.loginEmailSubmit.click();
  }
}

export default LoginPage;
