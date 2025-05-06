// @ts-ignore
import fs from "fs";

export function getLoginData() {
    const filePath = "login-data.json";
    const rawData = fs.readFileSync(filePath);
    const JSONData = JSON.parse(rawData.toString());

    return {
        email: JSONData.email as string,
        password: JSONData.password as string,
    };
}