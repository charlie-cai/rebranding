import { ColorJson } from '../models';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ArrayUtil } from '../utils';
import { FigmaNode } from '../interfaces';

describe('ColorJson', () => {

    let color_json: ColorJson;
    let constraints: any[];
    let errors: any[];

    beforeAll(async () => {
        color_json = plainToInstance(ColorJson, {
            tokens: [
                {
                    name: "blue-blue",
                    hex: "#FFFFFF"
                },
                {
                    name: "blue-02",
                    hex: "#AAAAAA"
                },
                {
                    name: "blue-03",
                    hex: "#GGGGGG"
                },
                {
                    name: "blue-03",
                    hex: "#CCCCCC"
                }
            ],
            groups: [
                {
                    name: "action-action",
                    colors: [
                        {
                            name: "action",
                            description: "Primary background color used for most buttons",
                            light: "blue-02",
                            dark: "blue-02"
                        },
                        {
                            name: "action-tertiary-go",
                            description: "Background color for secondary buttons",
                            light: "blue-02",
                            dark: "blue-02"
                        },
                        {
                            name: "action-tertiary-go",
                            description: "Background color for secondary buttons",
                            light: "blue-02",
                            dark: "blue-02"
                        }]

                }]
        });

        const findAllConstraints = (constraints: any[], node: any) => {
            if (node.constraints != null) {
                constraints.push(node.constraints);
            }

            node.children.forEach((child: FigmaNode) => {
                findAllConstraints(constraints, child)
            });
        }

        const error_objects = await validate(color_json);

        constraints = [];
        error_objects.forEach((error_object: any) => {
            findAllConstraints(constraints, error_object);
        });

        errors = ArrayUtil
            .flatmap(constraints
                .map((constraint: any) => Object.values(constraint)))

    });

    test(`it should return invalid token color name error`, () => {
        expect(errors).toContain('Invalid color token name')
    });

    test(`it should return invalid semantic color name error`, () => {
        expect(errors).toContain('Invalid color semantic name')
    });

    test(`it should return invalid hex color name error`, () => {
        expect(errors).toContain('Invalid hex color string');
    });

    test(`it should return duplicated semantic color name error`, () => {
        expect(errors).toContain("All colors's elements must be unique");
    });

    test(`it should return duplicated token color name error`, () => {
        expect(errors).toContain("All tokens's elements must be unique");
    });
});