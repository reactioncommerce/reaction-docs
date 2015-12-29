# Requirements
## Linux / OS X

-  [Node.js](https://nodejs.org/) with NPM
- _`ImageMagick` - Optional but suggested_

## Windows
Windows installation has a few more requirements:

- [Node.js](https://nodejs.org/) with NPM
- Win32 OpenSSL ([windows installer](https://slproweb.com/products/Win32OpenSSL.html))
- Visual Studio 2008 redistributable
- Git + msysGit ([git-for-windows/git](https://github.com/git-for-windows/git/releases))
- ImageMagick

We use bower to install some core dependencies. To use Bower on Windows, you must install msysGit. See: [https://github.com/bower/bower/tree/master#windows-users](https://github.com/bower/bower/tree/master#windows-users)

Install OpenSSL per  [npm-node-aes-gcm/README.md](https://github.com/meteor/meteor/blob/devel/packages/non-core/npm-node-aes-gcm/README.md).

If you want to use shell scripts under Windows:

	- Create file named `meteor` inside `%localappdata%\.meteor` with following contents:
	- !/bin/sh
	- cmd //c "$0.bat" "$@"
	- Run shell scripts from `Git Bash`. For example:
	- cd reaction/
	- bin/clone-packages.sh
	- bin/reset
