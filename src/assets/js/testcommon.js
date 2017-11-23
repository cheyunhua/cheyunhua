import { Toast, Indicator } from 'mint-ui'
export default function testCommon(areas1, areas2, linkman, phone) {
	var post="";
	if(areas1.val() == "请选择省份" || areas2.val() == "请选择城市") {
		if(areas1.val() == "请选择省份") {
			Toast('请选择省份');
			return;
		} else {
			Toast('请选择城市');
			return;
		}
	}
	if(!linkman.val()) {
		Toast('联系人不能为空');
		linkman.focus();
		return false;
	}
	if(!phone.val()) {
		Toast('手机号码不能为空');
		phone.focus();
		return false;
	}
	if(!(/^1[34578]\d{9}$/.test(phone.val()))) {
		Toast('手机号码格式不正确');
		phone.focus();
		return false;
	}
	return post = 1;
}