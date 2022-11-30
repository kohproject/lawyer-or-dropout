<template>
    <div :class="['block__side',cl]"><em></em></div>
</template>
<script>

export default{
    props:['cls'],
    name:"BlockSide",
    setup(props) {
        return{
            cl:props.cls
        }
    },
}
</script>
