<template>
    <button :data-type="_type" :class="['btn', cl]">{{_label}}</button>
</template>

<script>
import { toRef } from "vue";
export default{
  name:"Btns",
  props:["label","type"],
  setup(props) {
    const _label = toRef(props, "label");
    const _type =  toRef(props, "type");
    const cl ="btn-"+_label.value;
    return{
      _label,
      _type,
      cl
    }
  }
}
</script>

<style lang="scss" scoped>
$law: #cf1c5a;
$drop: #a6042d;
.btn{
    background-color: $drop;
    min-width: 325px;
    height: 60px;
    border: 0px;
    font-size: 28px;
    color: #fff;
    &:hover{
      cursor:pointer !important;
    }
}
.btn-lawyer {
    border-top-left-radius: 120px;
    border-bottom-left-radius: 120px;
    background:linear-gradient(to bottom, lighten($law,10%), $law)
}
.btn-dropout {
   background: $drop;
    background:linear-gradient(to bottom, lighten($drop,10%), $drop);
    border-top-right-radius: 120px;
    border-bottom-right-radius: 120px;
    border-right:none;
}
</style>