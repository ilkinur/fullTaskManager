export default function guest ({ next, store }){
    if(store.getters.is_login){
        return next({
           name: 'dashboard'
        })
    }
   
    return next()
   }