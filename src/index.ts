/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */
import * as TJS from 'typescript-json-schema';
import util from 'util';

export default ({ file }: { file: string }): string | void => {
  // optionally pass argument to schema generator
  const settings = {
    required: true,
    ref: false
  };

  // optionally pass ts compiler options
  const compilerOptions = {
    strictNullChecks: true
  };

  interface JSONSchema {
    [x: string]: any;
  }

  const properties = (object: JSONSchema) => {
    if (object.type === 'object' && object.properties) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      object = object.properties;
    }
    Object.keys(object || {}).forEach((key: string) => {
      if (typeof object[key] === 'object' && !Array.isArray(object[key])) {
        object[key] = properties(object[key]);
      }
    });
    return object;
  };

  const items = (object: JSONSchema) => {
    if (
      object.type === 'array' &&
      object.items &&
      typeof object.items === 'object'
    ) {
      if (object.required) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        object.items.required = object.required;
      }
      object = [object.items];
    }
    Object.keys(object || {}).forEach((key: string) => {
      if (typeof object[key] === 'object' && !Array.isArray(object[key])) {
        object[key] = items(object[key]);
      }
    });
    return object;
  };

  const replace = (object: JSONSchema) => {
    if (
      object.type === 'string' &&
      (object.format === 'date-time' || object.format === 'date')
    ) {
      object.type = Date;
      delete object.format;
    }
    if (object.type === 'string') {
      object.type = String;
    }
    if (object.type === 'number') {
      object.type = Number;
    }
    if (object.type === 'boolean') {
      object.type = Boolean;
    }
    if (object.description && typeof object.description === 'string') {
      delete object.description;
    }
    if (object.$schema && typeof object.$schema === 'string') {
      delete object.$schema;
    }
    if (object.id && /#$/.test(object.id)) {
      delete object.id;
      object.unique = true;
    }
    Object.keys(object || {}).forEach((key) => {
      if (typeof object[key] === 'object' && !Array.isArray(object[key])) {
        object[key] = replace(object[key]);
      }
    });
    if (
      object.required &&
      object.required instanceof Array &&
      object.properties
    ) {
      object.required.forEach((key: string | number) => {
        object.properties[key].required = true;
      });
      object.required = undefined;
    }
    return object;
  };

  const program = TJS.getProgramFromFiles([file], compilerOptions);
  const generator = TJS.buildGenerator(program, settings);

  if (generator) {
    const symbols = generator.getMainFileSymbols(program);
    return `${symbols
      .map((symbol) => {
        const schema = generator.getSchemaForSymbol(symbol);
        return `export const ${symbol} = ${util
          .inspect(items(properties(replace(schema))), false, null)
          .replace(/\[Function: ([^\]]+)\]/g, '$1')};`;
      })
      .join('\n\n')}\n`;
  }
  return;
};
