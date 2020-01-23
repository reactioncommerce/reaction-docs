---
id: version-2.9.1-testing-debugging-server-code
title: How To: Debug Meteor server-side code
original_id: testing-debugging-server-code
---

You can debug Meteor server code using the `--inspect` flag in Chrome DevTools and within integrated developer environments like [Visual Studio Code (VS Code)](https://code.visualstudio.com/), a free code editor, and [WebStorm by JetBrains](https://www.jetbrains.com/webstorm/).

Here are the steps to get started using Reaction in `inspect` mode in any editor:

## Launch the application in `inspect` mode

1. Before we get started, make sure you have at least Reaction 1.6.

You can do that by running:

```sh
reaction -v
```

You should see an output of Reaction's version:

```sh
Node: 8.2.1
NPM: 5.6.0
Meteor Node: 8.9.3
Meteor NPM: 5.5.1
Reaction CLI: 0.24.2
Reaction: 1.6.4
Reaction branch: trunk
Docker: 17.09.0-ce
```

If your Reaction version is older than 1.6, you will have to upgrade to at least 1.6 first.

2. Run `reaction` with the `--inspect` flag:

```sh
reaction --inspect
```

Once this process has started, Node opens a WebSocket to listen for a debugger on port 9229 by default. Once you've successfully attached a debugger, you'll see the Debugger attached message in your Terminal:

```sh
Debugger listening on ws://127.0.0.1:9229/...
```

After that, the application will run, just like running `reaction`.

You'll see the typical Reaction application logging:

```sh
INFO Reaction: Reaction initialization finished.
=> Started your app.

=> App running at: http://localhost:3000/
```

Now, you're ready to debug!

## Inspecting with Chrome DevTools

1. Open Google Chrome and visit `chrome://inspect`.

![DevTools setup](https://blog.reactioncommerce.com/content/images/2017/11/devtools-setup.png)

2. Click **Open dedicated DevTools for Node**.
3. There are two main ways to set up breakpoints: in the DevTools or in the code.

- To set up a breakpoint in DevTools, open up the **Source** tab and navigate to a file you would like to debug in the left-side bar. Click on the line number where you'd like the code to stop executing. You can set up as many breakpoints as you'd like.
- To set up a breakpoint in your code, add the keyword `debugger` right before you'd like the application to pause execution.

Remember: Since you are currently debugging the Reaction server, you'll only have access to code that runs on the server - not the client.

4. Now open `http://localhost:3000` as you normally would and the code should stop executing at your first breakpoint.

In this example, the code stopped executing at a breakpoint in the Products publication, which gets called whenever a client connects to the product grid on the index route:

![DevTools setup](https://blog.reactioncommerce.com/content/images/2017/11/devtools-variables.png)

5. At this breakpoint, you can access the Console by hitting <kbd>esc</kbd> and opening the _Drawer_.

![DevTools setup](/assets/devtools-setup.gif "Open the drawer in console")

Now you can watch variables, check the call stack and investigate scope to better debug while you develop.

To learn more about Chrome DevTools, check out Google's [Tools for Web Developers](https://developers.google.com/web/tools/chrome-devtools/javascript/).

## Inspecting in VS Code

_Note:_ You can only have one debugger connected at a time, so if you've already connected to DevTools, then you'll need to disconnect before you can connect with VS Code.

Setting up [VS Code](https://code.visualstudio.com/) and connecting it to the Node debugger is only slightly more complicated than using DevTools. But once it's set up, it can easily become a part of your regular workflow.

1. In the root of your project directory, add a `.vscode/launch.json` file.

![DevTools setup](https://blog.reactioncommerce.com/content/images/2017/11/vscode-launch.png)

2. Set up your file:

**.vscode/launch.json**

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

3. Open the debug panel and click the **Play** icon

![DevTools setup](https://blog.reactioncommerce.com/content/images/2017/11/vscode-devtools.png)

Now you can debug without even leaving your code editor.

To learn more about debugging JavaScript with VS Code, check out [VS Code's debugging guide](https://code.visualstudio.com/docs/nodejs/nodejs-debugging).

## Inspecting in Webstorm

1. Create a new [Run/Debug configuration](https://www.jetbrains.com/help/webstorm/run-debug-configuration-javascript-debug.html) based on the Meteor default.

Use the following settings:

- Meteor executable: `/usr/local/bin/meteor`
- Program arguments: `--settings settings/dev.settings.json --raw-logs`
- Working directory: `/YourMachine/code/reaction`
- Environmental variables: `REACTION_EMAIL=youremail@gmail.com;REACTION_AUTH=...`

![Webstorm setup](https://user-images.githubusercontent.com/72819/34857305-fb058c44-f784-11e7-9739-c34f09c11bd0.png)

2. Select your breakpoints by clicking along the left-hand side line numbers.
3. Click on the **Debug** icon to start you Reaction app in debugger mode.
4. Use the **Step In**, **Step Out**, **Steop Over** buttons to navigate through the code.

For more on debugging with Webstorm, check out the [Jetbrains guide](https://www.jetbrains.com/help/webstorm/debugging-javascript-in-chrome.html).
