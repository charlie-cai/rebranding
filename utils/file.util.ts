const fs = require('fs');

export class FileUtil {
    static readFileAsync(path: string): Promise<string> {
        return new Promise<string>(function (resolve, reject) {
            fs.readFile(path, 'utf8', (err: any, data: any) => {
                if (err) reject(err);
                resolve(data);
            });
        });
    }

    static async readFileAsJsonAsync(path: string): Promise<any> {
        const data = await this.readFileAsync(path);
        return JSON.parse(data);
    }

    static readFileSync(path: string): string {
        return fs.readFileSync(path);
    }

    static readFileAsJsonSync(path: string): any {
        return JSON.parse(fs.readFileSync(path));
    }

    static writeToFileSync(content: string, fileName: string): void {
        fs.writeFileSync(fileName, content, 'utf-8');
    }

    static copyFileToAsync(from: string, to: string): Promise<string> {
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