<template>
    <div class='upload-img'>
        <img :src="imgSrc"
             alt="未选择图片">
        <!-- <input @change='uploadImg'
               type="file"
               accept="image/*"> -->
        <form></form>
    </div>
</template>
<script >
export default {
    data: function () {
        return {
            imgSrc: localStorage.getItem('wx.user.img')
        }
    },
    methods: {
        uploadImg(event) {
            var formData = new FormData(document.querySelector('form'));
            var file = event.target.files[0];

            this.compress(file, 0.8, this, (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }

                formData.append('image', data);
                // TODO: ajax 提交 fromdData
            });
        },

        compress(file, quality, thisVue, callback) {
            // debugger
            if (!window.FileReader || !window.Blob) {
                return errorHandler('您的浏览器不支持图片压缩')();
            }

            let reader = new FileReader();
            let mimeType = file.type || 'image/jpeg';

            reader.onload = createImage;
            reader.onerror = errorHandler('图片读取失败！');
            reader.readAsDataURL(file);

            function createImage() {
                let dataURL = this.result;
                let image = new Image();
                image.onload = compressImage;
                image.onerror = errorHandler('图片加载失败');
                image.src = dataURL;
            }

            function compressImage() {
                let canvas = document.createElement('canvas');
                let ctx;
                let dataURI;
                let result;
                // 固定分辨率
                let width = 100
                let height = 100

                canvas.width = width;
                canvas.height = height;

                // 在原图正中间取最大正方形
                let smallerLenth = this.naturalWidth <= this.naturalHeight ? this.naturalWidth : this.naturalHeight
                let sx = Math.floor((this.naturalWidth - smallerLenth) / 2)
                let sy = Math.floor((this.naturalHeight - smallerLenth) / 2)
                ctx = canvas.getContext('2d');
                ctx.drawImage(this, sx, sy, smallerLenth, smallerLenth, 0, 0, width, height);
                // 压缩
                dataURI = canvas.toDataURL(mimeType, quality);
                // 转blob对象
                result = dataURIToBlob(dataURI);
                canvas = ctx = null;
                // 显示预览图
                thisVue.imgSrc = dataURI

                callback(null, result);
            }

            function dataURIToBlob(dataURI) {
                let type = dataURI.match(/data:([^;]+)/)[1];
                let base64 = dataURI.replace(/^[^,]+,/, '');
                let byteString = atob(base64);

                let ia = new Uint8Array(byteString.length);
                for (let i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }

                return new Blob([ia], { type: type });
            }

            function errorHandler(message) {
                return function () {
                    let error = new Error('Compression Error:', message);
                    callback(error, null);
                };
            }
        }
    }


}

</script>
<style scoped >
.upload-img {
    width: 25rem;
    width: 70vw;
    padding: 1rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 4rem;
}
.upload-img>img {
    height: 10rem;
    width: 10rem;
    border-radius: 50%;
}
.upload-img input {
    position: absolute;
    top: 0;
    width: 35%;
    height: 100%;
    opacity: 0;
}
</style>
