<template>

    <div class="fxapp" vue-jprefix="{toPageMethod:toPage,toBackMethod:back}">
        <slot>default</slot>

    </div>

</template>

<script>
export default {
  data() {
      return {

      }
  },
  created() {

  },

  mounted(){

     let _innerPages = {}
     let _currentPageId = null
     let pCount = 0
     document.querySelectorAll(".fxapp .vuePage").forEach((p,ix)=>{
         pCount = pCount+1
         let _id  = p.id
         if(!_id){
           _id = "page"+pCount
         }

         _innerPages[_id] = p
         if(p.classList.contains('currentVuePage')){
           _currentPageId = _id
         }

         let tabs = p.querySelector('.tabs')
         if(tabs){
           _innerPages[_id]["tabs"] = tabs.children
           _innerPages[_id]["tabs_links"] = p.querySelectorAll('.tab-link')
         }


     })
     this.innerPages = _innerPages
     if(!_currentPageId){
       Toast('请设置currentPage')
     }
     else{
       this.toPage(_currentPageId)
     }

/*      let tabs = document.querySelector('.tabs').children
     p.addEventListener('click', function ($event) {
         $event.preventDefault()
         $event.stopPropagation()
         let currentTabId = href.value
         if(currentTabId.indexOf('#')>-1){
           currentTabId = currentTabId.slice(1)
         }
         let tab = p.parentElement.parentElement.querySelector('currentTabId')
         debugger
         console.log(tab)

     });*/

   },
   methods: {
     back(){
       this.$router.go(-1)
       //this.toPage(this.backPageId,true)
     },
     toPage(id){
       if(id.indexOf('#')>-1){
         id = id.slice(1)
       }
       this.currentPageId = id
       Object.keys(this.innerPages).forEach((p,ix)=>{
           if(p===id){
             this.innerPages[id].style.display="block"
           }
           else{
               this.innerPages[p].style.display="none"
           }
       })
     },
   }
}
</script>

<style scoped>
  form .fade-enter-active, .fade-leave-active {  transition: opacity 1.5s }
  form .fade-enter, .fade-leave-to{ opacity: 0 }
  form .error { color:red; font-size: 0.9rem; }
</style>
