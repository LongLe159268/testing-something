import {test, expect} from '@playwright/test'

test.describe("Đăng nhập", async () => {
    let basepageURL: string;
    let xpath;
    test.beforeAll(async () => {
        basepageURL = "https://ttn.x52.swantech.vn/";
        xpath= {
            something: '//header[@class = "ant-layout-header pl-6 justify-between flex items-center pr-6 bg-white border-2 border-b-primary shadow m-4 rounded css-14lptw0"]',
            inputQuestion: '//div[@contenteditable = "true"]',
            radioBtn: '//input[@value = "2"]',

        };
    });

    test.beforeEach(async ({page}) => {
        // đi tới trang chủ để đăng nhập
        await page.goto(basepageURL);
        
        // click đăng nhập bằng admin
        //await page.getByText("Đăng nhập với tư cách Quản trị viên").locator(xpath.btnDangnhap).click();
        await page.getByRole('button', { name: 'Đăng nhập với tư cách Quản trị viên' }).click();
        await page.waitForTimeout(500); // đợi 500ms

        // đăng nhập tk admin

        //await page.locator(xpath.inputDangnhap).fill("admin");
        await page.getByPlaceholder('Tên đăng nhập').pressSequentially('admin', {delay:100});
        //await page.locator(xpath.inputMatkhau).fill("1");
        await page.getByPlaceholder('Mật khẩu').pressSequentially('1', {delay:100});

        await page.getByRole('button', {name: 'Đăng nhập'}).click();
        await page.waitForTimeout(500); // đợi 500ms
    });

    test("TC_01:  ", async ({page}) => {
        
        test.step("Click vào danh sách", async () => {
            // click vào danh sách câu hỏi
            await page.getByRole("link", {name: "Danh sách câu hỏi"}).click();
            await page.waitForTimeout(500); // đợi 500ms
        });

        test.step("Click vào nút thêm mới", async () => {
            // click vào nút thêm mới
            await page.getByRole('button', {name: 'Thêm mới'}).click();
            await page.waitForTimeout(500); // đợi 500ms
        });

        test.step("Nhập câu hỏi", async () => {
            // nhập câu hỏi
            await page.locator(xpath.inputQuestion).pressSequentially("Câu hỏi", {delay:100});
        });

        test.step("Nhập đáp án", async () => {
            // nhập đáp án
            await page.getByPlaceholder('Đáp án 1').pressSequentially("A", {delay:100});
            await page.getByRole('button', {name: 'Thêm đáp án'}).click();
            await page.waitForTimeout(500); // đợi 500ms

            await page.getByPlaceholder('Đáp án 2').pressSequentially("B", {delay:100});
            await page.getByRole('button', {name: "Thêm đáp án"}).click();
            await page.waitForTimeout(500); // đợi 500ms

            await page.getByPlaceholder("Đáp án 3").pressSequentially("C", {delay:100});
            await page.getByRole('button', {name: "Thêm đáp án"}).click();
            await page.waitForTimeout(500); // đợi 500ms

            await page.getByPlaceholder("Đáp án 4").pressSequentially("D", {delay:100});
        });

        test.step("Chọn đáp án đúng", async () => {
            await page.locator(xpath.radioBtn).check();
        });

        test.step("Lưu câu hỏi", async () => {
            // Lưu câu hỏi
            await page.getByRole('button', {name: "Lưu câu hỏi"}).click();
        });
        

        //await expect(page.getByText('Email hoặc mật khẩu không đúng')).toBeVisible();

        //await expect(page.getByRole('button', {name:"Đấp án"})).toBeVisible();
    });
});




