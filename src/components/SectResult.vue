<template>
 <section id="result" :class="['sect__response', {'correct':rBool,'incorrect':!rBool,'show':hideBool}]">
    <h2></h2>
    <p class="txt__results">{{prof ? prof.name: ''}} {{prof ? prof.fullDesc: ''}}</p>
    <button data-type="next" @click="$emit('nextProfile')" class="btn btn__next" id="btn__next">
      Click Next
    </button>
  </section>
</template>
<script>
import {toRef} from "vue";
export default {
  props:['profile','rBool','hideBool'],
  name: "sectResult",
  setup(props) {
    const prof = toRef(props, "profile");
   return{
     prof
   }
  }
}
</script>
<style lang="scss" scoped>

section#result {
  height: 340px;

  transition: transform 0.2s ease-in;
  p{
    margin:0px;
  }
  button.btn__next {
    min-width: 320px;
    position: absolute;
    bottom: 40%;
    width: 40%;
    left: 50%;
    border-radius: 40px;
    height: 75px;
    border: none;
    transform: translateX(-50%);
    background: #fff;
    font-size:20px;
    color: #666;
    &:hover{
        cursor: pointer;
    }
    &:before,
    &:after{
        content:'';
        position: absolute;
        display:block;
    }
    &:after {
        width: 12px;
        height: 12px;
        border-right: solid 2px #999;
        border-bottom: solid 2px #999;
        right: 40px;
        top: 28px;
        transform: rotate(-45deg) scale(1);
    }
    &:before {
        width: 46px;
        height: 2px;
        background: #999;
        top: 35px;
        right: 40px;
    }
  }
  h2 {
    font: bold 48px arial;
    margin: 0px;
    position: relative;
    display: inline-block;
    &:before {
      content: "Incorrect !";
    }
  }
}

section#result.incorrect {
  transform:translateY(0px);
  background: #990000 !important;
}
section#result.correct {
  transform:translateY(0px);
  background: green !important;
    h2::before {
      content: "Correct !" !important;
    }
}


 section#result.show{
      transform: translateY(200%);
  }

</style>
