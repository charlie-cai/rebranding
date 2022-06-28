
import {
    Env,
    FigmaNodeType,
    HttpHeader
} from '../enums';
import { FigmaNode } from '../interfaces';
import { ColorGroup, ColorJson, ColorSemantic, ColorToken } from '../models';
import {
    EnvUtil,
    HttpMethod,
    NetworkRequest,
    NetworkUtil
} from '../utils';
import { FileUtil } from './file.util';
import { JSONUtil } from './json.util';

const COLOR_JSON = 'color.json';

export class FigmaUtil {
    static searchByNodeIdArray(node: FigmaNode, nodeIdArray: string[]): FigmaNode | null {
        nodeIdArray.forEach((nodeId: string) => {
            node = node.children.find((node: FigmaNode) => node.id === nodeId)
            if (node) {
                return null;
            }
        });
        return node;
    }

    static searchByChildrenIndexArray(node: FigmaNode, childrenIndexes: number[]): FigmaNode | null {
        childrenIndexes.forEach((childrenIndex: number) => {
            if (childrenIndex + 1 > node.children.length) {
                return null;
            }
            node = node.children[childrenIndex];
        });
        return node;
    }

    static async syncToJson() {
        console.log('Start fetch figma file from https://www.figma.com/file/qE9Tc51ashfgEO8QDoSSSU/Xero-Go-%7C-Design-Library?node-id=924%3A46799');

        const file = await this.fetchFile();
        const rebranding = this.parseFileJson(file);
        FileUtil.writeToFile(JSONUtil.prettify(rebranding), COLOR_JSON);
    }

    private static parseFileJson(file: any): ColorJson {
        console.log('Start parse figma file to color.json');
        try {
            const page_id = EnvUtil.safeGet(Env.Page_Id);
            const page = FigmaUtil.searchByNodeIdArray(file.document, [page_id]);

            const color_groups = FigmaUtil.searchByNodeIdArray(page, ['924:46799', '924:47720', '1842:106647', '1842:106648'])
                .children.filter((color_group: FigmaNode) => {
                    return color_group.type === FigmaNodeType.Frame;
                });

            // Remove last additional design and native UI colours (not needed for dev) block
            color_groups.pop();

            const rebranding: ColorJson = { groups: [], tokens: [] };
            color_groups.forEach((color_group: FigmaNode) => {

                const color_group_name = FigmaUtil.sanitizeColorName(color_group.children[0].children[0].name);
                const group: ColorGroup = {
                    name: color_group_name,
                    colors: []
                }

                // Remove first header(Light theme && Dark theme)
                color_group.children.shift();

                const color_token_name_prefix = 'misc';
                let color_token_name_index = 0;

                color_group.children.forEach((semantic_color: ColorSemantic) => {
                    const semantic_color_name = FigmaUtil.sanitizeColorName(FigmaUtil.searchByChildrenIndexArray(semantic_color, [0, 0, 0, 0, 0])
                        .characters);
                    const semantic_color_description = FigmaUtil.searchByChildrenIndexArray(semantic_color, [0, 0, 1, 0])
                        .characters;
                    const semantic_color_light_array = FigmaUtil.searchByChildrenIndexArray(semantic_color, [0, 0, 2])
                        .characters.split('\n');
                    let semantic_color_light_name = FigmaUtil.sanitizeColorName(semantic_color_light_array.length > 1 ? semantic_color_light_array[1] : `${color_token_name_prefix}-${color_token_name_index}`);
                    if (semantic_color_light_array.length <= 1) {
                        color_token_name_index += 1;
                    }
                    const semantic_color_light_hex = semantic_color_light_array[0];
                    const semantic_color_dark_array = FigmaUtil.searchByChildrenIndexArray(semantic_color, [1, 0, 2])
                        .characters.split('\n');
                    let semantic_color_dark_name = FigmaUtil.sanitizeColorName(semantic_color_dark_array.length > 1 ? semantic_color_dark_array[1] : `${color_token_name_prefix}-${color_token_name_index}`);
                    if (semantic_color_dark_array.length <= 1) {
                        color_token_name_index += 1;
                    }
                    const semantic_color_dark_hex = semantic_color_dark_array[0];

                    // generate color tokens
                    const TRANSPARENT_HEX = '#Transparent';
                    const TRANSPARENT_NAME = 'transparent';
                    if (semantic_color_light_hex === TRANSPARENT_HEX) {
                        semantic_color_light_name = TRANSPARENT_NAME;
                    }
                    if (rebranding.tokens.find((token: ColorToken) => token.name === semantic_color_light_name) == null) {
                        rebranding.tokens.push({
                            name: semantic_color_light_name,
                            hex: semantic_color_light_hex
                        });
                    }
                    if (semantic_color_dark_hex === TRANSPARENT_HEX) {
                        semantic_color_dark_name = TRANSPARENT_NAME;
                    }
                    if (rebranding.tokens.find((token: ColorToken) => token.name === semantic_color_dark_name) == null) {
                        rebranding.tokens.push({
                            name: semantic_color_dark_name,
                            hex: semantic_color_dark_hex
                        });
                    }

                    // generate color semantic groups
                    group.colors.push({
                        name: semantic_color_name,
                        description: semantic_color_description,
                        light: semantic_color_light_name,
                        dark: semantic_color_dark_name
                    });
                });

                rebranding.groups.push(group);

            });
            return rebranding;
        } catch (err) {
            throw new Error('parse figma file json error, please check if figma file conform to consistent layout');
        }
    }

    static fetchFile(): Promise<any> {

        const api_base_url = EnvUtil.safeGet(Env.Figma_Api_Base_Url) as string;
        const file_id = EnvUtil.safeGet(Env.File_Id);

        const headers: any = {};
        headers[HttpHeader.Figma_Token] = EnvUtil.safeGet(Env.Figma_Token);

        const request: NetworkRequest = {
            baseURL: api_base_url,
            url: `files/${file_id}`,
            method: HttpMethod.GET,
            headers: headers,
            responseType: 'stream'
        }

        return NetworkUtil.fetch(request);
    }

    static sanitizeColorName(name: string): string {
        // make lowercased and remove all white space
        return name.toLowerCase().replace(/\s/g, '');
    }
}