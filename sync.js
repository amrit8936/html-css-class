const { execSync } = require("child_process");
const readline = require("readline");

function run(cmd, options = {}) {
  try {
    return execSync(cmd, { encoding: "utf8", ...options }).trim();
  } catch (err) {
    const stderr = err.stderr?.toString() || err.message;
    if (stderr.includes("not a git repository")) {
      console.error("❌ This folder is not a Git repository. Run 'git init' first or open a repository folder.");
      process.exit(1);
    }

    console.error(`Error running command: ${cmd}`);
    console.error(err.message);
    process.exit(1);
  }
}

// 1. Check git status
console.log("Checking git status...");
const status = run("git status --porcelain");

if (!status) {
  console.log("✅ No changes detected. Everything is up to date!");
  process.exit(0);
}

console.log("\nChanges detected:\n");
console.log(status);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const defaultMessage = `update: ${new Date().toLocaleDateString()}`;

rl.question(
  `\nEnter commit message (press Enter for default: "${defaultMessage}"): `,
  (answer) => {
    const commitMessage = answer.trim() || defaultMessage;

    console.log("\nStaging changes...");
    run("git add .");

    console.log(`Committing changes: "${commitMessage}"...`);
    run(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`);

    console.log("Pushing to GitHub...");
    try {
      execSync("git push origin main", { stdio: "inherit" });
      console.log("\n🎉 Successfully pushed to GitHub!");
    } catch (err) {
      console.error(
        "\n❌ Failed to push. Make sure you are connected to the internet and authenticated.",
      );
    }

    rl.close();
  },
);