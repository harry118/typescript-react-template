process.env.BABEL_ENV = "test";
process.env.NODE_ENV = "test";

const argv = process.argv.slice(2);

process.on("unhandledRejection", (err) => {
  throw err;
});

if (!process.env.CI) {
  if (argv.indexOf("--watchAll") === -1) {
    argv.push("--watch");
  }
} else {
  if (argv.indexOf("--coverage") === -1) {
    argv.push("--coverage");
  }
}

if (argv.indexOf("--config") === -1) {
  argv.push("--config=jest.config.js");
}

argv.push("--env=jsdom");

/* tslint:disable:no-var-requires */
require("jest").run(argv);
