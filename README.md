# Amundsen Marketing Site
Built using NPM, Jekyll, and Tailwind.css via `npm start`.

## Repo structure and branches
We use GitHub pages to deploy amundsen.io. We use GitHub _organization_ pages (instead of _project_ pages). There are two ways to deploy GitHub pages:
1. You push the source (HTML, CSS, JS, etc.) to `master` branch and have GitHub build and deploy using Jekyll.
2. You push the distribution (usually a folder called `dist` from local build) to `master` branch. GitHub simply deploys the pre-built distribution then.

We only support option #2 for this repository. This means that `master` branch contains the code for generating the distribution. It also contains the locally built distribution in the `docs` folder (NOT `dist`). Note, as of now, you can only use `master` branch to put content of GitHub pages for an organization.

## Making changes
In order to make changes, you'd have to make changes locally, build using Jekyll, test changes locally and then push both the code and the distribution (in the `docs` folder) to the master branch. Use can follow [these instructions](https://docs.github.com/en/enterprise/2.14/user/articles/setting-up-your-github-pages-site-locally-with-jekyll) to do local set up. In order to build, use `gulp` and to serve locally, use `gulp serve`.
