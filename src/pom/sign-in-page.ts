import { Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class SignInPage extends BasePage {
  // các đường dẫn đến các phần tử trên trang đăng nhập
  xpathUsernameInput = "//input[@id='login_form_username']";
  xpathPasswordInput = "//input[@id='login_form_password']";
  xpathSignInButton = "//button[@type='submit']";

  constructor(page: Page) {
    super(page);
  }

  async fillUsername(username: string) {
    // Nhập tên đăng nhập
    await this.page.locator(this.xpathUsernameInput).pressSequentially(username, { delay: 100 });
  }

  async fillPassword(password: string) {
    // Nhập mật khẩu
    await this.page.locator(this.xpathPasswordInput).pressSequentially(password, { delay: 100 });
  }

  async clickSignInButton() {
    // Click vào nút đăng nhập
    await this.page.locator(this.xpathSignInButton).click();
    //await this.page.waitForTimeout(500); 
  }

  async signIn(username: string, password: string) {
    // Thực hiện đăng nhập
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickSignInButton();
  }
}
