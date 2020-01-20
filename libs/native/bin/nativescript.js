#!/usr/bin/env node
'use strict';

const fs = require('fs');

require('nativescript/lib/bootstrap');

const builder = $injector.resolve('nodeModulesDependenciesBuilder');
const compiler = $injector.resolve('webpackCompilerService');
const migrator = $injector.resolve('migrateController');

builder.getProductionDependencies = (root) => {
  const deps = [];
  const json = JSON.parse(fs.readFileSync(`${root}/nsconfig.json`));

  const queue = json.sources.map((key) => ({
    depth: 0,
    name: key,
    parent: null,
    parentDir: root
  }));

  while (queue.length) {
    const dep = queue.shift();
    const mod = builder.findModule(`${root}/node_modules`, dep, deps);

    if (mod && !deps.some((done) => done.directory === mod.directory)) {
      mod.dependencies.forEach((deep) => {
        if (!queue.some((q) =>
          q.depth === mod.depth + 1 &&
          q.name === deep &&
          q.parent === dep &&
          q.parentDir === mod.directory
        )) {
          queue.push({
            depth: mod.depth + 1,
            name: deep,
            parent: dep,
            parentDir: mod.directory
          });
        }
      });

      deps.push(mod);
    }
  }

  return deps;
};

compiler.startWebpackProcess = async (platform, proj, prep) => {
  const proc = compiler.$childProcess.spawn(process.execPath, [
    ...(process.arch === 'x64' ? ['--max_old_space_size=4096'] : []),
    '--preserve-symlinks',
    `${proj.projectDir}/node_modules/webpack/bin/webpack.js`,
    `--config=${proj.projectDir}/libs/native/conf/webpack.js`,
    ...(await compiler.buildEnvCommandLineParams(
      compiler.buildEnvData(
        platform.platformNameLowerCase,
        proj,
        prep
      ),
      platform,
      proj,
      prep
    )),
    ...(prep.watch ? ['--watch'] : []),
  ], {
    cwd: proj.projectDir,
    stdio: prep.watch ? ['inherit', 'inherit', 'inherit', 'ipc'] : 'inherit'
  });

  compiler.webpackProcesses[platform.platformNameLowerCase] = proc;
  await compiler.$cleanupService.addKillProcess(proc.pid.toString());
  return proc;
};

migrator.shouldMigrate = async () => {
  return false;
};

require('nativescript/lib/nativescript-cli');
