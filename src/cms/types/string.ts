import { Field } from "../field";

let rEmail =
  // eslint-disable-next-line
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

let rUrl =
  // eslint-disable-next-line
  /^((https?|ftp):)?\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

// eslint-disable-next-line
let rUUID =
  /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

export function create(field: Field<any>) {
  return new StringField(field);
}

export class StringField extends Field<string> {
  constructor(field: Field<any>) {
    super({
      name: field.name,
      label: field.label,
      type: "string",
    });
    this.validations.push({
      name: "string",
      function: (value) => {
        if (typeof value !== "string") {
          throw new Error(`${this.label} must be a string.`);
        }
      },
    });
  }

  // Add specific validation methods for strings
  minLength(length: number, message?: string) {
    this.validations.push({
      name: "minLength",
      function: (value) => {
        if (value!.length < length) {
          const errorMessage =
            message?.replace("{value}", String(value)) ||
            `${this.label} must have a minimum length of ${length}.`;
          throw new Error(errorMessage);
        }
      },
    });
    return this;
  }

  maxLength(length: number, message?: string) {
    this.validations.push({
      name: "maxLength",
      function: (value) => {
        if (value!.length > length) {
          const errorMessage =
            message?.replace("{value}", String(value)) ||
            `${this.label} must have a maximum length of ${length}.`;
          throw new Error(errorMessage);
        }
      },
    });
    return this;
  }

  email(message?: string) {
    this.validations.push({
      name: "email",
      function: (value) => {
        if (!rEmail.test(value!)) {
          const errorMessage =
            message?.replace("{value}", String(value)) ||
            `${this.label} must be an email address.`;
          throw new Error(errorMessage);
        }
      },
    });
    return this;
  }

  url(message?: string) {
    this.validations.push({
      name: "url",
      function: (value) => {
        if (rUrl.test(value!)) {
          const errorMessage =
            message?.replace("{value}", String(value)) ||
            `${this.label} must be a URL.`;
          throw new Error(errorMessage);
        }
      },
    });
    return this;
  }

  uuid(message?: string) {
    this.validations.push({
      name: "uuid",
      function: (value) => {
        if (rUUID.test(value!)) {
          const errorMessage =
            message?.replace("{value}", String(value)) ||
            `${this.label} must be a UUID.`;
          throw new Error(errorMessage);
        }
      },
    });
    return this;
  }
}

create.prototype = StringField.prototype;
