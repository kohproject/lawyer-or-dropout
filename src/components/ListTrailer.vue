<template>
  <ol class="list__point-head">
    <li v-for="n in parseInt(lenNum.total)" :key="n" :class="{'active':cls(n-1)}">{{n}}</li>
  </ol>
</template>
<script>
import {toRef} from 'vue';
export default {
  name: "ListTrailer",
  props:['activeNum','listTotal'],
  setup(props) {
    const aNum = toRef(props, "activeNum");
    const lenNum = toRef(props,"listTotal");
    const cls = (num) =>{
      return (aNum.value == num)
    }

    return{
      aNum,
      lenNum,
      cls
    }
  },
};
</script>
<style lang="scss" scoped>
$law: #ff0d93;
$drop: #b4005a;
$header:#2c4453;
ol.list__point-head {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 0px;
  padding: 0px;
  bottom:10px;
  position: absolute;
  width: 100%;
  &:after {
    content: "";
    width: 100%;
    height: 1px;
    background: lighten($header,20%);
    opacity:.75;
    position: absolute;
    top: 50%;
    z-index: -1;
    transform: translateY(-50%);
  }
  > li {
    margin: 0px;
    padding: 0px;
    list-style: none;
    position: relative;
    font-size:.00001px;
    &:after {
      content: "";
      width: 9px;
      height: 9px;
      border-radius: 10px;
      display: block;
      background: lighten($header,10%);
    }
  }
  >li.active{
      &:after{
         background: #fff;
         z-index: 99; 
      }
      &:before{
          content: "";
          display:block;
          width:20px;
          height:20px;
          border:solid 1px #999;
          position: absolute;
          border-radius:20px;
          top: -6.5px;
          left: -6.5px;
          animation-name:bump;
          animation-duration:  .3s;
          animation-delay: .1s;
          animation-iteration-count:  1;
      }
  }
}
  @keyframes bump {
  0%{
    transform:scale(1.3);
  }
  100%{
    transform:scale(1);
  }
}


</style>