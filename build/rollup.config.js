import path from 'path'
import babel from '@rollup/plugin-babel'
import ts from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'

const resolvePath = _path => path.resolve(__dirname, _path)

const extensions = ['.ts']

const nodeResolvePlugin = resolve(extensions)

// ts
const tsPlugin = ts({
  tsconfig: resolvePath('../tsconfig.json'), // 导入本地ts配置
  extensions
})

const babelPlugin = babel({
  exclude: 'node_modules/**',
  extensions
})

// 基础配置
const commonConfig = {
  input: resolvePath('../src/index.ts'),
  plugins: [
    nodeResolvePlugin,
    commonjs(),
    tsPlugin,
    babelPlugin
  ]
}

// 需要导出的模块类型
const output = [
  {
    file: 'dist/umd/index.js',
    format: 'umd',
    name: 'index',
    globals: {
    }
  },
  {
    file: 'dist/esm/index.js',
    format: 'esm',
    globals: {
    }
  }
]

// 打包时不引入第三方包
const external = []

export default {
  ...commonConfig,
  output,
  external
}
