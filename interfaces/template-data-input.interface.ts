import { ColorSemantic, ColorToken } from "../models";

export interface TemplateDataInput {
    semantic_colors: ColorSemantic[];
    token_colors: ColorToken[];
    func: any;
}