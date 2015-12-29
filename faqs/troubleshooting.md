# Troubleshooting
**HTTPS Redirect**

You can use `meteor remove force-ssl` to remove redirection to the `https` protocol.  To restore, `meteor add force-ssl`.  When developing locally, you should not have to remove https as Meteor internally redirects all `localhost` requests to the `http` protocol. However, if you are running on a VM, or using Vagrant, you should run `meteor remove force-ssl` and remove this package.

**Failed to load c++ Json message**

You can ignore this error, but if it annoys you can run `xcode-select --install` (on a mac) or `sudo apt-get install gcc make build-essential` (on ubuntu)

**env: node: No such file or directory**

Caused by a broken node, npm installation. Reinstall Node.js with NPM (or when packaged separately, reinstall them both).

**windows OpenSSL errors prevent startup**

Install OpenSSL per: [https://github.com/meteor/meteor/blob/devel/packages/non-core/npm-node-aes-gcm/README.md](https://github.com/meteor/meteor/blob/devel/packages/non-core/npm-node-aes-gcm/README.md)

**windows bower install errors**

We use bower to install some core dependencies. To use Bower on Windows, you must install msysgit. See: [https://github.com/bower/bower/tree/master#windows-users](https://github.com/bower/bower/tree/master#windows-users)
