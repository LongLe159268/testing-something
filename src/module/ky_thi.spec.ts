import {test, expect} from '@playwright/test'
import { SignInPage } from '../pom/sign-in-page';
import { BasePage } from '../pom/base-page';
import { HomePage } from '../pom/home-page';

test.describe("Kỳ thi", async () => {
    let xpath;
    let signInpage: SignInPage;
    let basepage: BasePage;
    let homepage: HomePage;

    test.beforeAll(async () => {
        xpath= {
            inputSearchExam: '//input[@id="exam_search"]',

            datetimepickcreatedAt: '//input[@id = "create_time"]',
            buttonPreviousMonth1: 'xpath=/html/body/div[2]/div/div/div[2]/div/div/div/div[1]/div/div[1]/button[2]',
            inputStartDaterange1: '//td[@title="2025-05-15"]',
            inputEndDaterange1: '//td[@title="2025-05-16"]',

            datetimepickstartAt: '//input[@id = "start_time"]',
            buttonPreviousMonth2:'xpath=/html/body/div[3]/div/div/div[2]/div/div/div/div[1]/div/div[1]/button[2]',
            //inputStartDaterange2: '//td[@title="2025-05-16"]',
            inputStartDaterange2:'xpath=/html/body/div[3]/div/div/div[2]/div/div/div/div[1]/div/div[2]/table/tbody/tr[3]/td[6]',
            //inputEndDaterange2: '//td[@title="2025-05-20"]',
            inputEndDaterange2:'xpath=/html/body/div[3]/div/div/div[2]/div/div/div/div[1]/div/div[2]/table/tbody/tr[4]/td[3]',

            btnCompletedStatus: 'xpath=/html/body/div/div/div[2]/div/main/div/div[1]/div/form/div[4]/div/div/div/div/div/label[3]',

            btnAddNewExam: '//button[@id="btn_add_new_exam"]',
            inputAddExamName: '//input[@id="input_exam_name"]',
            inputAddExamDescription: '//textarea[@id="description"]',
            inputAddExamDuration: '//input[@id="duration"]',
            inputGeneralQuestion: '//input[@id="generalQuestion"]',
            inputSpecificQuestion: '//input[@id="specificQuestion"]',

            btnSaveNewExam: '//button[@id="save_exam"]',
            btnSelectAllCandidate: '//input[@aria-label="Select all"]',
            btnSaveCandidate: 'xpath=/html/body/div[1]/div/div[2]/div/main/div/div/div[2]/div[1]/div[1]/div/div/button',
            listCandidate: 'xpath=/html/body/div[1]/div/div[2]/div/main/div/div/div[2]/div[2]/div[2]/div/div/div/div/div/table/tbody',
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

        // click vào mục Kỳ thi
        await page.getByRole('link', {name: 'Kỳ thi'}).click();

    });

    test("TC_01: Kiểm tra các trường hiển thị và có thể chọn được", async ({page}) => {
        
        await test.step("Chọn trường tìm kiếm", async () => {
            // nhập tìm kiếm
            await page.locator(xpath.inputSearchExam).fill("3");
        });

        await test.step("Chọn trường thời gian tạo", async () => {
            // chọn trường thời gian tạo
            await page.locator(xpath.datetimepickcreatedAt).click();
            // chọn nút quay về tháng trước
            await page.locator(xpath.buttonPreviousMonth1).click();
            // click chọn ngày bắt đầu
            await page.locator(xpath.inputStartDaterange1).click();
            // click chọn ngày kết thúc
            await page.locator(xpath.inputEndDaterange1).click();
        });

        await test.step("Chọn trường thời gian bắt đầu", async () => {
            // chọn trường thời gian bắt đầu
            await page.locator(xpath.datetimepickstartAt).click();
            // chọn nút quay về tháng trước
            await page.locator(xpath.buttonPreviousMonth2).click();
            // click chọn ngày bắt đầu
            await page.locator(xpath.inputStartDaterange2).click();
            // click chọn ngày kết thúc
            await page.locator(xpath.inputEndDaterange2).click();
        });

        await test.step("Chọn trường tình trạng", async () => {
            // chọn trường tình trạng
            await page.locator(xpath.btnCompletedStatus).click();
        });

        await test.step("Kiểm tra danh sách hiển thị ra phần tử đã tìm", async () => {
            // kiểm tra hiển thị ra kết quả tìm kiếm
            const firstRow = page.locator('tbody.ant-table-tbody tr').first();
            await expect(firstRow).toBeVisible();
        });

        await test.step("Kiểm tra thêm mới kỳ thi", async () => {
            // click vào nút thêm mới kỳ thi
            await page.locator(xpath.btnAddNewExam).click();

            // nhập tên kỳ thi
            await page.locator(xpath.inputAddExamName).fill("Kỳ thi 100");

            // nhập số câu hỏi kiến thức chung
            await page.locator(xpath.inputGeneralQuestion).fill("10");

            // nhập số câu hỏi kiến thức ngành
            await page.locator(xpath.inputSpecificQuestion).fill("10");

            // lưu kỳ thi
            await page.locator(xpath.btnSaveNewExam).click();
        });

        await test.step("Kiểm tra thêm danh sách thí sinh", async () => {
            // thêm danh sách thí sinh
            await page.locator(xpath.btnSelectAllCandidate).click();

            // lưu danh sách thí sinh
            await page.locator(xpath.btnSaveCandidate).click();

            // Kiểm tra hiển thị danh sách thí sinh
            const candidateList = page.locator(xpath.listCandidate);
            await expect(candidateList).toBeVisible();

            // Click ra trang chủ kỳ thi
            await page.getByRole('link', {name: 'Kỳ thi'}).click();

            // Kiểm tra hiển thị danh sách kỳ thi
            const firstRow1 = page.locator('tbody.ant-table-tbody tr').first();
            await expect(firstRow1).toContainText("Kỳ thi 100");
        });
    });
});
