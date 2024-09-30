// import glsl from 'vite-plugin-glsl'
// import { defineConfig } from 'vite'
// import path from 'path'

// const dirname = path.resolve()

// export default defineConfig({
//     resolve:
//     {
//         alias:
//         {
//             '@' : path.resolve(dirname, './sources/Game')
//         }
//     },
//     plugins:
//     [
//         glsl({ watch: true })
//     ],
//     server:
//     {
//         host: true,
//         open: true
//     }
// })

// import glsl from 'vite-plugin-glsl'
// import { defineConfig } from 'vite'
// import path from 'path'

// const dirname = path.resolve()

// export default defineConfig({
//     resolve:
//     {
//         alias:
//         {
//             '@sources' : path.resolve(dirname, './sources/Game')
//         }
//     },
//     plugins:
//     [
//         glsl({ watch: true })
//     ],
//     server:
//     {
//         host: true,
//         open: true
//     }
// })

import glsl from 'vite-plugin-glsl';
import { defineConfig } from 'vite';
import path from 'path';

const dirname = path.resolve();

export default defineConfig({
    resolve: {
        alias: {
            '@sources': path.resolve(dirname, './sources/Game') // Map '@sources' to 'sources' directory
        }
    },
    plugins: [
        glsl({ watch: true })
    ],
    server: {
        host: true,
        open: true
    }
});
