import { Page } from '@playwright/test';

export class BasePage {
    page: Page;
    xpathAdminSignInButton = "//button[@id='admin_sign_in']";
    xpathTestTakerSignInButton = "//button[@id='test_taker_sign_in']";

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    async signInAsAdmin() {
        // click chọn đăng nhập bằng admin
        //await this.page.locator(this.xpathAdminSignInButton).click();
        //await this.page.waitForTimeout(500); // đợi 500ms

        await this.page.getByRole('button', { name: 'Đăng nhập với tư cách Quản trị viên' }).click();
    }

    async signInAsTestTaker() {
        // Click chọn đăng nhập bằng người làm bài thi
        //await this.page.locator(this.xpathTestTakerSignInButton).click();
        //await this.page.waitForTimeout(500); // đợi 500ms

        await this.page.getByRole('button', { name: 'Đăng nhập để làm đề thi' }).click();
    }
}