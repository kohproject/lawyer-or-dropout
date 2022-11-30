<template>
  <div :class="['wrapper__start', { sho: startBool }]">
    <div :class="['box__start',{'modalEffect':modalBool}]">
      <div class="outer"><div class="inner">
        <h2>Profile Entries</h2>
        <p>Choose the number of entries</p>
        <input
          type="range"
          min="20"
          max="50"
          step="15"
          id="indicator_selector"
          :data-selector="_total"
          :value="_total"
          @change="setNumTotal($event)"
        />
        <ol>
          <li v-for="n in numSelectedArr" :key="n">
            <a
              href="javascript:void(0)"
              @click="setBoxLink(n)"
              :class="['link__num', { active: n.bool }]"
              >{{ n.num }}</a
            >
          </li>
        </ol>
        <hr />
        <Btns
          @click="$emit('clicked', getTotalNum())"
          type="start"
          label="Start"
        />
         </div>
      </div>
    </div>
  </div>
</template>
<script>
import { toRef, ref } from "vue";
import Btns from "@/components/Btns.vue";
export default {
  props: ["startSho"],
  name: "StartPage",
  setup(props) {
    const _total = ref(20);
    const startBool = toRef(props, "startSho");
    const modalBool = ref(false);
    let minNum = 20;
    let medNum = 35;
    let maxNum = 50;
    const numSelectedArr = [
      { num: minNum, bool: true },
      { num: medNum, bool: false },
      { num: maxNum, bool: false },
    ];
    const setNumTotal = (evt) => {
      let val = evt.currentTarget.value;
      let obj = numSelectedArr[0];

      if (val == medNum) {
        obj = numSelectedArr[1];
      } else if (val == maxNum) {
        obj = numSelectedArr[2];
      }
      setBoxLink(obj);
    };
    const getObj = (obj) => {
      return numSelectedArr.filter((el) => el == obj);
    };
    const getTotalNum = () => {
      return _total.value ? _total.value : minNum;
    };

    const setBoxLink = (obj) => {
      _total.value = obj.num;
      numSelectedArr.forEach((itm) => {
        itm.bool = false;
      });
      getObj(obj)[0].bool = true;
    };

    _total.value = minNum;

    setTimeout(function () {
        modalBool.value = true;
    },500)

    return {
      getTotalNum,
      setBoxLink,
      setNumTotal,
      _total,
      numSelectedArr,
      startBool,
      modalBool,
      minNum,
      medNum,
      maxNum,
    };
  },
  components: {
    Btns,
  },
};
</script>
<style lang="scss" scoped>
$container: #536e81;
$header: #2c4453;
$startBox: #204970;

$startBox:#356989;
$startBtn:#1f9cd9;


.wrapper__start {
  display: none;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 99;
  justify-content: center;
  align-items: center;
  * {
    z-index: 100;
  }
  &:before {
    content: "";
    display: block;
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: -1;
    background-color: transparent;
    opacity:.9;
  }
}


.box__start {
  width: 90%;
  max-width: 640px;
  color: #fff;
  margin: 0 auto 0px auto;
  visibility:hidden;
  min-height:100vh;
  overflow: hidden;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  .outer {
    position: relative;
    background: transparent;
    min-height: 450px;
    margin-top:25%;
    opacity:0;
    transform-style: preserve-3d;
    backface-visibility: hidden;
   
    .inner{
      position: relative;
      background: $startBox;
       backface-visibility: hidden;
       width:100%;
       height:100%;
      overflow: hidden;
       border: solid 2px lighten($startBox, 10%);
        padding-top: 30px;
      min-height: 450px;
       perspective: 1000px;
       transform-style: preserve-3d;
       transform: translateY(-200%);
     *{
       transform-style: preserve-3d;
     }
    
    h2 {
      margin: 0px;
      font-weight: normal;
      font-size: 20px;
      margin-bottom: 8px;
    }
    p {
      margin: 0px;
      font-size: 25px;
    }

    input[type="range"] {
      background: transparent;
      width: 250px;
      border-color: transparent;
      margin: 20px 0px;
      color: transparent;
      outline: none;
      appearance: none;
      -webkit-appearance: none;
    }
    input[type="range"]::-webkit-slider-runnable-track {
      width: 100%;
      height: 16px;
      cursor: pointer;
      background: darken($startBox, 10%);
      border-radius: 12px;
      border: 1px solid darken($startBox, 20%);
    }
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      border: 1px solid darken($startBox, 40%);
      height: 34px;
      width: 16px;
      border-radius: 3px;
      background: lighten($startBox, 60%);
      cursor: pointer;
      margin-top: -10px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
      box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d; /* Add cool effects to your sliders! */
    }
    hr {
      height: 2px;
      margin: 60px auto 50px auto;
      background: lighten($startBox, 2%);
      border: 0px;
      border-bottom: solid 1px lighten($startBox, 10%);
      border-top: solid 2px darken($startBox, 10%);
      outline: none;
      opacity: 0.9;
      max-width: 96%;
      appearance: none;
    }
    button {
      border-radius: 40px;
      width: 60%;
      min-width: 420px;
      height: 75px;
      background-image: linear-gradient(
        to bottom,
        lighten($startBtn, 26%),
        lighten($startBtn, 19%)
      );
      box-shadow: -2px 2px 1px darken($startBox, 3%);
      text-shadow:0px 1px 1px lighten($startBtn, 10%);
      &:hover {
        opacity: 0.9;
      }
    }
    ol {
      width: 250px;
      display: flex;
      flex-direction: row;
      margin: 20px auto;
      > li {
        margin-right: 25px;
        > a.link__num {
          width: 70px;
          height: 40px;
          display: flex;
          color: #fff;
          justify-content: center;
          align-items: center;
          font-size: 21px;
          border: solid 1px lighten($startBox, 40%);
          position: relative;
          overflow: hidden;
          opacity:.7;
           color: $startBox;
          background: linear-gradient(to bottom, #fff, lighten($startBtn,42%));
          &:before {
            content: "";
            background-color: #fff;
            display: block;
            width: 100%;
            height: 100%;
            opacity: 0;
            position: absolute;
            transform: translateY(100%);
          }
          &:hover {
            border: solid 1px lighten($startBox, 60%);
            color:darken($startBox, 20%);
            opacity:1;
            &:before {
              opacity: 0.3;
              transform: translateY(0%);
              transition: all 0.1s ease;
            }
          }
        }
        > a.link__num.active {
          background: lighten($startBox, 70%);
          opacity:1;
          color: $startBox;
          &:hover {
            &:before {
              display: none;
            }
          }
        }
      }
    }
  }
}
}
</style>

<style lang="scss">
body#body{
  background:#fff;
}
.wrapper__start.sho {
  display: flex;
  flex-direction: column;
}
.wrapper__start.sho {
  &:before{
    background-color:#222;
    transition:background-color 3s ease;
  }
  
  .box__start{
    visibility: visible !important;
    .outer{
      .inner{
           transform-origin: 50% 0;
      }
    }
  } 

  .box__start.modalEffect ~ .wrapper__start.sho{
    &:before {
      visibility: visible;
    }
  }
  .box__start.modalEffect >.outer {
    opacity: 1;
    
  }
  .box__start.modalEffect >.outer .inner {
 
    perspective: 1300px;
    transform-origin: 50% 0;
    transform: translateY(0) rotateX(0deg);
    transition: all 0.55s cubic-bezier(1, 0.3, 0.32, 1.17)
  }
}




</style>
