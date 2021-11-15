import path from 'path'
import ts from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

const resolvePath = _path => path.resolve(__dirname, _path)

const extensions = ['.ts']

// ts
const tsPlugin = ts({
  tsconfig: resolvePath('../tsconfig.json'), // 导入本地ts配置
  extensions
})

// 基础配置
const commonConfig = {
  input: resolvePath('../src/index.ts'),
  plugins: [
    resolve(extensions),
    commonjs(),
    tsPlugin
  ]
}

// 需要导出的模块类型
const output = [
  {
    file: 'dist/index.js',
    format: 'es',
    globals: {
      axios: 'axios'
    }
  }
]

// 打包时不引入第三方包
const external = ['axios']

export default {
  ...commonConfig,
  output,
  external
}
