module.exports = {
  // extends: ["cz"],
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "docs", "style", "refactor", "test", "revert"],
    ],
    // 忽略
    "subject-case": [0],
  },
};
