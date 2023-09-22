import { NumberField } from "./types/number";
import { StringField } from "./types/string";

type ValidationFunction<T> = (value?: T) => void;
type FieldValidation<T> = {
  name: string;
  function: ValidationFunction<T>;
};

export class Field<T> {
  public validations: FieldValidation<T>[] = [];
  public name: string;
  public label: string;
  public type!: string;

  constructor({
    name,
    label,
    type,
  }: {
    name: string;
    label: string;
    type?: string;
  }) {
    this.name = name;
    this.label = label;
    if (type) {
      this.type = type;
    }
  }

  validate(value: T) {
    for (const validator of this.validations) {
      validator.function(value);
    }
  }

  required(message?: string) {
    this.validations.push({
      name: "required",
      function: (value?: T) => {
        const errorMessage =
          message?.replace("{value}", String(value)) ||
          `${this.label} is required.`;
        if (!value) {
          throw new Error(errorMessage);
        }
      },
    });
    return this;
  }
}

export const cms = {
  string: ({ name, label }: { name: string; label: string }) => {
    return new Field({ name, label });
  },
};
