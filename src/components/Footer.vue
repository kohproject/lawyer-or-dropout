<template>
    <footer></footer>
</template>
<script>
export default{
    name:'Footer'
}
</script>
<style lang="scss" scoped>
$container: #204970;
 footer {
    height: 120px;
    position: absolute;
    bottom: 0px;
    width: 100%;
    clear: both;
    background: darken($container, 15%);
  }
</style>