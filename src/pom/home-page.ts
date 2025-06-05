import { Page } from "@playwright/test";

export class HomePage {
    page: Page;

    // ham Tao
    constructor(page: Page) {
        this.page = page;
    }

    async open() {
        await this.page.goto("https://ttn.x52.swantech.vn/");
    }
}
