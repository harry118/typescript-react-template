"use strict";
module.exports = {
  types: [
    { value: "feat", name: "feat:    一个新的特性" },
    { value: "fix", name: "fix:    修复一个Bug" },
    { value: "docs", name: "docs:    变更的只有文档" },
    { value: "style", name: "style:    空格, 分号等格式修复" },
    {
      value: "refactor",
      name: "refactor:    代码重构，注意和特性、修复区分开",
    },
    { value: "perf", name: "perf:    提升性能" },
    { value: "test", name: "test:    添加一个测试" },
    { value: "revert", name: "revert:    代码回退" },
  ],
  scopes: [
    { name: "测试1" },
    { name: "模块2" },
    { name: "模块3" },
    { name: "模块4" },
  ],
  // it needs to match the value for field type. Eg.: 'fix'
  /*  scopeOverrides: {
    fix: [
      {name: 'merge'},
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },  */
  // override the messages, defaults are as follows
  messages: {
    type: "选择一种你的提交类型:",
    scope: "请输入修改范围(可选),例如:功能1:",
    // used if allowCustomScopes is true
    customScope: "Denote the SCOPE of this change:",
    subject: "请简要描述提交:\n",
    body: '长说明，使用"|"换行(可选)：\n',
    breaking: "非兼容性说明 (可选):\n",
    footer: "关联关闭的issue，例如：#31, #34(可选):\n",
    confirmCommit: "确定提交说明?(yes/no)",
  },
  allowCustomScopes: true,
  allowBreakingChanges: ["特性", "修复"],
  // limit subject length
  subjectLimit: 100,
};
