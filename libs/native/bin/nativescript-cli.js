#!/usr/bin/env node
"use strict";

const fs = require('fs');
const path = require('path');

require('nativescript/lib/nativescript-cli-lib');
const builder = $injector.resolve('nodeModulesDependenciesBuilder');

class Builder {
  getProductionDependencies(root) {
    const deps = [];
    const json = JSON.parse(fs.readFileSync(path.join(root, 'package.json')));
    const loot = Object.assign({ }, json.dependencies, json.devDependencies);
    const mods = path.join(root, 'node_modules');

    const queue = Object.keys(loot).map((key) => ({
      depth: 0,
      name: key,
      parent: null,
      parentDir: root
    }));

    while (queue.length) {
      const dep = queue.shift();
      const mod = builder.findModule(mods, dep, deps);

      if (mod && !deps.some((done) => done.directory === mod.directory)) {
        mod.dependencies.forEach((deep) => {
          if (!queue.some((q) =>
            q.depth === mod.depth + 1 &&
            q.name === deep &&
            q.parent === dep &&
            q.parentDir === mod.directory
          )) queue.push({
            depth: mod.depth + 1,
            name: deep,
            parent: dep,
            parentDir: mod.directory
          });
        });

        deps.push(mod);
      }
    }

    return deps;
  }
}

delete $injector.modules.nodeModulesDependenciesBuilder;
$injector.register('nodeModulesDependenciesBuilder', Builder);
require('nativescript/lib/nativescript-cli');
