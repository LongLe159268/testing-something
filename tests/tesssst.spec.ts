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

        // đăng nhập tk admin

        //await page.locator(xpath.inputDangnhap).fill("admin");
        await page.getByPlaceholder('Tên đăng nhập').pressSequentially('admin', {delay:100});
        //await page.locator(xpath.inputMatkhau).fill("1");
        await page.getByPlaceholder('Mật khẩu').pressSequentially('1', {delay:100});

        await page.getByRole('button', {name: 'Đăng nhập'}).click();
    });

    test("TC_01:  ", async ({page}) => {
        // click vào danh sách câu hỏi
        await page.getByRole("link", {name: "Danh sách câu hỏi"}).click();

        // click vào nút thêm mới
        await page.getByRole('button', {name: 'Thêm mới'}).click();

        // nhập câu hỏi
        await page.locator(xpath.inputQuestion).fill("Câu hỏi");

        // nhập đáp án
        await page.getByPlaceholder('Đáp án 1').fill("A");
        await page.getByRole('button', {name: 'Thêm đáp án'}).click();

        await page.getByPlaceholder('Đáp án 2').fill("B");
        await page.getByRole('button', {name: "Thêm đáp án"}).click();

        await page.getByPlaceholder("Đáp án 3").fill("C");
        await page.getByRole('button', {name: "Thêm đáp án"}).click();

        await page.getByPlaceholder("Đáp án 4").fill("D");

        await page.locator(xpath.radioBtn).check();

        // Lưu câu hỏi
        await page.getByRole('button', {name: "Lưu câu hỏi"}).click();
    });
});




