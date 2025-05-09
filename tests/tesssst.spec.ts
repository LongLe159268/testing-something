import {test, expect} from '@playwright/test'

test.describe("Abc", async () => {
    let basepageURL: string;
    let xpath;
    test.beforeAll(async () => {
        basepageURL = "https://ttn.x52.swantech.vn/";
        xpath= {
            btnDangnhap: '//button[@class = "ant-btn css-14lptw0 ant-btn-primary ant-btn-color-primary ant-btn-variant-solid ant-btn-lg ant-btn-block"]',
            inputDangnhap: '//input[@id= "login_form_username"]',
            inputMatkhau: '//input[@id= "login_form_password"]',
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
        // click vào danh sách câu hỏi
        await page.getByRole("link", {name: "Danh sách câu hỏi"}).click();
        await page.waitForTimeout(500); // đợi 500ms

        // click vào nút thêm mới
        await page.getByRole('button', {name: 'Thêm mới'}).click();
        await page.waitForTimeout(500); // đợi 500ms

        // nhập câu hỏi
        await page.locator(xpath.inputQuestion).pressSequentially("Câu hỏi", {delay:100});

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

        await page.locator(xpath.radioBtn).check();

        // Lưu câu hỏi
        await page.getByRole('button', {name: "Lưu câu hỏi"}).click();
    });
});




