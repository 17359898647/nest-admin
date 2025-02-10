import { controllerTem } from './nestjs/controller.js'
import { dtoTem } from './nestjs/dto.js'
import { entityTem } from './nestjs/entity.js'
import { moduleTem } from './nestjs/module.js'
import { serviceTem } from './nestjs/service.js'
import { apiTempalte } from './vue/api.js.js'
import { dialogVue } from './vue/dialogVue.vue.js'
import { indexVue } from './vue/indexVue.vue.js'

const templates = {
  'tool/template/nestjs/entity.ts.vm': entityTem,
  'tool/template/nestjs/dto.ts.vm': dtoTem,
  'tool/template/nestjs/controller.ts.vm': controllerTem,
  'tool/template/nestjs/service.ts.vm': serviceTem,
  'tool/template/nestjs/module.ts.vm': moduleTem,
  'tool/template/vue/api.js.vm': apiTempalte,
  'tool/template/vue/indexVue.vue.vm': indexVue,
  'tool/template/vue/dialogVue.vue.vm': dialogVue,
}

export function index(options) {
  const result = {}
  for (const [path, templateFunc] of Object.entries(templates)) {
    result[path] = templateFunc(options)
  }
  return result
}
