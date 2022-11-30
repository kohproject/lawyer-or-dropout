<template>
    <em class="hamburger" @click="$emit('clicked')"></em>
</template>

<script>

export default{
    name:"Hamburger"
   
}
</script>
<style lang="scss" scoped>
 em.hamburger{
    display:none;
    width:30px;height:28px;
    z-index:999999;
    position:fixed;top:7px;right:10px;
    border-top:solid 5px #8ecfef;
    transform:scale(.8);
    &:before,&:after{
        content:'';
        width:100%;
        display:block;
        height:5px;
        position:absolute;
        background:#8ecfef;
        top:6px;left:0px;
        transition:transform .2s ease;
    }
    &:after{
        top: 16px;
    }
 }

 body.open{
    em.hamburger{
        border-top:none;
        top:10px;
        &:before,&:after{
            transform:rotate(44deg);

        }
        &:after{
            top:6px;
            transform:rotate(-44deg);
        }
    }
 }
</style>