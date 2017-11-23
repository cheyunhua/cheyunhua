<template>
  <div>
    <header class="fx-header">
      <div class="fx-header-top fx-orange">
        <i class="glyphicon glyphicon-menu-left fx-ico-left" v-on:click="goBack"></i>待办事项
      </div>
    </header>

    <div class="my-content">
      <div :name="item.id" class="item-todo" :id="item.id" v-for="item in list" @click="goConfirmHandover">
        <div class="todo-left">
          <div class="todo-title">
            <div class="todo-icon"></div><div class="todo-title-item">{{item.title}}</div>
          </div>
          <div class="todo-state">{{item.state}}</div>
          <div class="todo-content">{{item.content}}</div>
        </div>
        <div class="todo-right"><i class="fa fa-angle-right my-gray" style="font-size: 2em;margin-top: 0.855em;"></i></div>
      </div>
    </div>

  </div>
</template>
<style>

  .my-content{
    padding-top: 0em;
  }
  .item-todo {
    float: left;
    height: auto;
    width: 100%;
    margin-top: 0.5em;
    background-color: #ffffff;
    border-top: 0.1em solid #E3E3E3;
    border-bottom: 0.1em solid #E3E3E3;

  }
  .todo-title {
    font-size: 1.2em;
    color: #595959;
    height: auto;
    width: 100%;
    float: left;
  }
  .todo-title-item {
    float: left;
    height: auto;
    width: 90%;
    font-size: 0.8em;
    padding-left: 0.5em;
    padding-top: 0.6em;
    overflow:hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .todo-icon {
    float: left;
    width: 0.5em;
    height: 2em;
    background-color: #FF7043;
  }
  .todo-state {
    padding: 0.2em .5em .1em 2em;
    font-size: 0.95em;
    color: #FF7043;
    overflow:hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .todo-content {
    padding: .6em .5em 1em 2.4em;
    font-size: 0.8em;
    color: #999999;
    overflow:hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .todo-left {
    float:left;
    width: 90%;
    height:auto;

  }
  .todo-right {
    float: left;
    width: 10%;
    height:auto;

  }

</style>
<script>
  export default {
    data() {
      return {
        list: [
          {
            id: '111',
            title: '一般纳税人代理记账（内资）22222222222222222222222',
            state: '201705—单据交接确认',
            content: '以下为VIP客户经理从贵公司接收的单据清单，请确认。'
          },
          {
            id: '222',
            title: '小规模纳税人代理记账（内资）',
            state: '201705—税费报表确认',
            content: '税费报表已生成，请查看确认。'
          }
        ]
      }
    },
    methods:{
      goBack: function () {
        window.history.go(-1);
      },
      goConfirmHandover: function () {
        this.$router.push('/confirmHandover');
      }
    },
    computed:{

    }
  }
</script>

