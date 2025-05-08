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

        };
    });

    test.beforeEach(async ({page}) => {
        // đi tới trang chủ để đăng nhập
        await page.goto(basepageURL);
        
        // click đăng nhập bằng admin
        //await page.getByText("Đăng nhập với tư cách Quản trị viên").locator(xpath.btnDangnhap).click();
        await page.getByRole('button', { name: 'Đăng nhập với tư cách Quản trị viên' }).click();

        // đăng nhập tk admin
        await page.locator(xpath.inputDangnhap).fill("admin");
        await page.locator(xpath.inputMatkhau).fill("1");
        await page.getByRole('button', {name: 'Đăng nhập'}).click();
    });

    test("TC_01: Kiểm tra hiển thị ", async ({page}) => {
        expect(page.getByText("Phần mềm thi trắc nghiệm").isVisible);
    });
});

