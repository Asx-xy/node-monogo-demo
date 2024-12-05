const Koa = require('koa')
const Router = require('koa-router')
const { koaBody } = require('koa-body');
const Mongo = require('./mongoDB')
const { exec } = require('node:child_process')


const app = new Koa()
const router = new Router() 
const mongo = Mongo

router.post('/logs', async ( ctx ) => {
  console.log(ctx.request.body)
  await mongo.insert('logs', ctx.request.body) 
  ctx.body = {
    code: 200,
    msg: 'success'
  } 
})

router.get('/logs', async ( ctx ) => {
  const name = ctx.query.name
  const dataArr = await mongo.find('logs', name ? {name} : {})
  ctx.body = {
    code: 200,
    body: dataArr
  }
})

router.get('/reboot', ctx => {
  let command = exec('shutdown -r -t 60', function(err, stdout, stderr) {
    if(err || stderr) {
      console.log("reboot failed" + err + stderr);
    }
  });
  command.stdin.end();
  command.on('close', function(code) {
    console.log("reboot", code);
  });
})

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.body = {
      code: 500,
      msg: err
    }
  }
})

app.use(koaBody({ 
  multipart:true,
}))
app
  .use(router.routes())
  .use(router.allowedMethods());

app.use( async ( ctx ) => {
  ctx.body = 'hello koa2'
})

app.listen(3000)
console.log('[demo] start-quick is starting at port 3000')