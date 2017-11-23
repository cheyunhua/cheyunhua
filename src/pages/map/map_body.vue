<template>
  <div class="fx-wrapper" id="allmap" v-bind:style="mapStyle"></div>
</template>

<script type="es6">
  import {Toast} from 'mint-ui';
  import _track from '../../api/track';
  const localStorage = global.localStorage;
  export default{
    data: function () {
      return {
        mapStyle: {
          width: '100%',
          height: this.mapHeight + 'px',
          overflow: 'hidden',
          margin: '0'
        },
        addr: ''
      }
    },
    props: {
      // 地图在该视图上的高度
      mapHeight: {
        type: Number,
        default: 500
      },
      // 经度
      longitude: {
        type: Number,
        default: 116.404
      },
      // 纬度
      latitude: {
        type: Number,
        default: 39.915
      },
      city: {
        type: String,
        default: '北京市'
      }
    },
    created(){
    },
    mounted () {
      this.loadMap();
    },
    watch: {
      '$route': 'loadMap'
    },
    methods: {
      loadMap () {
        this.addr = this.$route.query.address;
        if (this.addr === undefined) {
          return;
        }
        if (this.addr == null) {
          this.addr = '';
        }
        var map = new BMap.Map("allmap");
        var point = new BMap.Point(this.longitude, this.latitude);
        map.centerAndZoom(point, 11);
        map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
        var myGeo = new BMap.Geocoder();
        var tempAddr = this.addr;
        myGeo.getPoint(this.addr, function (point) {
          if (point) {
            map.centerAndZoom(point, 18);
            map.addOverlay(new BMap.Marker(point));
          } else {
            Toast('没有找到' + tempAddr);
          }
        }, this.city);
      }
    }
  }
</script>
