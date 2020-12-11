export const Extendee = { extended: { type: String } };

export const Type = { type: String };

export const ArrayedObject = { a: { type: String }, b: { type: Number } };

export const Sample = {
  string: { type: String },
  number: { type: Number },
  boolean: { type: Boolean },
  date: { type: Date },
  object: { string: { type: String, required: true } },
  stringArray: [ { type: String } ],
  objectArray: [
    {
      a: { type: String },
      b: { type: Number }
    }
  ],
  enums: { enum: [ 'a', 'b' ], type: String },
  type: { type: String },
  required: { type: String, required: true },
  id: { type: String, unique: true, required: true },
  extended: { type: String }
};
