---
id: version-v1.7.0-reporting-vulnerabilities
title: Report Vulnerabilities
original_id: reporting-vulnerabilities
---

While Reaction uses automated tools to detect and report vulnerabilities, we also rely on your reporting and patches of discovered vulnerabilities.

If you believe you have discovered a vulnerablity or a compliance issue that has not yet been publicly patched, and you wish to privately address the vulnerability, you can provide vulnerability and patch details through our `security@reactioncommerce.com` email group.

## Submitting

Send an email to `security@reactioncommerce.com` providing

- Vulnerability details
- include output of `reaction -v`
- Links to source
- Steps to replicate
- Any known impact/threat level
- Patch files

We will review and merge security patch files into our next release.

You can submit a patch file created with [git format-patch](https://git-scm.com/docs/git-format-patch).

Example of creating a patch.

```sh
git format-patch trunk --stdout > new-hotfix.patch
```

Attach the patch file in an email to `security@reactioncommerce.com`.
