import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';

let baseFolder =
    process.env.APPDATA !== undefined && process.env.APPDATA !== ''
        ? `${process.env.APPDATA}/ASP.NET/https`
        : `${process.env.HOME}/.aspnet/https`;

if (process.env.PROD) {
    baseFolder = '/https';
}

 const certificateArg = process.argv.map(arg => arg.match(/--name=(?<value>.+)/i)).filter(Boolean)[0];
 const certificateName = certificateArg ? certificateArg.groups.value : "lwm.client";

 if (!certificateName) {
     console.error('Invalid certificate name. Run this script in the context of an npm/yarn script or pass --name=<<app>> explicitly.')
     process.exit(-1);
 }

 const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
 const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

 if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
     const result = child_process.spawnSync('dotnet', [
         'dev-certs',
         'https',
         '--export-path',
         certFilePath,
         '--format',
         'Pem',
         '--no-password',
     ], {shell:true, encoding:'utf-8'});
     console.log(result);
 }

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [plugin()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        proxy: {
            '/api': {
                target: 'https://localhost:7120/',
                secure: false,
                rewrite: path => path.replace(/^\/api/, ''),
                changeOrigin: true
            }
        },
        port: 8081,
        https: {
            key: fs.readFileSync(keyFilePath),
            cert: fs.readFileSync(certFilePath),
        }
    }
})
