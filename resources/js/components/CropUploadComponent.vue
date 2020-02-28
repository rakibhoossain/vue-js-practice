<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Laravel Image crop</div>
                    <div class="p-3 bg-white shadow rounded-lg">
                        <input type="file" name="image" accept="image/*" @change="setImage" />

                        <!-- Image previewer -->
                        <img :src="imageSrc" width="100" />

                        <!-- Cropper container -->
                        <div v-if="this.imageSrc" class="my-3 d-flex align-items-center justify-content-center mx-auto">
                            <vue-cropper class="mr-2 w-50" ref='cropper' :guides="true" :src="imageSrc"></vue-cropper>

                            <!-- Cropped image previewer -->
                            <img class="ml-2 w-50 bg-light" :src="croppedImageSrc"/>
                        </div>
                        <button v-if="this.imageSrc" @click="cropImage">Crop</button>
                        <button v-if="this.croppedImageSrc" @click="uploadImage">Upload</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import VueCropper from 'vue-cropperjs';
    import 'cropperjs/dist/cropper.css';

    export default {
        components: {
            VueCropper
        },
        data: function() {
            return {
                imageSrc: "",
                croppedImageSrc: ""
            }
        },
        methods: {
            setImage: function (e) {
                const file = e.target.files[0];
                if (!file.type.includes('image/')) {
                    alert('Please select an image file');
                    return;
                }
                if (typeof FileReader === 'function') {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        this.imageSrc = event.target.result;

                        // Rebuild cropperjs with the updated source
                        if(this.$refs.cropper) this.$refs.cropper.replace(event.target.result);
                    };
                    reader.readAsDataURL(file);
                } else {
                    alert('Sorry, FileReader API not supported');
                }
            },
            cropImage() {

                // Get image data for post processing, e.g. upload or setting image src
                this.croppedImageSrc = this.$refs.cropper.getCroppedCanvas().toDataURL();
            },
            uploadImage() {
                let _this = this;
                this.$refs.cropper.getCroppedCanvas().toBlob(function (blob) {
                    let formData = new FormData();

                    // Add name for our image
                    formData.append('name', "image-name-"+(new Date()).getTime());

                    // Append image file
                    formData.append('file', blob);

                    axios.post(
                        '/vue/api/image', formData
                    ).then(response => {
                        _this.imageSrc = response.data.url;
                        console.log(response.data);
                    }).catch(function (error) {
                        console.log(error);
                    });
                });
            }
        }
    }
</script>