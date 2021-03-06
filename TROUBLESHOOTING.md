### Errors while running `npm run dev`
Sometimes it helps to just remove all dependencies and install them from the beginning.
```
npm run clean
npm run setup
```
#### EACCESS / Permission Errors on Devbox
The easiest way to fix permissions is to remove `/usr/wikia/mobile-wiki` and run `sudo chef-client` which clones the repo and sets permissions from scratch. See [chef recipe](https://github.com/Wikia/chef-repo/blob/master/cookbooks/mobile-wiki/recipes/dev.rb) for more details on what it does.

### Errors while running `npm install`
#### libsass
So far, we've encountered one error connected to compiling `libsass`. It happened on Ubuntu 12.04 (pretty old version but still a LTS version). The issue was connected to outdated g++ compiler. `libsass` requires version 4.8+ and by default Ubuntu 12.04 has 4.6 to update it go to your terminal and manually install g++-4.8:
`sudo apt-get remove g++-4.6`
`sudo apt-get install g++-4.8`
`sudo ln -s /usr/bin/g++-4.8 /usr/bin/g++`

#### Debian and its nodejs binary
Debian (the issue was found on version: `Debian 3.16.7-ckt4-3 (2015-02-03)`) installs node.js interpreter binary as `nodejs` instead of `node` because of name conflicts with other applications. The `/usr/share/doc/nodejs/README.Debian` reads:
> nodejs command
> --------------
>
> The upstream name for the Node.js interpreter command is "node".
> In Debian the interpreter command has been changed to "nodejs".
>
> This was done to prevent a namespace collision: other commands use the same name in their upstreams, such as ax25-node from the "node" package.
>
> Scripts calling Node.js as a shell command must be changed to instead use the "nodejs" command.
However, changing dependencies scripts does not sound right way. I suggest creating a symlink in `/usr/bin`:
```sh
sudo ln -s /usr/bin/nodejs /usr/bin/node
$ ls /usr/bin/ | grep node
node
node-gyp
nodejs
```
