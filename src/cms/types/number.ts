import { Field } from "../field";

export function create(field: Field<any>) {
  return new NumberField(field);
}

export class NumberField extends Field<number> {
  constructor(field: Field<any>) {
    super({ name: field.name, label: field.label, type: "number" });
    this.validations.push({
      name: "number",
      function: (value) => {
        if (typeof value !== "number") {
          throw new Error(`${this.label} must be a number.`);
        }
      },
    });
  }

  min(min: number, message?: string) {
    this.validations.push({
      name: "min",
      function: (value) => {
        if (value! < min) {
          const errorMessage =
            message?.replace("{value}", String(value)) ||
            `${this.label} must be at least ${min}.`;
          throw new Error(errorMessage);
        }
      },
    });
    return this;
  }

  max(max: number, message?: string) {
    this.validations.push({
      name: "max",
      function: (value) => {
        if (value! > max) {
          const errorMessage =
            message?.replace("{value}", String(value)) ||
            `${this.label} must be at most ${max}.`;
          throw new Error(errorMessage);
        }
      },
    });
    return this;
  }

  integer(message?: string) {
    this.validations.push({
      name: "integer",
      function: (value) => {
        if (!Number.isInteger(value!)) {
          const errorMessage =
            message?.replace("{value}", String(value)) ||
            `${this.label} must be an integer.`;
          throw new Error(errorMessage);
        }
      },
    });
    return this;
  }

  positive(message?: string) {
    this.validations.push({
      name: "positive",
      function: (value) => {
        if (value! < 0) {
          const errorMessage =
            message?.replace("{value}", String(value)) ||
            `${this.label} must be positive.`;
          throw new Error(errorMessage);
        }
      },
    });
    return this;
  }

  negative(message?: string) {
    this.validations.push({
      name: "negative",
      function: (value) => {
        if (value! > 0) {
          const errorMessage =
            message?.replace("{value}", String(value)) ||
            `${this.label} must be negative.`;
          throw new Error(errorMessage);
        }
      },
    });
    return this;
  }
}

create.prototype = NumberField.prototype;
