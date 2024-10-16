export default function auth ({ next, store }){
    if(!store.getters.is_login){
        return next({
           name: 'login'
        })
    }
   
    return next()
   }