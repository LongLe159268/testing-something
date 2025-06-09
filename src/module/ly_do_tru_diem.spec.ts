import {test, expect} from '@playwright/test'
import { SignInPage } from '../pom/sign-in-page';
import { BasePage } from '../pom/base-page';
import { HomePage } from '../pom/home-page';

test.describe("Lý do trừ điểm", async () => {
    let xpath;
    let signInpage: SignInPage;
    let basepage: BasePage;
    let homepage: HomePage;

    test.beforeAll(async () => {
        xpath= {
            btnAddNewReasonMaker: '//button[@id="btn_add_minus_reason"]',

            inputReasonMakerName: '//input[@id="reason_name"]',
            inputNumberMinus: '//input[@id="pointDeduction"]',
            
            btnSaveNewReasonMaker: 'xpath=/html/body/div[2]/div/div[2]/div/div[1]/div/div[3]/button[2]',
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

        // click vào danh mục chung => Lý do trừ điểm
        await page.getByText("Danh mục chung").click();
        await page.getByRole('link', {name: "Lý do trừ điểm"}).click();

    });

    test("TC_01: Kiểm tra các trường hiển thị và có thể chọn được", async ({page}) => {
        await test.step("Chọn nút thêm mới lý do", async () => {
            // chọn nút thêm mới
            await page.locator(xpath.btnAddNewReasonMaker).click();
        });

        await test.step("Nhập tên lý do mới", async () => {
            // nhập tên lý do mới
            await page.locator(xpath.inputReasonMakerName).fill("quay cóp");
        });

        await test.step("Nhập điểm trừ", async () => {
            // Nhập số điểm trừ
            await page.locator(xpath.inputNumberMinus).fill("10");
        });

        await test.step("Lưu bậc thợ mới vừa tạo", async () => {
            // chọn trường tình trạng
            await page.locator(xpath.btnSaveNewReasonMaker).click();
        });

        await test.step("Kiểm tra bậc thợ mới đã được tạo", async () => {
            // kiểm tra bậc thợ mới đã được tạo hiển thị ở danh sách
            const newReasonMaker = page.locator('tbody.ant-table-tbody tr').first();
            await expect(newReasonMaker).toContainText("quay cóp");
        });
    });
});