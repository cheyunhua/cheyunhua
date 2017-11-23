<template>
  <div>
    <header class="fx-header">
     <!-- <div class="fx-header-top">
        &lt;!&ndash;<i class="fa fa-angle-left"></i>&ndash;&gt;
        门面地址
        &lt;!&ndash;<b class="fa fa-ellipsis-h"></b>&ndash;&gt;
      </div>-->
      <div class="fx-header-top fx-orange">
        <i v-on:click="goBack" class="fa fa-angle-left"></i>门面地址
      </div>
    </header>

  </div>

</template>

<script type="es6">
  import mapBody from './map_body.vue'
  import mapBottom from './map_bottom.vue'
  export default {
    name: 'map-head',
    methods: {
        goBack: function() {
          window.history.go(-1);
        }
    }
  };
</script>
