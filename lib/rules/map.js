/**
 * @fileoverview study eslint
 * @author dogunok
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//

module.exports = {
    meta: {
        type: "suggestion",

        docs: {
            description: "disallow unnecessary semicolons",
            category: "Possible Errors",
            recommended: true,
            url: "https://eslint.org/docs/rules/no-extra-semi"
        },
        fixable: "code",
        schema: []
    },
    create: function(context) {
        const selectingMethod = node => {
            return node.object.name === '_' && node.property.name === 'map';
        }
        return {
            "MemberExpression": node => {
                if(selectingMethod(node)){
                const firstArg = node.parent.arguments[0];
                const latterArg = node.parent.arguments[1];

                if (firstArg.type === "ArrayExpression") {
                    const changedText = `${firstArg.name}.map(${latterArg.name})`;

                    context.report({
                        node,
                        message: "Можно использовать нативный `Array#map`",
                        fix: fixer => fixer.replaceTextRange(latterArg.range, changedText)
                    });
                }
                }
            },
            "ReturnStatement": node => {
                if (node.argument.callee && selectingMethod(node.argument.callee)) {

                    const firstArg = node.argument.arguments[0];
                    const latterArg = node.argument.arguments[1];

                    const firstArgIsArray = firstArg.type === "ArrayExpression";
                    let newKindOfFunction = '';

                    if (firstArgIsArray) {

                        newKindOfFunction = `return ${firstArg.name}.map(${latterArg.name});`;
                    }
                    else if (!firstArgIsArray && latterArg) {

                        newKindOfFunction = `return (Array.isArray(${firstArg.name})) ?
                            ${firstArg.name}.map(${latterArg.name}) :
                            _.map(${firstArg.name}, ${latterArg.name});`;

                        if (firstArgIsArray) {
                            newKindOfFunction = `return ${firstArg.name}.map(${latterArg.name});`;
                        }
                    }

                    if (newKindOfFunction) {
                        context.report({
                            node,
                            message: "Можно использовать нативный `Array#map`",
                            fix: fixer => fixer.replaceTextRange(node.range, newKindOfFunction)
                        });
                    };
                };
            }
        };
    }
};