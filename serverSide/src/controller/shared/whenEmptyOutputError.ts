export const whenEmptyOutputError = (string: string) => {
  if (string === null) {
    throw new Error(`nullは入力できません。`);
  }
  if (string === undefined) {
    throw new Error(`undefinedは入力できません。`);
  }
  if (string === '') {
    throw new Error(`空のstringは入力できません。`);
  }
};
