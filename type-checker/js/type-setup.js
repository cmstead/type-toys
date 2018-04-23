const typeSetup = (function () {
    'use strict';


    function getBasicTypes() {
        return [
            {
                typeName: '*',
                description: 'Any type; all types satisfy it',
                usage: '*',
                examples: ['*'],
                arityRange: [0, 0]
            },
            {
                typeName: 'arguments',
                description: 'Arguments; arrays and argument objects satisfy it',
                usage: 'arguments',
                examples: ['arguments'],
                arityRange: [0, 0]
            },
            {
                typeName: 'array',
                description: 'Array; typed and untyped arrays satisfy it',
                usage: 'array, array<type name>',
                examples: [
                    'array',
                    'array<int>',
                    'array<array<string>>'
                ],
                arityRange: [0, 1]
            },
            {
                typeName: 'boolean',
                description: 'Boolean; only booleans satisfy it',
                usage: 'boolean',
                examples: ['boolean'],
                arityRange: [0, 0]
            },
            {
                typeName: 'function',
                description: 'Function; only functions satisfy it',
                usage: 'function, function<function signature>',
                examples: [
                    'function',
                    'function<number, number => number>'
                ],
                arityRange: [0, 1]
            },
            {
                typeName: 'int',
                description: 'Integer; integers and Infinity satisfy this',
                usage: 'int',
                examples: ['int'],
                arityRange: [0, 0]
            },
            {
                typeName: 'null',
                description: 'Null; only null value satisfies it',
                usage: 'null',
                examples: ['null'],
                arityRange: [0, 0]
            },
            {
                typeName: 'number',
                description: 'Number; only number values satisfy it',
                usage: 'number',
                examples: ['number'],
                arityRange: [0, 0]
            },
            {
                typeName: 'object',
                description: 'Object; objects and null satisfy it',
                usage: 'object',
                examples: ['object'],
                arityRange: [0, 0]
            },
            {
                typeName: 'regexp',
                description: 'Regular Expression; regular expression objects satisfy it',
                usage: 'regexp',
                examples: ['regexp'],
                arityRange: [0, 0]
            },
            {
                typeName: 'string',
                description: 'String; string values satisfy it',
                usage: 'string',
                examples: ['string'],
                arityRange: [0, 0]
            },
            {
                typeName: 'symbol',
                description: 'Symbol; symbol values satisfy it',
                usage: 'symbol',
                examples: ['symbol'],
                arityRange: [0, 0]
            },
            {
                typeName: 'tuple',
                description: 'Typed, fixed-length collection; correct-length arrays with appropriately typed values with correct positions satisfy this',
                usage: 'tuple<type 1[, type 2[, type 3[, ...]]]>',
                examples: [
                    'tuple<number>',
                    'tuple<int, int>',
                    'tuple<string, object, function>'
                ],
                arityRange: [1, Infinity]
            },
            {
                typeName: 'undefined',
                description: 'Undefined; undefined only satisfies it',
                usage: 'undefined',
                examples: ['undefined'],
                arityRange: [0, 0]
            }
        ];
    }

    function getAdvancedTypes() {
        return [
            {
                typeName: 'bounded',
                description: 'Bounded values; numeric values and values with a length can be bounded',
                usage: 'bounded<type string, minimum, maximum>',
                examples: [
                    'bounded<int, -3, 5>',
                    'bounded<string, 5, 100>',
                    'bounded<array<object>, 1, 10>'
                ],
                arityRange: [3, 3]
            },
            {
                typeName: 'boundedFiniteInt',
                description: 'Bounded integers; integer values within bounds satisfy it, Infinity does not',
                usage: 'boundedFiniteInt<minimum, maximum>',
                examples: [
                    'boundedFiniteInt<100, 10000>'
                ],
                arityRange: [2, 2]
            },
            {
                typeName: 'boundedFiniteNumber',
                description: 'Bounded numbers; number values within bounds satisfy it, Infinity does not',
                usage: 'boundedFiniteNumber<minimum, maximum>',
                examples: [
                    'boundedFiniteNumber<-81.3, 46.5>'
                ],
                arityRange: [2, 2]
            },
            {
                typeName: 'boundedInt',
                description: 'Bounded integer; integer values within bounds satisfy it, Infinity is acceptable',
                usage: 'boundedInt<minimum, maximum>',
                examples: [
                    'boundedInt<5, 93>'
                ],
                arityRange: [2, 2]
            },
            {
                typeName: 'boundedNumber',
                description: 'Bounded number; number values within bounds satisfy it, Infinity is acceptable',
                usage: 'boundedNumber<minimum, maximum>',
                examples: [
                    'boundedNumber<100.3, 987.123>'
                ],
                arityRange: [2, 2]
            },
            {
                typeName: 'boundedString',
                description: 'Bounded string by length; strings which are within the length bounds satisfy it',
                usage: 'boundedString<minimum, maximum>',
                examples: [
                    'boundedString<10, 255>'
                ],
                arityRange: [2, 2]
            },
            {
                typeName: 'composite',
                description: 'Composes two types together to create a new type',
                usage: 'composite<type 1[, type 2[, type 3[, ...]]]>',
                examples: [
                    'composite<int, boundedNumber<-3, 10>>',
                    'composite<not<undefined>, not<null>>'
                ],
                arityRange: [1, Infinity]
            },
            {
                typeName: 'decimalPrecision',
                description: 'Only accepts values within a certain decimal precision',
                usage: 'decimalPrecision<precision>',
                examples: [
                    'decimalPrecision<0>',
                    'decimalPrecision<5>'
                ],
                arityRange: [1, 1]
            },
            {
                typeName: 'decreasing',
                description: 'Decreasing sequence; sequences which are monotone decreasing satisfy this',
                usage: 'decreasing<type>',
                examples: [
                    'decreasing<int>',
                    'decreasing<string>'
                ],
                arityRange: [1, 1]
            },
            {
                typeName: 'formattedString',
                description: 'Formatted string; strings matching the regular expression satisfy this',
                usage: 'formattedString<regex>',
                examples: [
                    'formattedString<^-?[1-9][0-9]*(.[0-9]+)?$>'
                ],
                arityRange: [1, 1]
            },
            {
                typeName: 'increasing',
                description: 'Increasing sequence; sequences which are monotone increasing satisfy this',
                usage: 'increasing<type>',
                examples: [
                    'increasing<int>',
                    'increasing<string>'
                ],
                arityRange: [1, 1]
            },
            {
                typeName: 'leftBounded',
                description: 'Left bounded value; numeric values and values with a length can satisfy this',
                usage: 'leftBounded<type, minimum>',
                examples: []
            },
            {
                typeName: 'leftBoundedFiniteInt',
                description: ''
            },
            {
                typeName: 'leftBoundedFiniteNumber',
                description: ''
            },
            {
                typeName: 'leftBoundedInt',
                description: ''
            },
            {
                typeName: 'leftBoundedNumber',
                description: ''
            },
            {
                typeName: 'leftBoundedString',
                description: ''
            },
            {
                typeName: 'monotone',
                description: ''
            },
            {
                typeName: 'not',
                description: ''
            },
            {
                typeName: 'rightBounded',
                description: ''
            },
            {
                typeName: 'rightBoundedFiniteInt',
                description: ''
            },
            {
                typeName: 'rightBoundedFiniteNumber',
                description: ''
            },
            {
                typeName: 'rightBoundedString',
                description: ''
            },
            {
                typeName: 'sequence',
                description: ''
            },
            {
                typeName: 'unorderedProduct',
                description: ''
            },
            {
                typeName: 'variant',
                description: ''
            }
        ];
    }

    return {
        getAdvancedTypes: getAdvancedTypes,
        getBasicTypes: getBasicTypes
    };

})();