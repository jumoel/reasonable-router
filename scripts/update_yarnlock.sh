#!/usr/bin/env sh

git log --name-status -1 | grep "greenkeeper" || { echo "Not a greenkeeper commit."; exit 0; }

echo "Updating lockfile"
yarn

USER_EMAIL=${USER_EMAIL:-"circleci@users.noreply.github.com"}
USER_NAME=${USER_NAME:-"CircleCI"}
git add yarn.lock

git -c user.email=$USER_EMAIL -c user.name=$USER_NAME commit -m 'chore(yarn): update yarn.lock [skip ci]' 
git push origin $CIRCLE_BRANCH