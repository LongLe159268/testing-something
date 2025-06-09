import {test, expect} from '@playwright/test'
import { SignInPage } from '../pom/sign-in-page';
import { BasePage } from '../pom/base-page';
import { HomePage } from '../pom/home-page';

test.describe("Danh sách câu hỏi", async () => {
    let xpath;
    let signInpage: SignInPage;
    let basepage: BasePage;
    let homepage: HomePage;
    test.beforeAll(async () => {
        xpath= {
            btnSearchManageQuestion: '//input[@id="search_manage_question"]',

            dropDownKnowledgePick: '//input[@id = "knowledge_pick_drop_down"]',
            pickKnowledgeDropdown: '//div[@title="Cơ khí"]',

            dropDownWorkLevelPick: '//button[@id="worker_level_pick_drop_down"]',
            pickWorkLevelDropdown: '//div[@title="Thợ cấp 5"]',

            inputScoreQuestion: '//input[@id="score_input"]',
            
            btnAddNewQuestion: '//button[@id="btn_add_new_question"]',
            btnExportFileQuestion: '//button[@id="btn_export_file_question"]',

            inputQuestion: 'xpath=/html/body/div/div/div[2]/div/main/div/div/div[1]/div/div[2]/div[1]/div[2]/div',

            btnAddAnswer: '//button[@id="btn_add_new_question_answer"]',

            btnSaveNewQuestion: '//button[@id="btn_save_new_question"]',

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

        // click vào danh sách câu hỏi
        await page.getByText("Danh sách câu hỏi").click();

    });

    test("TC_01: Kiểm tra các trường hiển thị và có thể chọn được", async ({page}) => {
        await test.step("Nhập từ khóa tìm kiếm", async () => {
            // Nhập input tìm kiếm
            await page.locator(xpath.btnSearchManageQuestion).fill("cơ khí");
            await page.waitForTimeout(500);
        });

        await test.step("Chọn dropdown ngành", async () => {
            // Chọn nghành câu hỏi
            await page.locator(xpath.dropDownKnowledgePick).click();
            await page.locator(xpath.pickKnowledgeDropdown).click();
            await page.waitForTimeout(500); 
        });

        await test.step("Chọn dropdown bậc", async () => {
            // Chọn bậc thợ câu hỏi
            await page.locator(xpath.dropDownWorkLevelPick).click();
            await page.locator(xpath.pickWorkLevelDropdown).click();
            await page.waitForTimeout(500); 
        });

        await test.step("Nhập điểm câu hỏi", async () => {
            // Nhập điểm câu hỏi
            await page.locator(xpath.inputScoreQuestion).fill("5");
        });
        
        await test.step("Kiểm tra danh sách hiển thị đúng với từ đã tìm kiếm", async () => {
            // Kiểm tra: các dòng hiển thị chứa từ "cơ khí"
            const visibleRows = page.locator('table tbody tr:visible');
            const count = await visibleRows.count();
            expect(count).toBeGreaterThan(0); // Phải có kết quả tìm thấy

            for (let i = 0; i < count; i++) {
                const rowText = await visibleRows.nth(i).innerText();
                expect(rowText.toLowerCase()).toContain('cơ khí');
            }
        });
    });

        test("TC_02: Kiểm tra thêm mới câu hỏi", async ({page}) => {
        await test.step("Nhập câu hỏi mới", async () => {
            // Click nút thêm mới câu hỏi
            await page.locator(xpath.btnAddNewQuestion).click();
            await page.waitForTimeout(500);
            
            // Nhập input câu hỏi
            await page.locator(xpath.inputQuestion).fill("Câu hỏi mới");
            await page.waitForTimeout(500);
        
            // Thêm đáp án mới
            await page.getByPlaceholder('Đáp án 1').pressSequentially("A", {delay:100});
            await page.locator(xpath.btnAddAnswer).click();
            await page.waitForTimeout(500); 

            await page.getByPlaceholder('Đáp án 2').pressSequentially("B", {delay:100});
            await page.locator(xpath.btnAddAnswer).click();
            await page.waitForTimeout(500);

            await page.getByPlaceholder('Đáp án 3').pressSequentially("C", {delay:100});
            await page.locator(xpath.btnAddAnswer).click();
            await page.waitForTimeout(500);

            await page.getByPlaceholder('Đáp án 4').pressSequentially("D", {delay:100});
            await page.waitForTimeout(500);
        });

        await test.step("Lưu câu hỏi vừa tạo", async () => {
            // Click nút lưu câu hỏi
            await page.locator(xpath.btnSaveNewQuestion).click();
        });   
        
        //await expect(page.getByText('Email hoặc mật khẩu không đúng')).toBeVisible();

        //await expect(page.getByRole('button', {name:"Đấp án"})).toBeVisible();
    });
});




