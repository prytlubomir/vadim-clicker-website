This branch is a prototype for deployment artifact builds.

It excludes `node-modules` from `.gitignore`.

### How to build

1. `git merge snapshots --no-commit`
2. `git add node_modules`
3. `git commit -m "temp build commit"`
4. `git archive --format=zip --output .zips/project.zip HEAD`
5. `git reset --hard HEAD~`
6. `npm i`

____

# Vadim's Clicker Website

This is a repository for the [Vadim's Clicker](https://github.com/prytlubomir/vadim-clicker) project website by [Pryt Liubomyr](pryt.space).

You can visit it at (https://vadimsclicker.pryt.space/)
