const fs = require('fs');

export class FileUtil {
    static readFile(path: string): Promise<string> {
        return new Promise<string>(function (resolve, reject) {
            fs.readFile(path, 'utf8', (err: any, data: any) => {
                if (err) reject(err);
                resolve(data);
            });
        });
    }

    static async readFileAsJson(path: string): Promise<any> {
        const data = await this.readFile(path);
        return JSON.parse(data);
    }

    static writeToFile(content: string, fileName: string): void {
        fs.writeFileSync(fileName, content, 'utf-8');
    }

    static copyFileTo(from: string, to: string): Promise<string> {
        return new Promise<string>(function (resolve, reject) {
            fs.copyFile(from, to, (err: any, data: any) => {
                if (err) reject(err);
                resolve(data);
            });
        });
    }

    static makeFolder(path: string): void {
        if (fs.existsSync(path)) {
            fs.rmSync(path, { recursive: true, force: true });
        }
        fs.mkdirSync(path);
    }

    static makeFolderRecursive(path: string): void {
        fs.mkdirSync(path, { recursive: true });
    }
}