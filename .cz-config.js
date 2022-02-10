"use strict";

module.exports = {
  types: [
    { value: "feat", name: "✨ feat:     A new feature" },
    { value: "fix", name: "🐞 fix:      A bug fix" },
    { value: "docs", name: "📚 docs:     Documentation only changes" },
    {
      value: "style",
      name: "🌀 style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)",
    },
    {
      value: "refactor",
      name: "🛠 refactor: A code change that neither fixes a bug nor adds a feature",
    },
    {
      value: "perf",
      name: "perf:  A code change that improves performance",
    },
    { value: "test", name: "🏁 test:     Adding missing tests" },
    {
      value: "chore",
      name: "💅 chore: Changes to the build process or auxiliary tools and libraries such as documentation generation",
    },
    { value: "revert", name: "⏪ revert:   Revert to a commit" },
    { value: "wip", name: "💪 wip:      Work in progress" },
  ],
  // types: [
  //   {
  //     value: 'WIP',
  //     name: '💪  WIP:      功能未开发完成,待开发中',
  //   },
  //   {
  //     value: '功能',
  //     name: '✨  功能:     添加新的功能',
  //   },
  //   {
  //     value: '修复',
  //     name: '🐞  修复:     修复一个或多个Bug',
  //   },
  //   {
  //     value: '重构',
  //     name: '🛠  重构:      重构一个功能,业务模块',
  //   },
  //   {
  //     value: '文档',
  //     name: '📚  文档:     文档变更',
  //   },
  //   {
  //     value: '测试',
  //     name: '🏁   测试:     新加测试用例,或更改已有测试',
  //   },
  //   {
  //     value: '工具',
  //     name: '🗯  工具:    开发工具变动,构建脚本,脚手架的升级等',
  //   },
  //   {
  //     value: '代码格式',
  //     name: '💅  代码格式:    代码风格更改(空格,分号等)',
  //   },
  //   {
  //     value: '回滚',
  //     name: '⏪  回滚:   代码回滚到某个版本',
  //   },
  // ],
  messages: {
    type: "选择一种你的提交类型:",
    scope: "选择一个scope (可选):",
    // used if allowCustomScopes is true
    customScope: "表示此次更改的范围(可选):",
    subject: "短说明(主体)(可选):\n",
    body: '长说明,使用"|"换行(可选)：\n',
    breaking: "非兼容性说明 (可选):\n",
    footer: "关联关闭的issue bug，例如：#31, #34(可选):\n",
    confirmCommit: "确定提交说明?",
  },
  scopes: [
    {
      name: "业务模块1",
    },
    {
      name: "业务模块2",
    },
    {
      name: "业务模块3",
    },
  ],

  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix"],
  // limit subject length
  subjectLimit: 100,
};
