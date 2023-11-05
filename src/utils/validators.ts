const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH';
const VALIDATOR_TYPE_MIN = 'MIN';
const VALIDATOR_TYPE_MAX = 'MAX';
const VALIDATOR_TYPE_EMAIL = 'EMAIL';
const VALIDATOR_TYPE_FILE = 'FILE';
const VALIDATOR_TYPE_PASSWORD = 'PASSWORD';
const VALIDATOR_TYPE_MATCH = 'MATCH';
const VALIDATOR_TYPE_USERNAME = 'USERNAME';

export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });
export const VALIDATOR_MINLENGTH = (val: number) => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val,
});
export const VALIDATOR_MAXLENGTH = (val: number) => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val: val,
});
export const VALIDATOR_MIN = (val: number) => ({
  type: VALIDATOR_TYPE_MIN,
  val: val,
});
export const VALIDATOR_MAX = (val: number) => ({
  type: VALIDATOR_TYPE_MAX,
  val: val,
});
export const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL });

export const VALIDATOR_USERNAME = () => ({ type: VALIDATOR_TYPE_USERNAME });

export const VALIDATOR_PASSWORD = (val: string) => ({
  type: VALIDATOR_TYPE_PASSWORD,
  val: val,
});
export const VALIDATOR_MATCH = (val: string) => ({
  type: VALIDATOR_TYPE_MATCH,
  val: val,
});

export const validate = (value: any, validators: any) => {
  let isValid = true;
  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      isValid = isValid && value.trim().length > 0;
    }
    if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      isValid =
        isValid && value.replaceAll(' ', '').trim().length >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
      isValid =
        isValid && value.replaceAll(' ', '').trim().length <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MIN) {
      isValid = isValid && +value >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAX) {
      isValid = isValid && +value <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_EMAIL) {
      isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
    }

    if (validator.type === VALIDATOR_TYPE_USERNAME) {
      const pattern = /^[a-zA-Z0-9_]+$/;
      isValid = isValid && pattern.test(value);
    }

    if (validator.type === VALIDATOR_TYPE_PASSWORD) {
      isValid =
        isValid &&
        value.match(new RegExp('(?=[^A-Z]*[A-Z])')) &&
        value.match(new RegExp('(?=[^a-z]*[a-z])')) &&
        value.match(new RegExp('(?=[^0-9]*[0-9])')) &&
        value.match(new RegExp('(?=.*[^A-Za-z0-9])')) &&
        value.length >= 6 &&
        value.length <= 16;
    }
    if (validator.type === VALIDATOR_TYPE_MATCH) {
      isValid = isValid && value === validator.val;
    }
  }
  return isValid;
};
