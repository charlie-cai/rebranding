
import { Path, Config } from '../constants';
import {
    Env,
    FigmaNodeType,
    HttpHeader
} from '../enums';
import { FigmaNode } from '../interfaces';
import { ColorGroup, ColorJson, ColorSemantic, ColorToken } from '../models';
import {
    CanvasUtil,
    EnvUtil,
    HttpMethod,
    NetworkRequest,
    NetworkUtil
} from '../utils';
import { FileUtil } from './file.util';
import { JSONUtil } from './json.util';

export class FigmaUtil {
    static searchByNodeIdPath(node: FigmaNode, nodeIdArray: string[]): FigmaNode | null {
        nodeIdArray.forEach((nodeId: string) => {
            node = node.children.find((node: FigmaNode) => node.id === nodeId)
            if (node) {
                return null;
            }
        });
        return node;
    }

    static searchByChildrenIndexPath(node: FigmaNode, childrenIndexes: number[]): FigmaNode | null {
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
        FileUtil.writeToFileSync(JSONUtil.prettify(rebranding), Path.COLOR_JSON);
    }

    private static parseFileJson(file: any): ColorJson {
        console.log('Start parse figma file to color.json');
        try {

            // Locate Colour Palette PAGE
            const page = FigmaUtil.searchByNodeIdPath(file.document, [Config.PAGE_ID]);

            // Locate Colour Group by node id sequence
            /*
                "id": "924:46799", "name": "Colour Palette"
                "id": "924:47720", "name": "Content"
                "id": "1842:106647", "name": "Complete Xero Go Colour Palette"
                "id": "1842:106648", "name": "Frame 4097"
            */
            const nodeIdPathToColorGroup = ['924:46799', '924:47720', '1842:106647', '1842:106648'];
            const color_groups = FigmaUtil.searchByNodeIdPath(page, nodeIdPathToColorGroup)
                .children.filter((color_group: FigmaNode) => {
                    return color_group.type === FigmaNodeType.Frame;
                });

            // Generate Color Group
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
                    const semantic_color_name = FigmaUtil.sanitizeColorName(FigmaUtil.searchByChildrenIndexPath(semantic_color, [0, 0, 0, 0, 0])
                        .characters);
                    const semantic_color_description = FigmaUtil.searchByChildrenIndexPath(semantic_color, [0, 0, 1, 0])
                        .characters;
                    const semantic_color_light_array = FigmaUtil.searchByChildrenIndexPath(semantic_color, [0, 0, 2])
                        .characters.split('\n');
                    let semantic_color_light_name = FigmaUtil.sanitizeColorName(semantic_color_light_array.length > 1 ? semantic_color_light_array[1] : `${color_token_name_prefix}-${color_token_name_index}`);
                    if (semantic_color_light_array.length <= 1) {
                        color_token_name_index += 1;
                    }
                    const semantic_color_light_hex = semantic_color_light_array[0];
                    const semantic_color_dark_array = FigmaUtil.searchByChildrenIndexPath(semantic_color, [1, 0, 2])
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

            // Handle XG Brand Identity
            // I need to handle this part manaully here cuz XG Brand Identity is not a standard color palette we follow for Xero go
            rebranding.groups.push({
                name: 'XG Brand Identity',
                colors: [{
                    name: 'background-valueprop',
                    light: 'na',
                    dark: 'blue-80',
                    description: 'Specialty colour only to be used in onboarding. It’s taken from the XG Brand Identity - Primary Colour, ‘Xero Go Blue’'
                }]
            });

            rebranding.tokens.push({
                name: 'na',
                hex:'#BBF3FD'
            });

            return rebranding;
        } catch (err) {
            throw new Error('parse figma file json error, please check if figma file conform to consistent layout');
        }
    }

    static fetchFile(): Promise<any> {

        const headers: any = {};
        headers[HttpHeader.Figma_Token] = EnvUtil.safeGet(Env.Figma_Token);
        headers['Transfer-Encoding'] = 'identity';
        const request: NetworkRequest = {
            baseURL: Config.FIGMA_API_BASE_URL,
            url: `files/${Config.FILE_ID}`,
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

    static output() {
        const colorJson = FileUtil.readFileAsJsonSync(Path.COLOR_JSON);
        CanvasUtil.makeImage(colorJson);
    }
}