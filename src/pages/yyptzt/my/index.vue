<template>
    <div class="yyptztMy zt-page">
        <!--登录驻厅人员相关信息-->
        <div class="people-info">
            <div class="peo-left">
                <img :src="ztLoginInfo.headImgUrl"
                     alt="头像加载失败">
            </div>
            <div class="peo-mid">
                <div>{{ztLoginInfo.userName?ztLoginInfo.userName:'未登录'}}</div>
                <div>
                    <button class="peo-btn"
                            @click="exitLogin()">退出登陆</button>
                </div>
            </div>
            <div class="peo-right"
                 v-if="ztLoginInfo.seriaNo">
                <div class="peo-mid-attr">工号：</div>
                <div class="peo-mid-val">{{ztLoginInfo.seriaNo}}</div>
            </div>
        </div>
        <div class="item"
             @click="gotoPage('/yyptzt/ztse')">
            <i class="iconfont icon-zixun1"></i>
            <div class="buttonGroup-left">我的服务评价</div>
            <div class="buttonGroup-right">
                <i class="fa fa-angle-right"></i>
            </div>
        </div>
        <div class="item"
             @click="gotoPage('/yyptzt/wxPromotion')">
            <i class="iconfont icon-wechat-copy"></i>
            <div class="buttonGroup-left">我的微信推广</div>
            <div class="buttonGroup-right">
                <i class="fa fa-angle-right"></i>
            </div>
        </div>
    </div>
</template>

<script>
import { MessageBox, Toast } from 'mint-ui';
import api from "../../../api/"
export default {
    data() {
        return {
            ztLoginInfo: {},
        }
    },
    methods: {
        gotoPage(url) {
            this.$router.push(url);
        },
        exitLogin() {
            MessageBox({ title: '提示', message: '确定退出?', showCancelButton: true }).then(action => {
                if (action == 'confirm') {
                    this.$router.push('/yyptzt/login');
                    localStorage.removeItem('ZT_LOGIN_INFO');
                }
            })
        },
        getLoginInfo() {
            this.ztLoginInfo = JSON.parse(localStorage.ZT_LOGIN_INFO);
        }
    },
    created() {
        this.getLoginInfo();
    }
}
</script>

<style scoped>
.people-info {
    background-color: #fff;
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    padding: 1rem 0;
}
.people-info * {
    font-size: 1.3rem;
}
.peo-left {
    display: flex;
    justify-content: center;
    margin: 0 2rem;
}
.peo-left>img {
    height: 8rem;
    width: 8rem;
    border-radius: 50%;
}
.peo-mid {
    height: 8rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.peo-mid>div:first-child {
    margin-left: .5rem;
}
.peo-mid,
.peo-right {
    padding: 1rem 0;
}
.peo-right {
    height: 8rem;
    flex: 1;
    margin: 0 1rem 0 1.5rem;
    justify-content: center;
}
.peo-mid-attr {
    float: left;
    height: 3rem;
}
.peo-mid-val {
    word-break: break-all;
}
.peo-btn {
    background-color: #EDEDED;
    border: none;
    border-radius: 10px;
    padding: .2rem .8rem;
    font-size: 1.2rem;
}
.yyptztMy .buttonGroup-left {
    margin-left: 1em;
    float: left;
    line-height: 3em;
    height: 3em;
}
.yyptztMy .buttonGroup-right {
    float: right;
    margin-right: 1em;
    line-height: 3em;
    height: 3em
}
.yyptztMy .item {
    margin: .8rem 0;
    height: 3em;
    background-color: #ffffff;
    padding-left: 1em;
}
.yyptztMy .item>i {
    font-size: 1.5em;
    color: #f17712;
    float: left;
    margin-top: 0.35em;
}
.yyptztMy .buttonGroup-right>i {
    font-size: 1.8em;
    margin-top: 0.35em;
    color: #ababab;
}
</style>
<!--=======
	<div class="yyptztMy">

		<div class="login-head">
			<div class="head-left">
				<div class="head-leftBody">
					<img src="../../../assets/images/touxiang.png" />
				</div>
			</div>
			<div class="head-right">
				<div style="color: #000;font-size:1.2em;flex: 1;-webkit-flex:1;">
					<div class="info"><span>{{userName}}</span><span>工号：{{rygh}}22222222	</span></div>
					<div class="operation" @click="exitLogin()">退出登录</div>
				</div>
			</div>
		</div>
		<div class="item" @click="gotoPage('/yyptzt/ztse')">
			<i class="iconfont icon-pingjia"></i>
			<div class="buttonGroup-left">我的服务评价</div>
			<div class="buttonGroup-right"><i class="fa fa-angle-right"></i></div>
		</div>
		<div class="item" @click="gotoPage('/yyptzt/wxPromotion')">
			<i class="iconfont icon-wechat-copy"></i>
			<div class="buttonGroup-left">我的微信推广</div>
			<div class="buttonGroup-right"><i class="fa fa-angle-right"></i></div>
		</div>
	</div>
</template>

<script>
	import { MessageBox, Toast } from 'mint-ui';
	import api from "../../../api/"
	const ZT_LOGIN_INFO = 'ZT_LOGIN_INFO'
	export default {
		data() {
			return {
				userName: '林梦洁',
				rygh: '23022',
			}
		},
		methods: {
			gotoPage(url) {
				this.$router.push(url);
			},
			exitLogin() {
				MessageBox({ title: '提示', message: '确定退出?', showCancelButton: true }).then(action => {
					if(action == 'confirm') {
						this.$router.push('/yyptzt/login');
						localStorage.setItem(ZT_LOGIN_INFO, JSON.stringify(""))
						//						localStorage.removeItem('ZT_LOGIN_INFO');
					}
				})
			},
			getLoginInfo() {
				var ztLoginInfo = localStorage.ZT_LOGIN_INFO;
				ztLoginInfo = JSON.parse(ztLoginInfo);
				this.userName = ztLoginInfo.userName
				this.rygh = ztLoginInfo.rygh
			}
		},
		created() {
			this.getLoginInfo();
		}
	}
</script>

<style scoped>
	.yyptztMy .login-head {
		display: flex;
		display: -webkit-flex;
		height: 12rem;
		background-color: #fff;
	}

	.yyptztMy .head-left {
		width: 11rem;
		height: 100%;
		float: left;
		align-items: center;
		display: -webkit-flex;
		justify-content: center;
	}

	.yyptztMy .head-leftBody {
		width: 8rem;
		height: 8rem;
		z-index: 1;
		border-radius: 50%;
		background-color: #eee;
		background-size: cover;
		background-position: center center;
		filter: none;
	}

	.yyptztMy .head-leftBody>img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.yyptztMy .head-right {
		flex: 1;
		-webkit-flex: 1;
		height: 100%;
		float: left;
		align-items: center;
		display: -webkit-flex;
	}

	.yyptztMy .info {
		display: flex;
		display: -webkit-flex;
	}

	.yyptztMy .info span {
		flex: 1;
		-webkit-flex: 1;
		color: #000;
	}
	.yyptztMy .info span:nth-child(1) {
		padding-left: .4rem;
	}
	.yyptztMy .info span:nth-child(2) {
		padding-right: 1.6rem;
		text-align: right;
		white-space: nowrap;
	}

	.yyptztMy .operation {
		margin-top: 1em;
		width: 6rem;
		height: 2rem;
		line-height: 2rem;
		font-size: 1.2rem;
		border-radius: 1.2rem;
		background: #f1f1f1;
		text-align: center;
		color: #6a6a6a;
	}

	.yyptztMy .buttonGroup-left {
		margin-left: 1em;
		float: left;
		line-height: 3em;
		height: 3em;
	}

	.yyptztMy .buttonGroup-right {
		float: right;
		margin-right: 1em;
		line-height: 3em;
		height: 3em
	}

	.yyptztMy .item {
		margin: 1rem 0;
		height: 3em;
		background-color: #ffffff;
		padding-left: 1em;
	}

	.yyptztMy .item>i {
		font-size: 1.5em;
		color: #FF7045;
		float: left;
		margin-top: 0.35em;
	}

	.yyptztMy .buttonGroup-right>i {
		font-size: 1.8em;
		margin-top: 0.35em;
		color: #ababab;
	}
</style>
>>>>>>> dev_my-->
