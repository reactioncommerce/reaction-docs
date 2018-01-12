# Tutorial: Debugging server-side code

As of Meteor 1.6, you can now debug server code using the `--inspect` flag in Chrome DevTools and within code editors like [Visual Studio Code (VS Code)](https://code.visualstudio.com/), a free code editor. Here are the steps to get started:

## Launch the application in `inspect` mode

1. Before we get started, make sure you have at least Reaction 1.6. You can do that by running:

```sh
reaction -v
```

You should see something like:
```sh
Node: 8.2.1
NPM: 5.6.0
Meteor Node: 8.9.3
Meteor NPM: 5.5.1
Reaction CLI: 0.24.2
Reaction: 1.6.4
Reaction branch: master
Docker: 17.09.0-ce
```

If your Reaction version is older than 1.6, you will have to upgrade to at least 1.6 first.

2. Instead of using `reaction` to run the application, use the inspector mode:

```sh
meteor run --inspect
```

Once this process has started, Node opens a WebSocket to listen for a debugger on port 9229 by default. Once you've successfully attached a debugger, you'll see the Debugger attached message in your Terminal:

```sh
(STDERR) Debugger listening on ws://127.0.0.1:9229/...
```

After that, the application will run, just like running `reaction`. You'll see the typical Reaction application logs:

```sh
INFO Reaction: Reaction initialization finished.
=> Started your app.

=> App running at: http://localhost:3000/
```

Now, you're ready to debug!

## Inspecting with Chrome DevTools

1. Open Google Chrome and visit `chrome://inspect`

![DevTools setup](https://blog.reactioncommerce.com/content/images/2017/11/devtools-setup.png)

2. Click `Open dedicated DevTools for Node`

3. There are two main ways to set up breakpoints: in the DevTools, or in the code.

- To set up a breakpoint in DevTools, open up the Source tab and navigate to a file you would like to debug. Click on the line number where you'd like the code to stop executing. You can set up as many breakpoints as you'd like.

- To set up a breakpoint in your code, add the word `debugger` right before you'd like the application to pause execution.

Since you are currently debugging the Reaction server, you'll only have access to code that runs on the server - not the client.

4. Now open `localhost:3000` as you normally would, and the code should stop executing at your first breakpoint.

In this example, the code stopped executing at a breakpoint in the Products publication, which gets called whenever a client connects to the product grid on the index route:

![DevTools setup](https://blog.reactioncommerce.com/content/images/2017/11/devtools-variables.png)

5. At this breakpoint, you can access the Console by hitting `esc` and opening the Drawer.

![DevTools setup](http://g.recordit.co/1hRutFIaLe.gif)

Now you can watch variables, check the call stack and investigate scope to better debug while you develop.

To learn more about Chrome DevTools, check out Google's [Tools for Web Developers](https://developers.google.com/web/tools/chrome-devtools/javascript/).

## Inspecting in VSCode

_Note:_ You can only have one debugger connected at a time, so if you've already connected to DevTools, then you'll need to disconnect before you can connect with VS Code.

Setting up [VS Code](https://code.visualstudio.com/) and connecting it to the Node debugger is only slightly more complicated than using DevTools. But once it's set up, it can easily become a part of your regular workflow.

1. In the root of your project directory, add a `.vscode/launch.json` file.

![DevTools setup](https://blog.reactioncommerce.com/content/images/2017/11/vscode-launch.png)

2. Set up your file:

*.vscode/launch.json*
```js
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Reaction Server",
            "cwd": "${workspaceRoot}/",
            "runtimeExecutable": "${workspaceRoot}/.meteor/local/dev_bundle/bin/npm",
            "restart": true,
            "timeout": 30000,
            "stopOnEntry": false,
            "sourceMaps": true,
            "protocol": "inspector",
            "port": 9229
        }
    ]
}
```
This borrows heavily from a Meteor forum post on [Meteor 1.6 server debugging with VS Code](https://forums.meteor.com/t/meteor-1-6-server-debugging-with-vs-code/39821).

**Tip:** Port 9229 is the default Node inspector port, but if you switch to another one, eg. `--inspect=5000`, then you'll need to adjust the port in your `launch.json` file.

3. Open the debug panel and click the *Play* icon

![DevTools setup](https://blog.reactioncommerce.com/content/images/2017/11/vscode-devtools.png)

Now you can debug without even leaving your code editor.
