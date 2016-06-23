# Logging

Reaction implements the [Bunyan](https://github.com/trentm/node-bunyan) logging library to provide a Stream capable, JSON friendly log handler in Reaction Core.

To configure logging you can modify `isDebug: true` in `settings.json`.  Value can be any true/false or any valid `Bunyan level` in `settings.json` or as an environment variable.

## Debug Log
Setting a level of `debug` or higher will display verbose logs as JSON. The JSON format is also the storage / display format for production.

```js
  isDebug:  "debug" 
```

Feel free to include verbose logging, but follow [Bunyan recommendations on log levels](https://github.com/trentm/node-bunyan#levels) and use appropriate levels for your messages.

The log levels in bunyan are as follows. The level descriptions are best practice opinions.


* "**fatal**" (60): The service/app is going to stop or become unusable now. An operator should definitely look into this soon.
* "**error**" (50): Fatal for a particular request, but the service/app continues servicing other requests. An operator should look at this soon(ish).
* "**warn**" (40): A note on something that should probably be looked at by an operator eventually.
* "**info**" (30): Detail on regular operation.
* "**debug**" (20): Anything else, i.e. too verbose to be included in "info" level.
* "**trace**" (10): Logging from external libraries used by your app or very detailed application logging.


Suggestions: Use "debug" sparingly. Information that will be useful to debug errors post mortem should usually be included in "info" messages if it's generally relevant or else with the corresponding "error" event. Don't rely on spewing mostly irrelevant debug messages all the time and sifting through them when an error occurs.

## Server Log
**Example `server` logger:**

```js
import { Logger } from "/server/api";

Logger.info("Something info, most likely for development", result);
Logger.error("Something error want to investigate", error);
```

## Client Log

**Example `client` logger:**

```js
import { Logger } from "/client/api";

Logger.info("Something info, most likely for development", result);
Logger.error("Something error want to investigate", error);
```

## Custom
To add custom logger output you can create a new logger instance:


```js
import bunyan from "bunyan";

const Logger = bunyan.createLogger({
  name: "core-client"
});

Logger.level(isDebug);

export default Logger;
```
