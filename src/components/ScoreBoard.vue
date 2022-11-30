<template>
  <div :class="['wrapper__scoreboard', { sho: scoreBool }]">
    <div :class="['box__end',{'modalEffect':modalBool}]">
      <div class="inner">
        <h2>Congratulations!</h2>
        <p>
          You got {{ scoreNum.correct }} out of {{ scoreNum.total }} correct profiles.<br />
          You win nothing!
        </p>
        <hr />
        <Btns
          @click="$emit('clicked')"
          class="btn__playagain"
          type="reset"
          label="play again"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { toRef,ref, watch} from "vue";
import Btns from "@/components/Btns.vue";
export default {
  props: ["scoreDisplay", "score"],
  name: "ScoreBoard",
  setup(props) {
    const scoreBool = toRef(props, "scoreDisplay");
    const scoreNum = toRef(props, "score");
    const modalBool = ref(false);

    watch(() => props.scoreDisplay,(newBool) => {
        if(newBool ===true){
            setTimeout(function(){
                modalBool.value = true
            },1000)
        }
    })

    return {
      scoreNum,
      scoreBool,
      modalBool
    };
  },
  components: {
    Btns,
  },
};
</script>
<style scoped lang="scss">
$boxEnd: #3ea33e;
.wrapper__scoreboard {
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 0px;
  right: 0px;
  left: 0px;
  bottom: 0px;
  position: fixed;
  color: #fff;
  transform: translateY(-200%);
  .box__end {
    width: 65%;
    max-width: 640px;
    height: 100%;
    margin: 0px auto 0px auto;
    .inner {
      width: 100%;
      background: $boxEnd;
      margin-top: 35%;
      padding: 50px 50px 75px 50px;
      transform: translateY(-200%);

      h2 {
        font-size: 60px;
        font-weight: normal;
        margin: 0px;
        margin-bottom: 30px;
        text-shadow: 1px 1px 1px darken($boxEnd, 5%);
      }
      p {
        font-size: 28px;
        margin: 20px auto 40px auto;
      }
      hr {
        height: 0px;
        outline: none;
        margin: 50px 0px;
        border: 0px;
        border-bottom: solid 1px lighten($boxEnd, 10%);
        border-top: solid 1px darken($boxEnd, 10%);
        appearance: none;
      }
    }
  }
  &:before {
    content: "";
    display: block;
    position: absolute;
    top: 0px;
    right: 0px;
    left: 0px;
    bottom: 0px;
    background: transparent;
    z-index: -1;
    opacity: 0;
  }
}

.wrapper__scoreboard.sho {
  transform: translateY(0%);
  &:before{
    background: #222;
    opacity: .9;
    transition:all .3s ease;
  }
}
.wrapper__scoreboard.sho {
  .box__end.modalEffect{
      .inner{
          transform: translateY(0%);
          transition:transform .3s ease;
      }
  }
}


button.btn__playagain {
  width: 60%;
  min-width: 420px;
  height: 75px;
  background-image: linear-gradient(to bottom, #fff, lighten($boxEnd, 48%));
  box-shadow: -2px 2px 4px darken($boxEnd, 5%);
  color: darken($boxEnd, 20%);
  overflow: hidden;
  border-radius: 100px;
  letter-spacing: 1px 1px 1px #fff;
  &:hover {
    opacity: 0.9;
  }
}
</style>
