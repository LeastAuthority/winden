# Deployment and Release process

Document current manual deployment and release steps for Winden.app

## Prerequisite

- Changes are merged into the main branch;
- Changes are deployed and tested in stage env. (stage.winden.app);
- All E2E tests pass (in CI or at least locally);
- Changes in dependent services are already deployed (like mailbox, transit-relay, feedback-api);
- Submodules are updated (optional, if needed for change);

## Steps:

1. Push changes to add a new version to client/package.json: "version": "0.X.X-beta"
   *Note*: This is visible in the Web page title
2. Create a tag on the main branch: `git tag -a 0.x.x-beta` and push `git push origin 0.x.x-beta`;
3. Go to the [GitHub Release page](https://github.com/LeastAuthority/winden/releases) and click *Draft a new release*
4. Choose the tag and add a description of a release. You can generate release notes, comparing from the last tag.
5. Go to the [GitHub Actions page](https://github.com/LeastAuthority/winden/actions/workflows/deploy.yml) and select Deployment workflow;
6. Click on `Run workflow` (right side) and choose Tag or Main branch, then select Deployment target environment `prod` and click *Run workflow*;
7. Wait and check if the workflow was successfully executed;
8. Check if the new tag is visible in (winden.app)[https://winden.app] webpage;
9. Check if new changes are visible;
10. Run basic tests scenarios: Send file, Receive file;
Notify the team in the group channel about the release;