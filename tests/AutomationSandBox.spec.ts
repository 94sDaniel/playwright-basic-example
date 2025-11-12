import { test, Browser, Page, expect} from '@playwright/test';
import { SandboxPage } from './pages/SandboxPage';
(async () => {

    let browser: Browser;
    let page: Page;

    test.describe('Automation SandBox Actions ', ()=> {
       
        test('Click on Id Dinamic button', async ({ page }) => {

            await test.step('Given browse on Automation SandBox', async () => {

             await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');

            });

            await test.step('When I click on Id Dinamic button', async () => {

                const buttonIdDinamic = page.getByRole('button', { name: 'Hacé click para generar un ID' });
                await buttonIdDinamic.click();
                await expect (page.getByText('OMG, aparezco después de 3')).toBeVisible();
            });
        });

        test('Fill a box on Automation SandBox', async ({ page }) => {

                await test.step('Given browse on Automation SandBox', async () => {
    
                 await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
    
                });

                await test.step('Can enter text on box', async () => {
                    await expect(page.getByPlaceholder('Ingresá TEXTO'), 'The box isnt editable').toBeEditable();
                    await page.getByPlaceholder('Ingresá TEXTO').fill('Hellow World');
                    await expect(page.getByPlaceholder('Ingresá TEXTO'), 'The box isnt editable').toHaveValue('Hellow World');
                    await page.getByPlaceholder('Ingresá TEXTO').press('Enter');
                    // Also can use type like .fill
                    
                });
                
        });

        test ('Can select and unselect CheckBox', async ({ page }) => {

            await test.step('Given browse on Automation SandBox', async () => {

                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');

            });        
            
            await test.step('Can select and unselect CheckBox', async () => {

                const sandbox = new SandboxPage(page);
                await sandbox.chechkPasta();
                await expect(sandbox.pastaCheckBox, 'The check box is not check it').toBeChecked();
                
            });
        
        });

        test('Can select Radio Buttons', async ({ page }) => {

            await test.step('Given browse on Automation SandBox', async () => {

                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');

            });

            await test.step('Can select Radio Buttons', async () => {

                await expect.soft(page.getByLabel('Pasta 🍝')).toBeVisible;
                await expect.soft(page.getByText('Hamburguesa 🍔')).toBeVisible;
                await expect.soft(page.getByText('Pizza 🍕')).toBeVisible;


                const checkBox = page.getByLabel('Pasta 🍝');

                await checkBox.check();

                // the message next to locator is when the expect validation is false
                await expect(checkBox, 'The check box is not check it').toBeChecked();

                await checkBox.uncheck();

                await expect(checkBox).not.toBeChecked();
                
            });

            await test.step('Can select Radio Buttons', async () => {
                const radioButton = page.getByRole('radio', { name: 'No' });
                await radioButton.check();
                
            });

        });

        test('Can select a dropdown item', async ({ page }) => {

            await test.step('Given browse on Automation SandBox', async () => {

                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');

            });

            await test.step('Can select a dropdown item', async () => {

                const sports = [`Fútbol`, 'Tennis', 'Basketball', 'Golf'];
                for (let options of sports) {
                    const element = await page.$('select#formBasicSelect > option:is(:text("${options}"))');

                    if (element) {
                        console.log(`The option ${options} is present in the dropdown`);
                    }else {
                        console.log(`The option ${options} is not present in the dropdown`);
                    }
                }
                const dropdown = page.getByLabel('Dropdown');
                await dropdown.selectOption({ label: 'Fútbol' });
                
            });
        })

        test('Can select a dropdown Week day', async ({ page }) => {

            // anotation tu inform on the report
            test.info().annotations.push({ 
                type: 'Inform', 
                description: 'This going to inform what ever you want on the report' 
            });


            await test.step('Given browse on Automation SandBox', async () => {

                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');

            });

            await test.step('Can select a week day item', async () => {
                const dropdown = page.getByRole('button', { name: 'Día de la semana' });
                await dropdown.click();

                const weekDay = page.getByRole('link', { name: 'Martes' });
                await weekDay.click();
                
            });
        })

        //For execute with @tag u can use the command npx playwright test --grep @Sandbox
        test('Can select a element Static Table @Sandbox', async ({ page }) => {

            await test.step('Given browse on Automation SandBox', async () => {

                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');

            });

            await test.step('Can validate a element of a colum ', async () => {

                const columValueName = await page.$$eval('h2:has-text("Tabla estática") + table tbody > tr > td:nth-child(2)', (elements) => elements.map(element => element.textContent));

                const spectedName = ['Messi', 'Ronaldo', 'Mbappe'];

                expect (columValueName).toEqual(spectedName);
            });


        })
        // anotation Only let u run just the test with this anotation and skip the oders
        test('Can select a element Dinami Table', async ({ page }) => {

            await test.step('Given browse on Automation SandBox', async () => {

                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');

            });

            await test.step('Can validate a element of a colum ', async () => {

                const dinamicTableValues = await page.$$eval('h2:has-text("Tabla estática") + table tbody > tr > td', (elements) => elements.map(element => element.textContent));

                await page.reload();

                const postRealoadValues = await page.$$eval('h2:has-text("Tabla estática") + table tbody > tr > td', (elements) => elements.map(element => element.textContent));

                expect (dinamicTableValues).toEqual(postRealoadValues);

                //If you want a screen shot of the page you can use this:
                await test.info().attach('Screenshot', {
                    body: await page.screenshot(),
                    contentType: 'image/png'
                });
            });


        })

        //anotation skip let us skip a test
        test.skip('Can select a PopUp', async ({ page }) => {

            await test.step('Given browse on Automation SandBox', async () => {

                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');

            });

            await test.step('When do click on button', async () => {
                await page.getByRole('button', { name: 'Mostrar popup' }).click();
            })

            await test.step('Can validate a PopUp ', async () => {


                await expect(page.getByText('¿Viste? ¡Apareció un Pop-up!')).toHaveText;
                await page.getByRole('button', { name: 'Cerrar' }).click();
            });

            const popUpPromise = page.waitForEvent('popup');
            await page.getByText('Open the PopUp').click();
            const popUp = await popUpPromise;
            console.log(await popUp.title());


        })
    }) 

})();