import {test, expect} from '@playwright/test'
import { SignInPage } from '../pom/sign-in-page';
import { BasePage } from '../pom/base-page';
import { HomePage } from '../pom/home-page';

test.describe("Trang chủ", async () => {
    let xpath;
    let signInpage: SignInPage;
    let basepage: BasePage;
    let homepage: HomePage;

    test.beforeAll(async () => {
        xpath= {
            buttonPreviousMonth: 'xpath=/html/body/div[2]/div/div/div[2]/div/div/div/div[1]/div/div[1]/button[2]',
            dropDownStartDaterange: '//input[@id = "createDate"]',
            inputStartDaterange: '//td[@title="2025-05-16"]',

            dropDownEndDaterange: '//input[@date-range = "end"]',
            inputEndDaterange: '//td[@title="2025-05-17"]',

            dropDownknowledgeType: '//input[@id = "knowledgeType"]',
            dropDownworkerLevel: '//input[@id = "workerLevel"]',
            pickKnowledgeType: '//div[@title="Cơ khí"]',
            pickWorkerLevel: '//div[@title="Thợ cấp 2"]',

            dataChart: '//div[@data-chart-source-type = "Ant Design Charts"]'
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

    });

    test("TC_01: Kiểm tra các trường hiển thị và có thể chọn được", async ({page}) => {
        
        await test.step("Chọn trường thời gian tạo", async () => {
            // chọn trường thời gian tạo
            await page.locator(xpath.dropDownStartDaterange).click();
            // chọn nút quay về tháng trước
            await page.locator(xpath.buttonPreviousMonth).click();
            // click chọn ngày bắt đầu
            await page.locator(xpath.inputStartDaterange).click();

            // click chọn ngày kết thúc
            await page.locator(xpath.dropDownEndDaterange).click();
            await page.locator(xpath.inputEndDaterange).click();
        });

        await test.step("Chọn trường khối kiến thức", async () => {
            // click chọn dropdown khối kiến thức
            await page.locator(xpath.dropDownknowledgeType).click();
            await page.locator(xpath.pickKnowledgeType).click();
        });

        await test.step("Chọn trường bậc thợ", async () => {
            // clcik chọn dropdown bậc thợ
            await page.locator(xpath.dropDownworkerLevel).click();
            await page.locator(xpath.pickWorkerLevel).click();
        });

        await test.step("Kiểm tra hiển thị bảng vẽ phân bố điểm", async () => {
            // kiểm tra bảng vẽ phân bố điểm
            await expect(page.locator(xpath.dataChart)).toBeVisible();
        });

        await test.step("Kiểm tra hiển thị bảng kỳ thi", async () => {
            // kiểm tra bảng thống kê
            const table = page.locator('table.ant-table');
            await expect(table).toBeVisible();
        });
    });
});

// // nhập đáp án
//         await page.getByPlaceholder('Đáp án 1').pressSequentially("A", {delay:100});
//         await page.getByRole('button', {name: 'Thêm đáp án'}).click();
//         await page.waitForTimeout(500); 

//         await page.getByPlaceholder('Đáp án 2').pressSequentially("B", {delay:100});
//         await page.getByRole('button', {name: "Thêm đáp án"}).click();
//         await page.waitForTimeout(500); 

//         await page.getByPlaceholder("Đáp án 3").pressSequentially("C", {delay:100});
//         await page.getByRole('button', {name: "Thêm đáp án"}).click();
//         await page.waitForTimeout(500); 

//         await page.getByPlaceholder("Đáp án 4").pressSequentially("D", {delay:100});
//         await page.getByRole('button', {name: "Thêm đáp án"}).click();
//         await page.waitForTimeout(500); 
