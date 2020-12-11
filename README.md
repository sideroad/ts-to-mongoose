# This is the repository which I regret to develop...

## What I did...
1. Find module which is resolve my issue.
2. Could not found the module
3. Developed this module
4. Considering name to publish
5. The name is already used.
6. The conflicted name module is what I want...

Recommend to use [ts-mongoose](https://www.npmjs.com/package/ts-mongoose) instead.

# How to use anyway?

```
npm i --save-dev ts-to-mongoose

# -s --source: typescript file for mongoose schema definitions. You can specify glob pattern.
# -d --dist: directory to output mongoose schema definitions.
npx ts-to-mongoose -s ${path_to_ts_file_source} -d ${dist_dir_path}
```

