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

        var sourсeCode = context.getSourceCode();
        var variablesIsArray = [];
      
      return {
        "VariableDeclarator": function(node) {
          if (node.init.type === "ArrayExpression") variablesIsArray.push(node.id.name);
        },
        "CallExpression": function(node){
          if (!(node.callee.object.name === "_" && 
                node.callee.property.name === 'map')) return;
          
          var firstArg = node.arguments[0].name || [];
          var latterArg = node.arguments[1].name || [];
          
          console.log()
        },
        "ReturnStatement": function(node) {
         // console.log(node)
        }
      }
    }
};