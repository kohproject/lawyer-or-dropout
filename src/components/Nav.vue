<template>
  <nav>
    <Logo />
    <p :class="['txt__corr',{'hid':scoreBool}]">
      Correct Responses: <span>{{ scoreBoard.correct }}</span> <em></em> Out Of:
      <span>{{ scoreBoard.total }}</span>
    </p>
    <ol>
      <li v-for="itm in navArr" :key="itm.name">
          <a href="itm.link" 
          @click="setStaticView($event,itm.name)" 
          :class="['link__nav',{'active':itm.status}]">{{itm.name}}</a>
      </li>
    </ol>
    <Hamburger @clicked="setMobileView()"/>
  </nav>
</template>

<script>
import { toRef,ref,watch} from "vue";
import Hamburger from "@/components/Hamburger.vue";
import Logo from "@/components/Logo.vue";
export default {
  name: "Nav",
  props: ["sBoard","homeBool"],
  setup(props,context) {
    const scoreBoard = toRef(props, "sBoard");
    const _homeBool = toRef(props,"homeBool");
    const scoreBool = ref(false);
    const navArr = ref([]);
          navArr.value =[
            {name:'home',title:'home',status:true,link:'#'},
            {name:'rules',title:'rules of game',status:false,link:'#'},
            {name:'about',title:'about this website',status:false,link:'#'},
            {name:'contact',title:'contact',status:false,link:'#'}
          ];

    const isMobile = () =>{
      return (window.innerWidth < 600) ? true : false;
    }
    const setStaticView = (evt,type) =>{
      if(evt) evt.preventDefault();
        navArr.value.forEach(itm =>{
          itm.status = (itm.name ===type) ? true : false;
          if(itm.status) {
             context.emit('clicked',{title:itm.title,name:itm.name});
          }
        });
        if(isMobile){
          setMobileView();
        } 
      return false;
    };
    const setMobileView = () =>{
      let $body = document.getElementById('body');
      ($body.classList.contains('open'))
      ? $body.classList.remove('open')
      : $body.classList.add('open')
    }


    watch(() => _homeBool.value,(newVal) => {
      console.log(newVal);
        setStaticView(null,'home');
        scoreBool.value = false;
    })

    return {
      setStaticView,
      setMobileView,
      scoreBoard,
      scoreBool,
      navArr
    };
  },
  components: { Logo, Hamburger},
};
</script>
<style type="text/css" lang="scss">
$law: #ff0d93;
$drop: #b4005a;
$ring: #eb2367;
$nav: #1b2628;
$container: #204970;
$header: darken($container, 10%);
$nav: darken($header, 20%);
nav {
  height: 40px;
  background: lighten($nav, 5%);
  z-index: 999;
  position: fixed;
  top: 0px;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  color: #fff;
  
  p.txt__corr {
    color: #fff;
    display: flex;
    top: 0px;
    right: 10px;
    position: absolute;
    left: 50%;
    max-width: 340px;
    height: 40px;
    justify-content: center;
    align-items: center;
    background: $drop;
    background: darken($nav, 5%);
    margin: 0px;
    padding: 0px 30px;
    transform: translateX(-50%);
    > span {
      font-weight: bold;
      font-size: 18px;
      padding: 0px 8px 0px 6px;
    }
  }
  p.txt__corr.hid{
    visibility: hidden;
  }
  > ol {
    width: auto;
    height: 40px;
    > li {
      margin-right: 20px;
      display: flex;
      height: 40px;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      > a.link__nav {
        color: lighten($nav, 70%);
        &:hover{
          color: lighten($nav, 90%);
          transform:scale(1.05);
          text-decoration: underline;
        }
      }
      > a.link__nav.active {
        color: #fff;
        &:hover{
          transform:scale(1);
          text-decoration: none;
        }
      }
    }
  }
}
</style>
