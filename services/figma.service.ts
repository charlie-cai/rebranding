import { Env, FigmaNodeType, HttpHeader } from "../enums";
import { ColorSemantic, ColorToken, ColorTokenCategory, FigmaNode, Rebranding } from "../interfaces";
import { ColorUtil, EnvUtil, FileUtil, HttpMethod, NetworkRequest, NetworkUtil, ResponseType } from "../utils";

const axios = require('axios');
const REBRANDING_JSON = 'color.json';

export class FigmaService {

    static async syncToJson() {
        const file = await this.fetchFile();
        const page_id = EnvUtil.get(Env.Page_Id);
        const page = file.document.children.find((page: any) => page.id === page_id);
        const color_categories = page.children.find((node: any) => node.id === '924:46799')
            .children.find((node: any) => node.id === '924:47720')
            .children.find((node: any) => node.id === '1842:106647')
            .children.find((node: any) => node.id === '1842:106648')
            .children.filter((color_category: any) => {
                return color_category.type === 'FRAME';
            });

        const rebranding: any = { groups: [] };
        color_categories.forEach((color_category: any) => {

            const color_category_name = color_category.children[0].children[0].name;

            const group: any = {
                name: color_category_name,
                colors: []
            }

            color_category.children.shift();
            color_category.children.forEach((semantic_color: any) => {
                const semantic_color_name = semantic_color.children[0]
                    .children[0]
                    .children[0]
                    .children[0]
                    .children[0]
                    .characters;
                const semantic_color_description = semantic_color.children[0]
                    .children[0]
                    .children[1]
                    .children[0]
                    .characters;
                const semantic_color_light = semantic_color.children[0]
                    .children[0]
                    .children[2]
                    .characters.split('\n')
                    .find((word: any) => word.startsWith('#'));
                const semantic_color_dark = semantic_color.children[1]
                    .children[0]
                    .children[2]
                    .characters.split('\n')
                    .find((word: any) => word.startsWith('#'));

                group.colors.push({
                    name: semantic_color_name,
                    description: semantic_color_description,
                    light: semantic_color_light,
                    dark: semantic_color_dark
                });
            });

            rebranding.groups.push(group);

        });

        FileUtil.writeToFile(JSON.stringify(rebranding, null, 2), REBRANDING_JSON);
    }

    private static async fetchFile() {
        const api_base_url = EnvUtil.get(Env.Figma_Api_Base_Url) as string;
        const file_id = EnvUtil.get(Env.File_Id);
        const headers: any = {};
        headers[HttpHeader.Figma_Token] = EnvUtil.get(Env.Figma_Token);

        const request: NetworkRequest = {
            baseURL: api_base_url,
            url: `files/${file_id}`,
            method: HttpMethod.GET,
            headers: headers,
            responseType: ResponseType.Json
        }

        const { data } = await NetworkUtil.fetch(request);

        return data;
    }
}