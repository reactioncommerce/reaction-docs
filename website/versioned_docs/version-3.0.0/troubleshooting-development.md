---
id: version-3.0.0-troubleshooting-development
title: Troubleshooting issues during development
sidebar_label: Development Troubleshooting
original_id: troubleshooting-development
---

When working in the Reaction codebase as a developer, many issues can arise due to misconfiguration, missing dependencies, operating system differences, and software bugs. Here are some tips for diagnosing and fixing these issues.

## Docker Issues

These are potential issues you might encounter when running Reaction within a local Docker environment using Docker Compose and the docker-compose.yml file.

### Memory errors or errors about "Meteor rawLogs"

Make sure that you are allowing Docker sufficient memory to run. In your Docker preferences, we suggest adjusting the `Memory` setting to allow at least `3.0GiB`, and the `Swap` setting to allow at least `1.5GiB`. If you are running many containers, make these as high as possible as long as it doesn't negatively affect the performance of your computer.

![advanced_and_reaction](https://user-images.githubusercontent.com/4482263/41941033-a31bc834-794f-11e8-8638-934220650730.png)
