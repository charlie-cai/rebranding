import { Env, FigmaNodeType, HttpHeader } from "../enums";
import { ColorSemantic, ColorToken, ColorTokenCategory, FigmaNode, Rebranding } from "../interfaces";
import { ColorUtil, EnvUtil, FileUtil } from "../utils";

const axios = require('axios');
const REBRANDING_JSON = 'rebranding.json';

export class FigmaService {

    static async syncToJson() {
        const file = await this.fetchFile();
        const styles: [string, FigmaNode][] = Object.entries(file.styles);
        const page_id = EnvUtil.get(Env.Page_Id);
        const page = file.document.children.find((page: any) => page.id === page_id);
        const nodes = page.children;
        const color_tokens: FigmaNode[] = [];
        this.parseColorTokens(color_tokens, styles, nodes);
        const unique_color_tokens = this.removeDuplicateColorTokens(color_tokens);
        const standardized_color_tokens = this.standardizeColorTokenNames(unique_color_tokens);
        const color_token_categories = this.parseToColorTokenCategories(standardized_color_tokens);
        const groups = nodes.filter((node: FigmaNode) => node.type === FigmaNodeType.Group);
        const color_semantics = this.parseToColorSemantics(groups, file.styles);
        const rebranding: Rebranding = {
            tokenCategories: color_token_categories,
            semantics: color_semantics
        }
        FileUtil.writeToFile(JSON.stringify(rebranding, null, 2), REBRANDING_JSON);
    }

    private static parseToColorSemantics(groups: FigmaNode[], styles: any): ColorSemantic[] {

        return groups.map((group: FigmaNode) => {
            const light_style_id = group.children.find((child: any) => child.name.toLowerCase() == 'light').styles.fill;
            const dark_style_id = group.children.find((child: any) => child.name.toLowerCase() == 'dark').styles.fill;
            const light = styles[light_style_id];
            const dark = styles[dark_style_id];
            const light_semantic = this.standardizeColorTokenName({
                name: light.name.toLowerCase(),
                category: '',
                token: '',
                color: ''
            });
            const dark_semantic = this.standardizeColorTokenName({
                name: dark.name.toLowerCase(),
                category: '',
                token: '',
                color: ''
            });
            const semantic_name = group.name;
            const new_semantic: ColorSemantic = {
                name: semantic_name,
                tokenCategoryLight: light_semantic.category,
                tokenLight: light_semantic.token,
                tokenCategoryDark: dark_semantic.category,
                tokenDark: dark_semantic.token
            };
            return new_semantic;
        });
    }

    private static parseToColorTokenCategories(color_tokens: ColorToken[]): ColorTokenCategory[] {
        const color_token_categories: ColorTokenCategory[] = [];
        color_tokens.forEach((color_token: ColorToken) => {
            const found_color_token_category = color_token_categories.find((color_token_category: ColorTokenCategory) => color_token_category.category === color_token.category);
            if (found_color_token_category == null) {
                const new_category: ColorTokenCategory = {
                    category: color_token.category,
                    tokens: [color_token]
                };
                color_token_categories.push(new_category);
            } else {
                found_color_token_category.tokens.push(color_token);
            }
        });
        return color_token_categories;
    }

    private static async fetchFile() {
        const api_base_url = EnvUtil.get(Env.Figma_Api_Base_Url);
        const file_id = EnvUtil.get(Env.File_Id);
        const file_url = `${api_base_url}/files/${file_id}`;
        const headers: any = {};
        headers[HttpHeader.Figma_Token] = EnvUtil.get(Env.Figma_Token);
        const response = await axios.get(file_url, { headers });
        return response.data;
    }

    private static standardizeColorTokenNames(color_tokens: ColorToken[]): ColorToken[] {
        return color_tokens.map((color_token: ColorToken) => this.standardizeColorTokenName(color_token));
    }

    private static standardizeColorTokenName(color_token: ColorToken): ColorToken {
        const seperator = '/';
        const words = color_token.name.split(seperator);
        const colorCategory = words[0].toLocaleLowerCase();
        const colorToken = words[1];
        const standardized_color_token = colorToken.replace(' ', '-').toLowerCase();
        color_token.name = `${colorCategory}/${standardized_color_token}`;
        color_token.category = colorCategory;
        color_token.token = standardized_color_token;
        return color_token;
    }

    private static removeDuplicateColorTokens(color_tokens: FigmaNode[]): ColorToken[] {
        const unique_tokens = new Set();
        color_tokens.map((color_token: any) => {
            delete color_token.key;
            delete color_token.styleType;
            delete color_token.description;
            unique_tokens.add(JSON.stringify(color_token));
        });
        return Array.from(unique_tokens).map((unique_token: any) => JSON.parse(unique_token));
    }

    private static parseColorTokens(color_tokens: FigmaNode[], styles: [string, FigmaNode][], nodes: FigmaNode[]) {
        nodes.forEach((node: FigmaNode) => {
            if (node.type === FigmaNodeType.Rectangle) {
                const { r: red, g: green, b: blue, a: alpha } = node.fills[0].color;
                const nodeId = node.styles.fill;

                const foundStyles = styles.find(([node_id, _]) => node_id === nodeId);
                if (foundStyles)
                    color_tokens.push({
                        ...foundStyles[1],
                        color: ColorUtil.rgbaToHex(
                            Math.round(red * 255),
                            Math.round(green * 255),
                            Math.round(blue * 255),
                            Math.round(alpha * 255)),
                    });
            }
            if (node.children !== undefined && Array.isArray(node.children)) {
                this.parseColorTokens(color_tokens, styles, node.children);
            }
        });
    };
}