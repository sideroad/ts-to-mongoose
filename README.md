# This is the repository which I regret to develop...

## What I did...
1. Find module which can be resolved my issue.
2. But I could not found the module.
3. So, I developed the module.
4. Then, Considering name to publish as a library.
5. The name is already used.
6. The conflicted module is what I want to use...

Recommend to use [ts-mongoose](https://www.npmjs.com/package/ts-mongoose) instead.

# What is this module anyway?
The module load typescript file as a source and output mongoose schema definitions.

# How to use this anyway?
```
npm i --save-dev ts-to-mongoose

# -s / --source: typescript file for mongoose schema definitions. You can specify glob pattern.
# -d / --dist: directory to output mongoose schema definitions.
npx ts-to-mongoose -s ${path_to_ts_file_source} -d ${dist_dir_path}
```

# Example
```
npx ts-to-mongoose -s examples/ts/**/*.ts -d examples/schema
```
[source - TypeScript](examples/ts/sample.ts)

[dist - Generated Mongoose Schema](examples/schema/sample.mongoose.ts)

