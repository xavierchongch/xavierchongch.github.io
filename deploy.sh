#!/usr/bin/env bash
set -euo pipefail

target_branch="${DEPLOY_BRANCH:-main}"
commit_message="${*:-Update portfolio site}"

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "This must be run from inside the Git repository."
  exit 1
fi

if ! git remote get-url origin >/dev/null 2>&1; then
  echo "No Git remote named origin is configured."
  exit 1
fi

echo "Fetching origin/${target_branch}..."
git fetch origin "${target_branch}"

echo "Staging all changes..."
git add -A

if git diff --cached --quiet; then
  echo "No changes to commit."
else
  echo "Committing changes..."
  git commit -m "${commit_message}"
fi

if ! git merge-base --is-ancestor "origin/${target_branch}" HEAD; then
  echo "Refusing to push because this branch is not based on origin/${target_branch}."
  echo "Merge or rebase origin/${target_branch} first, then run this script again."
  exit 1
fi

echo "Pushing current commit to origin/${target_branch}..."
git push origin "HEAD:${target_branch}"

echo "Done. GitHub Pages will update from the ${target_branch} branch."
