import {test, expect} from '@playwright/test'
import { SignInPage } from '../pom/sign-in-page';
import { BasePage } from '../pom/base-page';
import { HomePage } from '../pom/home-page';

test.describe("Bậc thợ", async () => {
    let xpath;
    let signInpage: SignInPage;
    let basepage: BasePage;
    let homepage: HomePage;

    test.beforeAll(async () => {
        xpath= {
            btnAddNewWorkerLevel: '//button[@id="btn_add_worker_level"]',

            inputWorkerLevelName: '//input[@id="input_worker_level_name"]',
            colorPickWorkerLevel: '//div[@class="ant-color-picker-clear"]',
            inputHexWorkerLevelColor:'//input[@class="ant-input ant-input-sm css-coz44"]',
            
            btnSaveWorkerLevel: 'xpath=/html/body/div[2]/div/div[2]/div/div[1]/div/div[3]/button[2]',
        };
    });

    test.beforeEach(async ({page}) => {
        // đi tới trang chủ để đăng nhập
        homepage = new HomePage(page);
        await homepage.open();

        // click chọn đăng nhập bằng admin
        basepage = new BasePage(page);
        await basepage.signInAsAdmin();

        // đăng nhập tk admin
        signInpage = new SignInPage(page);
        await signInpage.signIn("admin", "1");

        // click vào danh mục chung => Bậc thợ
        await page.getByText("Danh mục chung").click();
        await page.getByRole('link', {name: "Bậc thợ"}).click();

    });

    test("TC_01: Kiểm tra các trường hiển thị và có thể chọn được", async ({page}) => {
        await test.step("Chọn nút thêm mới bậc thợ", async () => {
            // chọn nút thêm mới
            await page.locator(xpath.btnAddNewWorkerLevel).click();
        });

        await test.step("Nhập tên bậc thợ mới", async () => {
            // nhập tên bậc thợ mới
            await page.locator(xpath.inputWorkerLevelName).fill("thợ 10");
        });

        await test.step("Chọn màu của bậc thợ", async () => {
            // click chọn màu
            await page.locator(xpath.colorPickWorkerLevel).click();
            // nhập mã màu hex
            await page.locator(xpath.inputHexWorkerLevelColor).fill("ffffff");
        });

        await test.step("Lưu bậc thợ mới vừa tạo", async () => {
            // chọn nút lưu bậc thợ mới
            await page.locator(xpath.btnSaveWorkerLevel).click();
        });

        await test.step("Kiểm tra bậc thợ mới đã được tạo", async () => {
            // kiểm tra bậc thợ mới đã được tạo hiển thị ở danh sách
            const newWorkerLevel = page.locator('tbody.ant-table-tbody tr').first();
            await expect(newWorkerLevel).toContainText("thợ 10");
        });
    });
});