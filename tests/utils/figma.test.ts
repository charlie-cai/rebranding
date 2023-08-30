import { FigmaNode, TestCase } from '../../interfaces';
import { FigmaUtil } from '../../utils';

describe('FigmaUtil', () => {

    describe('searchByNodeIdArray method', () => {

        let targetNode: FigmaNode;
        let test_case: TestCase<any, any | null>;

        beforeEach(() => {

            targetNode = {
                id: '4'
            }

            test_case = {
                input: {
                    node: {
                        children: [
                            {
                                id: '1',
                                children: [{
                                    id: '2',
                                    children: [{
                                        id: '3',
                                        children: [targetNode]
                                    }]
                                }]
                            }
                        ]
                    },
                    nodeInArray: ['1', '2', '3', '4']
                }, result: targetNode
            }
        });

        test(`searchByNodeIdArray should work as expected`, () => {
            expect(FigmaUtil.searchByNodeIdPath(test_case.input.node, test_case.input.nodeInArray)).toBe(test_case.result);
        });
    });

    describe('searchByChildrenIndexArray method', () => {

        let targetNode: FigmaNode;
        let test_case: TestCase<any, any | null>;

        beforeEach(() => {

            targetNode = {
                id: '4'
            }

            test_case = {
                input: {
                    node: {
                        children: [
                            {
                                children: [{
                                    children: [{
                                        children: [targetNode]
                                    }]
                                }]
                            }
                        ]
                    },
                    childrenIndexArray: [0, 0, 0, 0]
                }, result: targetNode
            }
        });

        test(`searchByChildrenIndexArray should work as expected`, () => {
            expect(FigmaUtil.searchByChildrenIndexPath(test_case.input.node, test_case.input.childrenIndexArray)).toBe(test_case.result);
        });
    });

    describe('sanitizeColorName method', () => {

        let test_cases: TestCase<string, string>[];

        beforeEach(() => {

            test_cases = [
                { input: 'ACTION-primary', result: 'action-primary' },
                { input: '   action-primary', result: 'action-primary' },
                { input: 'action-primary   ', result: 'action-primary' },
                { input: 'action-   primary', result: 'action-primary' },
            ]
        });

        test(`sanitizeColorName should work as expected`, () => {
            test_cases.forEach((test_case: TestCase<string, string>) => {
                expect(FigmaUtil.sanitizeColorName(test_case.input)).toBe(test_case.result);
            })
        });
    });

});