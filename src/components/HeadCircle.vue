<template>
  <div :class="['wrapper__full-head', {'loading': spinStatus }]">
    <div class="full-head-outer">
      <div class="full-head-inner">
        <div class="head">
          <em>
            <div class="em-inner">
              <img :src="headImg" class="head" id="imgHeadLoader" @load="onImgLoad(headImg2)"/>
            </div>
          </em>
        </div>
      </div>
    </div>
    <img :src="headImg2" class="imgloader" />
  </div>
</template>
<script>
import { toRef, ref, watch} from "vue";
export default {
  props: ["profile","nextprofile", "loadBool"],
  name: "HeadCircle",
  setup(props) {
    const prof = toRef(props, "profile");
    const loadProf = toRef(props, "nextprofile");
    const initLoadStatus = ref(true);

    const headImg = ref(null);
    const headImg2 = ref(null);
    const spinStatus = ref(true);

    const onImgLoad = () =>{
        spinStatus.value = false;
    }
    headImg.value = require("@/assets/" + prof.value.photo);
    headImg2.value = require("@/assets/" + loadProf.value.photo);

    watch(() => props.profile,(newVal, oldVal) => {
        if (newVal !== oldVal) {
          spinStatus.value = true;
          if (newVal.photo.indexOf(".png") !== -1) {
      
            headImg.value = require("@/assets/" + newVal.photo.toString());
          }  
        }
      }
    )

    watch(() =>props.nextprofile,(newVal2) =>{
      console.log(newVal2);
      headImg2.value = require("@/assets/" + newVal2.photo.toString());
    })
    
    return {
      onImgLoad,
      prof,
      initLoadStatus,
      spinStatus,
      headImg,
      headImg2
    };
  },
};
</script>
<style  lang="scss" scoped>
$law: #ff0d93;
$drop: #b4005a;
$nav: #990000;
$ring: #f9f7f9;
$banner: rgb(165, 186, 194);
$container: #536e81;

.wrapper__full-head {
  width: 480px;
  height: 480px;
  // margin: 0px auto -30px auto;
  background: #acd7df;
  position: relative;
  bottom: 60px;
  border: dashed 4px #7592a6;
  border-radius: 480px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transform: scale(1.4);

  img.imgloader{
    width:0px;
    height:0px;
    overflow: hidden;
  }
  .full-head-outer {
    width: 440px;
    height: 440px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 440px;
    background: #eee9d8;
    border: dashed 3px lighten($container, 12%);
    position: relative;
    margin: auto;
    .full-head-inner {
      width: 400px;
      height: 400px;
      margin: auto;
      border-radius: 422px;
      position: relative;
      background: #cfeef1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border: dashed 4px lighten($container, 5%);
      .head {
        width: 345px;
        height: 345px;
        position: relative;
        margin: auto;
        em {
          width: 345px;
          height: 345px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin: auto;
          border-radius: 350px;
          background-color: #ccc;
          border: solid 20px $ring;
          background-size: cover;
          box-shadow: 0px 0px 12px darken($container, 5%);
        
          transform: rotate(0deg);
          transition: transform 0.3s ease-in-out;

          &:after {
            content: " ";
            width: 100%;
            height: 100%;
            position: absolute;
            left: 50%;
            top: 50%;
            background-color: $law;
            border-radius: 360px;
            z-index: 99;
            transform: translate(-50%, -50%);
            mix-blend-mode: screen;
            opacity: 0.1;
          }
          &:before {
            content: "";
            width: 0px;
            height: 0px;
            border-left: solid 22px transparent;
            border-right: solid 22px transparent;
            border-bottom: solid 20px $ring;
            position: absolute;
            top: -35px;
            left: 50%;
            transform: translateX(-50%);
          }
          > div {
            overflow: hidden;
            width: 100%;
            height: 100%;
            border-radius: 360px;
            position: relative;
            &:after {
              content: "";
              display: block;
              width: 36px;
              height: 36px;
              opacity: 0;
              border: solid 7px transparent;
              border-radius: 36px;
              top: 115px;
              left: 40%;
              transform: translateX(-50%);
              position: absolute;
            }
            > img.head {
              width: 100%;
              height: 100%;
              transition: filter 0.2s ease-in;
            }
            > img.head.headload{
              filter:blur(10px)
            }
             img.head.loading{
              filter:blur(20px)
            }
          }
        }
      }
    }
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.wrapper__full-head.loading {
  .head {
    em {
      > div {
        img {
          filter: blur(20px);
        }
        &:after {
          opacity: 0.5 !important;
          border: solid 10px #fff !important;
          border-top: solid 10px #999 !important;
          animation: spin 0.2s infinite;
        }
      }
    }
  }
}
</style>