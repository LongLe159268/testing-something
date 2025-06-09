import {test, expect} from '@playwright/test'
import { SignInPage } from '../pom/sign-in-page';
import { BasePage } from '../pom/base-page';
import { HomePage } from '../pom/home-page';

test.describe("Ngành kiến thức", async () => {
    let xpath;
    let signInpage: SignInPage;
    let basepage: BasePage;
    let homepage: HomePage;

    test.beforeAll(async () => {
        xpath= {
            btnAddNewKnowledgeType: '//button[@id="btn_add_knowledge"]',

            inputKnowledgeName: '//input[@id="input_knowledge_name"]',
            colorPickKnowledgeType: '//div[@class="ant-color-picker-clear"]',
            inputHexKnowledgeTypeColor:'//input[@class="ant-input ant-input-sm css-coz44"]',
            
            btnSaveKnowledgeType: 'xpath=/html/body/div[3]/div/div[2]/div/div[1]/div/div[3]/button[2]',
            btnSaveKnowledgeType1: 'xpath=/html/body/div[2]/div/div[2]/div/div[1]/div/div[3]/button[2]',
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

        // click vào danh mục chung => Ngành kiến thức
        await page.getByText("Danh mục chung").click();
        await page.getByRole('link', {name: "Ngành kiến thức"}).click();

    });

    test("TC_01: Kiểm tra các trường hiển thị và có thể chọn được", async ({page}) => {
        await test.step("Chọn nút thêm mới ngành kiến thức", async () => {
            // chọn nút thêm mới
            await page.locator(xpath.btnAddNewKnowledgeType).click();
        });

        await test.step("Nhập tên ngành kiến thức mới", async () => {
            // nhập tên ngành kiến thức mới
            await page.locator(xpath.inputKnowledgeName).fill("New day new me");
        });

        await test.step("Chọn màu của ngành kiến thức", async () => {
            // click chọn màu
            await page.locator(xpath.colorPickKnowledgeType).click();
            // nhập mã màu hex
            await page.locator(xpath.inputHexKnowledgeTypeColor).fill("ff0000");
        });

        await test.step("Lưu ngành kiến thức mới vừa tạo", async () => {
            // chọn trường tình trạng
            await page.locator(xpath.btnSaveKnowledgeType1).click();
        });

        await test.step("Kiểm tra ngành kiến thức mới đã được tạo", async () => {
            // kiểm tra ngành kiến thức mới đã được tạo hiển thị ở danh sách
            const newKnowledgeType = page.locator('tbody.ant-table-tbody tr').first();
            await expect(newKnowledgeType).toContainText("New day new me");
        });
    });
});