<template>
  <section class="sect__bottom-buttons">
    <div class="wrapper__btn">
      <ol>
        <li>
          <Btns
            @click="$emit('clicked', true)"
            @mouseover="$emit('setType', 'law')"
            @mouseout="$emit('setType', '')"
            type="law"
            label="lawyer"
          />
        </li>
        <li>
          <Btns
            @click="$emit('clicked', false)"
            @mouseover="$emit('setType', 'drop')"
            @mouseout="$emit('setType', '')"
            type="drop"
            label="dropout"
          />
        </li>
      </ol>
    </div>
  </section>
</template>
<script>
import Btns from "@/components/Btns.vue";
export default {
  name: "BottomBtns",
  components: {
    Btns,
  },
};
</script>
<style scoped lang="scss">
$law: #ff0d93;
$drop: #b4005a;
section.sect__bottom-buttons {
  position: fixed;
  display: block;
  border-top: dashed 1px #eee;
  clear: both;
  min-height: 200px;
  bottom: 0px;
  width: 100%;
  padding-top: 30px;
  &:before {
    content: "";
    background: #fff;
    display: block;
    opacity: 0.92;
    z-index: -1;
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
  }
}
.wrapper__btn {
  display: flex;
  justify-content: center;
  border: dashed 3px #ddd;
  background: #fff;
  padding: 15px 10px;
  border-radius: 90px;
  position: relative;
  width: auto;
  max-width: 680px;
  margin: 0px auto 0px auto;
  > ol {
    display: flex;
    margin: 0px;
    justify-content: space-evenly;
    width: 100%;
    > li {
      button.btn-dropout,
      button.btn-lawyer {
        line-height: 75%;
        height: 70px;
        
        &:before {
          content: "select";
          display: block;
          font-size: 15px;
          opacity: 0.85;
          padding: 0px;
          margin: -15px 0px 0px 0px;
        }
      }
    }
  }
}
</style>