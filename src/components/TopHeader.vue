<template>
  <header>
    <div class="wrapper__header">
      <div class="header-inner">
        <span>
          <h2>{{prof ? prof.name: ''}}</h2>
          <p>{{prof ? prof.desc: ''}}</p>
        </span>
        <em class="em-left"></em>
        <em class="em-right"></em>
      </div>
    </div>
    <ListTrailer :activeNum="pNum" :listTotal="scoreBoard"/>
  </header>
</template>

<script>
import {toRef} from 'vue';
import ListTrailer from "@/components/ListTrailer.vue";
export default {
  name: "TopHeader",
  props:['profile','pCount','sBoard'],
  setup(props) {
    const prof = toRef(props, "profile");
    const pNum = toRef(props,"pCount");
    const scoreBoard = toRef(props,"sBoard");
    return{
      prof,
      pNum,
      scoreBoard
    }
  },
  components: {
    ListTrailer
  }
};
</script>
<style lang="scss" scoped>
$law: #ff0d93;
$drop: #b4005a;
$ring:#eb2367;
$header:#2c4453;
$container:#204970;
$header:darken($container,10%);

header {
  margin: 0px;
  height: 125px;
  clear: both;
  width: 100%;
  position: fixed;
  top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 2px;
  color: #555;
  background-color: #eeeeee;
  background:darken($drop,20%);
  background:$header;
  z-index: 1;
}
.wrapper__header {
  top: 20px;
  margin: 0px auto 20px auto;
  max-width: 99.9vw;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 1;
  .header-inner {
    height: 100%;
    min-width: 640px;
    text-align: center;
    position: relative;
    z-index: 1;
    span {
      display: block;
      width: 100%;
      height: 100%;
      text-align: center;
      position: relative;
      top: 0px;
      bottom: 0px;
      z-index: 2;
      h2 {
        font-size: 40px;
        font-family:"Times New Roman",sans-serif;
        font-weight:normal;
        text-shadow:0px 1px 1px darken($header,10%);
        display: inline;
        margin: 0px;
        position: relative;
        color: #fff;
      }
      p {
        font-size: 20px;
        color: #fff;
        opacity:.75;
        margin: 0px;
        margin-top: 3px;
      }
    }
    em {
      display: block;
      height: 100%;
      width: 35%;
      position: absolute;
      top: -25px;
      right: -32%;
      z-index: 0;
    }
    em.em-left {
      right: auto;
      left: -32%;
    }
  }
}
</style>
