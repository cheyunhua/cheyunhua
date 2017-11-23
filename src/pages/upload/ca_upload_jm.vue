<template>
  <div class="_upload_backdiv">
    <!-- 预览图片展示 -->
    <el-dialog v-model="dialogVisible" size="full">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <div class="_upload_div">
      <span class="_upload_span">01</span>
      <li class="_upload_li">业务受理单
        <p >打印件1份,加盖公章
          <span  style="color: red;margin-left: 1em   ; display: inline-block;" v-on:click="dataState('1')">{{dataState1}}</span></p>
      </li>
      <br><br>
      <el-button type="danger" icon="delete" size="mini" style="margin-left: 2.6em;margin-bottom: 0.3em;" v-if="fileList_1.length>0" v-on:click="clearAll('1',fileList_1)">删除</el-button>
      <el-button type="warning" icon="search" size="mini" :style="fileList_1.length>0?'margin-left:-0.3em;margin-bottom: 0.3em;':'margin-left: 2.6em;margin-bottom: 0.3em;'"  v-on:click="queryCaFile({'qrCodeId':qrCodeId,'type':1},fileList_1);">刷新</el-button>
      <i class="el-icon-loading" v-if='loading1'></i>
      <div style="margin-left: 2em;" >
        <el-upload
          :action='actionUrl'
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
          :file-list="fileList_1"
          :show-file-list ="true"
          :data="dataParm_1"
          :multiple="false"
          :disabled="loading1"
        >
          <div style="line-height: 6em;">
            <i class="el-icon-plus"></i>
          </div>
        </el-upload>
      </div>
    </div>

    <div class="_upload_div">
      <span class="_upload_span">02</span>
      <li class="_upload_li">电子认证服务协议书
        <p >打印件1份，加盖公章<span  style="color: red;margin-left: 1em" v-on:click="dataState('2')">{{dataState2}}</span></p>
      </li>
      <br><br>
      <el-button type="danger" icon="delete" size="mini" style="margin-left: 2.6em;margin-bottom: 0.3em;" v-if="fileList_2.length>0" v-on:click="clearAll('2',fileList_2)">删除</el-button>
      <el-button type="warning" icon="search" size="mini" :style="fileList_2.length>0?'margin-left:-0.3em;margin-bottom: 0.3em;':'margin-left: 2.6em;margin-bottom: 0.3em;'"  v-on:click="queryCaFile({'qrCodeId':qrCodeId,'type':2},fileList_2);">刷新</el-button>
      <i class="el-icon-loading" v-if='loading2'></i>
      <div style="margin-left: 2em"  >
        <el-upload
          :action='actionUrl'
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
          :file-list="fileList_2"
          :show-file-list ="true"
          :data="dataParm_2"
          :multiple="false"
          :disabled="loading2"
        >
          <div style="line-height: 6em;">
            <i class="el-icon-plus"></i>
          </div>
        </el-upload>
      </div>
    </div>

    <div class="_upload_div">
      <span class="_upload_span">03</span>
      <li class="_upload_li">经办人或法人身份证（正反面）
        <p >复印件1份，加盖公章<span  style="color: red;margin-left: 1em" v-on:click="dataState('3')">{{dataState3}}</span></p>
      </li>
      <br><br>
      <el-button type="danger" icon="delete" size="mini" style="margin-left: 2.6em;margin-bottom: 0.3em;" v-if="fileList_3.length>0" v-on:click="clearAll('3',fileList_3)">删除</el-button>
      <el-button type="warning" icon="search" size="mini" :style="fileList_3.length>0?'margin-left:-0.3em;margin-bottom: 0.3em;':'margin-left: 2.6em;margin-bottom: 0.3em;'"  v-on:click="queryCaFile({'qrCodeId':qrCodeId,'type':3},fileList_3);">刷新</el-button>
      <i class="el-icon-loading" v-if='loading3'></i>
      <div style="margin-left: 2em" >
        <el-upload
          :action='actionUrl'
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
          :file-list="fileList_3"
          :show-file-list ="true"
          :data="dataParm_3"
          :multiple="false"
          :disabled="loading3"
        >
          <div style="line-height: 6em;">
            <i class="el-icon-plus"></i>
          </div>
        </el-upload>
      </div>
    </div>

  </div>

</template>

<script>
  import api from '../../api/';
  import ElementUI from 'element-ui'
  import { Toast,Indicator ,MessageBox } from 'mint-ui'

  export default{
    data(){
      return {
        qrCodeId: '',//二维码id
        noDataText: '请上传资料',
        //图片预览地址
        dialogImageUrl: '',
        //图片预览默认隐藏
        dialogVisible: false,
        actionUrl: '/thirdparty/ocsp/wechatCaFileService/uploadCaFile',
//            actionUrl: api.uploadCaFileUrl(),
        //附件1 --------------
        fileList_1: [],
        dataParm_1: {'type':'1', 'qrCodeId':null, 'sort': ''},//业务受理单
        dataState1: '',//材料审核状态
        dataStateReason1: '',//材料审核状态原因
        loading1:true,//数据加载中
        //----------------------
        //附件2 --------------
        fileList_2: [],
        dataParm_2: {'type':'2', 'qrCodeId':null, 'sort':''},//电子认证服务协议书
        dataState2: '',//材料审核状态
        dataStateReason2: '',//材料审核状态原因
        loading2:true,//数据加载中
        //----------------------
        //附件3 --------------
        fileList_3: [],
        dataParm_3: {'type':'3', 'qrCodeId':null, 'sort':''},//经办人身份证（正反面）
        dataState3: '',//材料审核状态
        dataStateReason3: '',//材料审核状态原因
        loading3:true,//数据加载中
        //----------------------
        //附件4 --------------
        fileList_4: [],
        dataParm_4: {'type':'4', 'qrCodeId':null, 'sort':''},//组织机构代码证或工商营业执照副本
        dataState4: '',//材料审核状态
        dataStateReason4: '',//材料审核状态原因
        loading4:true,//数据加载中
        //----------------------
      }
    },
    mounted(){

      //js判断Android和iOS
      /*        var u = navigator.userAgent;
       if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
       console.log('安卓');
       } else if (u.indexOf('iPhone') > -1) {
       console.log('IOS');
       } else if (u.indexOf('Windows Phone') > -1) {
       console.log('Windows Phone');
       }*/

//          this.qrCodeId = this.$route.query.qrCodeId != undefined ? this.$route.query.qrCodeId : '';
//        this.qrCodeId = this.$route.query.qrCodeId != undefined ? this.$route.query.qrCodeId : '3814506566';
      this.qrCodeId = this.$route.query.qrCodeId != undefined ? this.$route.query.qrCodeId : '3810676631';
      //初始化参数
      this.initParamData();
      this.queryFiles();
    },
    methods: {
      handleRemove(file, fileList){
        MessageBox.confirm('要删除此资料吗?').then(action => {
          var params = {};
          params.qrCodeId = this.qrCodeId;
          params.type = file.type;
          params.sort = file.xh;
          api.deleteCaFile(params).then((response) => {
            if (response.data.head.errorCode == '0') {
              this.$message.success('删除成功！');
              switch(file.type){
                case 1:
                  this.fileList_1 = fileList;
                  break;
                case 2:
                  this.fileList_2 = fileList;
                  break;
                case 3:
                  this.fileList_3 = fileList;
                  break;
                case 4:
                  this.fileList_4 = fileList;
                  break;
              }
            }
          }).catch((response) => {
            this.$message.error('哎呀！网络出了点问题，请稍后重试！');
          });
        }).catch((response) => {
          let opationCount = 0;
          for(let i=0;i<fileList.length;i++){
            var sort = fileList[i].xh
            if (Number(file.xh) > Number(sort)) {
              fileList.splice(i,0,file);
              opationCount++;
              break;
            }
          }
          if(opationCount==0){
            fileList.push(file);
          }
        });
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      beforeUpload(file) {
        //判断扫描id
        let isQrCodeId = false;
        if(this.qrCodeId){
          isQrCodeId = true;
        }else{
          this.$message.error('扫描QrCode为空！');
        }

        //判断图片大小和图片格式
        let isImg = false ;
        if(file.type === 'image/jpeg'){
          isImg = true;
        }
        if(file.type === 'image/png'){
          isImg = true;
        }
        if(file.type === 'image/bmp'){
          isImg = true;
        }
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isImg) {
          this.$message.error('上传CA资料只能是 JPG、PNG、BMP格式!');
        }
        if (!isLt5M) {
          this.$message.error('上传CA资料大小不能超过 5MB!');
        }
        return isImg && isLt5M && isQrCodeId;
      },
      uploadMethod(){

      },
      handleSuccess(response, file, fileList){
        if(response.head.errorCode === '0'){
          switch(response.body.type){
            case "1":
              file.xh =response.body.sort;
              file.type =1;
              this.fileList_1 = fileList;
              break;
            case "2":
              file.xh =response.body.sort;
              file.type =2;
              this.fileList_2 = fileList;
              break;
            case "3":
              file.xh =response.body.sort;
              file.type =3;
              this.fileList_3 = fileList;
              break;
            case "4":
              file.xh =response.body.sort;
              file.type =4;
              this.fileList_4 = fileList;
              break;
          }
          this.$message.success(response.head.errorMsg);
        }else{
          fileList.pop();
          console.info(response);
          this.$message.error(response.head.errorMsg);
        }
      },
      initParamData(){
        //二维码id
        this.dataParm_1.qrCodeId = this.qrCodeId;
        this.dataParm_2.qrCodeId = this.qrCodeId;
        this.dataParm_3.qrCodeId = this.qrCodeId;
        this.dataParm_4.qrCodeId = this.qrCodeId;
        //初始化图片排序
        this.dataParm_1.sort = this.fileList_1.length;
        this.dataParm_2.sort = this.fileList_2.length;
        this.dataParm_3.sort = this.fileList_3.length;
        this.dataParm_4.sort = this.fileList_4.length;
      },
      queryFiles(){
        let params1 = {};
        params1.qrCodeId = this.qrCodeId;
        params1.type = 1
        let params2 = {};
        params2.qrCodeId = this.qrCodeId;
        params2.type = 2
        let params3 = {};
        params3.qrCodeId = this.qrCodeId;
        params3.type = 3
        let params4 = {};
        params4.qrCodeId = this.qrCodeId;
        params4.type = 4
        this.queryCaFile(params1,this.fileList_1);
        this.queryCaFile(params3,this.fileList_2);
        this.queryCaFile(params2,this.fileList_3);
      },
      clearAll(type,fileList){
        MessageBox.confirm('要删除此资料吗?').then(action => {
          var params = {};
          params.type = type;
          params.qrCodeId = this.qrCodeId;
          api.deleteCaFile(params).then((response) => {
            if (response.data.head.errorCode == '0') {
              fileList.splice(0,fileList.length)
              this.$message.success('删除成功！');
            }
          }).catch((response) => {
            this.$message.error('哎呀！网络出了点问题，请稍后重试！');
          });
        }).catch((response)=>{

        })
      },
      dataState(type){
        switch(type){
          case "1":
            if(this.dataStateReason1){
              this.$message.warning(this.dataStateReason1);
            }
            break;
          case "2":
            if(this.dataStateReason2){
              this.$message.warning(this.dataStateReason2);
            }
            break;
          case "3":
            if(this.dataStateReason3){
              this.$message.warning(this.dataStateReason3);
            }
            break;
          case "4":
            if(this.dataStateReason4){
              this.$message.warning(this.dataStateReason4);
            }
            break;
        }
      },
      queryCaFile(params,fileList){
        fileList.splice(0,fileList.length);
        switch(params.type){
          case 1:
            this.loading1 = true;
            break;
          case 2:
            this.loading2 = true;
            break;
          case 3:
            this.loading3 = true;
            break;
          case 4:
            this.loading4 = true;
            break;
        }
        api.queryCaFile(params).then((response) => {
          if (response.data.head.errorCode == '0') {
//                var resultData = response.data.data;
            var resultData = response.data.body;
            switch (params.type){
              case 1:
                var examineResult = resultData.examineResult;
                var files = resultData.fileRespData.files;
                //未上传资料判断
                if(!examineResult&&files&&files.length<1){
                  this.dataState1 = "请上传资料";
                  break;
                }
                //只获取前两只图
                for(let i=0;i<files.length;i++){
                  if(i<4){
                    var file = {};
                    file.url =files[i].url;
                    file.xh =files[i].xh;
                    file.type =1;
                    this.fileList_1.push(file)
                  }
                }
                if(examineResult){
                  this.dataState1 = examineResult.stateStr ;
                  this.dataStateReason1 = examineResult.failReason ;
                }
                this.loading1 = false;
                break;
              case 2:
                var examineResult = resultData.examineResult;
                var files = resultData.fileRespData.files;
                //未上传资料判断
                if(!examineResult&&files&&files.length<1){
                  this.dataState2 = "请上传资料";
                  break;
                }
                for(let i=0;i<files.length;i++){
                  if(i<4){
                    var file = {};
                    file.url =files[i].url;
                    file.xh =files[i].xh;
                    file.type =2;
                    this.fileList_2.push(file)
                  }
                }

                if(examineResult){
                  this.dataState2 = examineResult.stateStr ;
                  this.dataStateReason2 = examineResult.failReason ;
                }
                this.loading2 = false;
                break;
              case 3:
                var examineResult = resultData.examineResult;
                var files = resultData.fileRespData.files;
                //未上传资料判断
                if(!examineResult&&files&&files.length<1){
                  this.dataState3 = "请上传资料";
                  break;
                }
                for(let i=0;i<files.length;i++){
                  if(i<4){
                    var file = {};
                    file.url =files[i].url;
                    file.xh =files[i].xh;
                    file.type =3;
                    this.fileList_3.push(file)
                  }
                }
                if(examineResult){
                  this.dataState3 = examineResult.stateStr ;
                  this.dataStateReason3 = examineResult.failReason ;
                }
                this.loading3 = false;
                break;
              case 4:
                var examineResult = resultData.examineResult;
                var files = resultData.fileRespData.files;
                //未上传资料判断
                if(!examineResult&&files&&files.length<1){
                  this.dataState4 = "请上传资料";
                  break;
                }
                for(let i=0;i<files.length;i++){
                  if(i<4){
                    var file = {};
                    file.url =files[i].url;
                    file.xh =files[i].xh;
                    file.type =4;
                    this.fileList_4.push(file)
                  }
                }
                if(examineResult){
                  this.dataState4 = examineResult.stateStr ;
                  this.dataStateReason4 = examineResult.failReason ;
                }
                this.loading4 = false;
                break;
            }
          }else{
            switch(params.type){
              case 1:
//                  this.loading1 = false;
                this.$message.error("资料1"+response.data.head.errorMsg)
                break;
              case 2:
//                  this.loading2 = false;
                this.$message.error("资料2"+response.data.head.errorMsg)
                break;
              case 3:
//                  this.loading3 = false;
                this.$message.error("资料3"+response.data.head.errorMsg)
                break;
              case 4:
//                  this.loading4 = false;
                this.$message.error("资料4"+response.data.head.errorMsg)
                break;
            }
          }
        }).catch((response) => {
          this.$message.error('哎呀！网络出了点问题，请稍后重试！');
        });
      }
    }
  }

</script>

<style>



</style>
