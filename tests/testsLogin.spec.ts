import { test} from '../fixtures/customFixtures';
import { users } from '../usersCollection';

test('login with valid data', async ({ loginPage, mainPage }) => {

  await loginPage.goto();
  await loginPage.login(users.standard.login, users.standard.password);
  await mainPage.checkHeader("Products");
});

// Negative test: login with invalid username
test('login with invalid username', async ({ loginPage }) => {

  const expectedErrorText = "Epic sadface: Username and password do not match any user in this service";

  await loginPage.goto();
  await loginPage.login("invalidName", users.standard.password);
  await loginPage.checkErrorMsg(expectedErrorText);
});

// Negative test: login with invalid password
test('login with invalid password', async ({ loginPage }) => {

  const expectedErrorText = "Epic sadface: Username and password do not match any user in this service";

  await loginPage.goto();
  await loginPage.login(users.standard.login, "invalidPassword");
  await loginPage.checkErrorMsg(expectedErrorText);
});