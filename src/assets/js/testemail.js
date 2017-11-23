import { Toast, Indicator } from 'mint-ui'
export default function testEmail(email) {
	var post=""
	if(email.val()) {
		if(!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email.val()))) {
			Toast('邮箱格式不正确');
			email.focus();
			return false;
		}
	}
   return post = 1;
}