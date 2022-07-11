import { ParserRuleContext } from 'antlr4ts';
import { RulesParser } from '../../rules/RulesParser';
import { RuleTransformation } from '../../../types/rule.types';
import { ParseTreeVisitor } from './ParseTreeVisitor';

const LEFT_BRACES = '{{';
const RIGHT_BRACES = '}}';

export class RuleTransformationVisitor extends ParseTreeVisitor {
  public transformation: RuleTransformation = {};

  public visit(ctx: ParserRuleContext): void {
    switch (ctx.ruleIndex) {
      case RulesParser.RULE_transformationDeclaration: {
        this.transformation.resultPath = ctx.children?.[0]?.text;
        const statement = ctx.children?.[2]?.text;
        if (!statement?.startsWith(LEFT_BRACES)) {
          this.transformation.expression = statement;
        }
        super.visit(ctx);
        break;
      }
      case RulesParser.RULE_script: {
        this.transformation.javaScript = ctx.text?.replace(LEFT_BRACES, '').replace(RIGHT_BRACES, '');
        super.visit(ctx);
        break;
      }
      default:
        super.visit(ctx);
    }
  }
}
