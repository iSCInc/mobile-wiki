## changelog-view.sh
Generate changelog between two commits/branches/tags and displays result in console:

* `./tasks/changelog-view.sh`

Parameters (optional):
* `-f FROM` - (default: second to last release tag) set begin range
* `-t TO` - (default: last release tag) set end range

NOTE:
* As FROM and TO put remote/branch, commit_sha or tag, i.e. origin/dev, ed84ba5 or release-40.001

## optimize-svg.sh
This script iterates through all SVG files in predefined directories and optimizes them.
Use of `npm run svgo` is recommended to run this script, but you can also invoke it directly: `./tasks/optimize-svg.sh`.

Currently iterated directories:
* `./app/symbols`

If you've added SVGs in different directory please update the script and this README file.
