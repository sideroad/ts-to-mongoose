export const Extendee = { extended: { type: String } };

export const Type = { type: String };

export const ArrayedObject = { a: { type: String }, b: { type: Number } };

export const Sample = {
  string: { type: String },
  number: { type: Number },
  boolean: { type: Boolean },
  date: { type: Date },
  stringArray: [{ type: String }],
  objectArray: [
    {
      a: { type: String },
      b: { type: Number }
    }
  ],
  enums: { enum: ['a', 'b'], type: String },
  type: { type: String },
  required: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  extended: { type: String }
};
