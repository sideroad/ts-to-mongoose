interface Extendee {
  extended?: string;
}

type Type = string;

interface ArrayedObject {
  a?: string;
  b?: number;
}

export interface Sample extends Extendee {
  /**
   * Leteral values.
   */
  string?: string;
  number?: number;
  boolean?: boolean;

  /**
   * Complex values
   */
  date?: Date;
  object: {
    string: string;
  };
  stringArray?: string[];
  objectArray?: Array<ArrayedObject>;

  /**
   * enum string
   */
  enums?: 'a' | 'b';

  /**
   * You can use `type`
   */
  type?: Type;

  /**
   * If you want to ignore attribute
   * @ignore false
   */
  shouldBeIgnored?: boolean;

  /**
   *  required attribute
   */
  required: string;

  /**
   * Unique attribute format with @id ${field name}#
   * @id id#
   */
  id: string;
}
