const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants')

// This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration
module.exports = (phase) => {

  // 現状使用しているのはisDevとisProdです

  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environment variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  // when `next build` or `npm run build` is used
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
  // when `next build` or `npm run build` is used
  const isStaging =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'

  console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`)

  const env = {

    RESTURL_PRODUCTLIST: (() => {
      if (isDev) return 'http://localhost:3002/product'
      if (isProd|isStaging) {
        return 'https://t67jfjuy69.execute-api.ap-northeast-1.amazonaws.com/default/ProductList'
      }
      return ''
    })(),

    RESTURL_SEARCHPAGEURL: (() => {
      if (isDev) return 'http://localhost:3002/product/pageUrlSearch/'
      if (isProd|isStaging) {
        return 'https://t67jfjuy69.execute-api.ap-northeast-1.amazonaws.com/default/ProductList/'
      }
      return ''
    })(),

    /*RESTURL_PRODUCTLIST: (() => {
      if (isDev) return 'http://localhost:3002/product'
      if (isProd|isStaging) {
        return 'https://n5ag6dazwo5x3h3op6ynacgxda0swgdj.lambda-url.ap-northeast-1.on.aws/'
      }
      return ''
    })(),*/
    
    /*
    サンプル

    参考にしたサイト
    https://nextjs.org/docs/api-reference/next.config.js/environment-variables
    https://github.com/vercel/next.js/blob/canary/examples/with-env-from-next-config-js/next.config.js

    RESTURL_SPEAKERS: (() => {
      if (isDev) return 'http://localhost:4000/speakers'
      if (isProd) {
        return 'https://www.siliconvalley-codecamp.com/rest/speakers/ps'
      }
      if (isStaging) return 'http://localhost:11639'
      return 'RESTURL_SPEAKERS:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })(),
    RESTURL_SESSIONS: (() => {
      if (isDev) return 'http://localhost:4000/sessions'
      if (isProd) return 'https://www.siliconvalley-codecamp.com/rest/sessions'
      if (isStaging) return 'http://localhost:11639'
      return 'RESTURL_SESSIONS:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })(),
    */
  }

  // next.config.js object
  return {
    env,
  }
}