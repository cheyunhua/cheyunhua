<template>
  <div>
    <map-head></map-head>
    <map-body></map-body>
  </div>
</template>

<script type="es6">
  import mapHead from './map_head'
  import mapBody from './map_body'

  export default {
    name:'address',
    components: {
      mapHead, mapBody
    }
  };
</script>
