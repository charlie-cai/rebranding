import { FigmaNodeStyleType, FigmaNodeType } from "../enums"

export interface FigmaNode {
    key: string;
    name: string;
    styleType: FigmaNodeStyleType;
    type: FigmaNodeType;
    fills: any[];
    children: any[];
    description: string;
    color: string;
    styles: any;
}