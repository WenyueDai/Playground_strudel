Playaround with strudel and make some of my own music!.

# Install strudal locally
Original source: https://www.bilibili.com/video/BV177zQBgEXz/?spm_id_from=333.337.search-card.all.click&vd_source=67d24c3091b92ef188c338583a86a4ce

```
uname -r                          # check your Linux/WSL kernel version to confirm environment

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash  # download and install NVM (Node Version Manager)

. ~/.nvm/nvm.sh                    # load NVM into current shell session

nvm -v                             # verify NVM is installed correctly

nvm install 24                     # install Node.js v24 required for modern Strudel build

corepack enable                    # enable Corepack to manage package managers like pnpm

corepack prepare pnpm@latest --activate  # install and activate latest pnpm via Corepack

pnpm -v                            # verify pnpm installation

git clone https://codeberg.org/uzu/strudel  # clone Strudel source code locally

cd strudel/                        # enter Strudel project directory

pnpm install                       # install all project dependencies from package.json

pnpm build                         # compile the project into optimized production build

pnpm preview                       # start local preview server to run Strudel in browser
```
