<template>
  <div id="homepage" :class="['home',{'shadow':!hidResult}]">
   
    <Nav :sBoard="scoreboard" :homeBool="defaultNavBool" v-on:clicked="displayStatic" />
    <TopHeader :profile="oneProfile" 
               :pCount="counter"
               :sBoard="scoreboard"/>

    <div id="container" :class="['container', typeClass]">
      <BlockSide cls="side-lawyer"/>
      <main>
      <HeadCircle 
        :profile="oneProfile"
        :nextprofile="twoProfile"
        :loadBool="spinBool"/>
      </main>
      <BlockSide cls="side-dropout"/>
      <BottomBtns v-on:setType="setBodyType" 
                  v-on:clicked="checkResp" />
    </div>
    <SectResult v-on:nextProfile="showNextProfile" 
              :profile="oneProfile"
              :hideBool="hidResult"
              :rBool="isCorrect" />
              
      <ScoreBoard v-on:clicked="playAgain" 
                  :scoreDisplay="displayBool" 
                  :score="scoreboard"/>

      <StartPage v-on:clicked="startGame" 
                  :startSho="startBool"/> 
                  
      <StaticPage :staticType="stype"  />
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from "@/components/Nav.vue";
import TopHeader from "@/components/TopHeader.vue";
import HeadCircle from "@/components/HeadCircle.vue";
import SectResult from "@/components/SectResult.vue";
import BottomBtns from "@/components/BottomBtns.vue";
import BlockSide from "@/components/BlockSide.vue";
import ScoreBoard from "@/components/ScoreBoard.vue";
import StartPage from "@/components/StartPage.vue";
import StaticPage from "@/components/StaticPage.vue";

import { ref} from "vue";
export default {
  name: "Home",
  setup() {
    const scoreboard =ref({correct: 0,total:0});
    const counter = ref(0);
    const randArr = ref([]);
    const proArr = ref([]);
    const typeClass = ref('');
    const stype = ref('');
    const oneProfile =ref({name:'',bool:false,desc:'',fullDesc:'',photo:'law1.jpg'});
    const twoProfile =ref({name:'',bool:false,desc:'',fullDesc:'',photo:'law1.jpg'});
    const isCorrect = ref(null);
    const hidResult = ref(true);
    const displayBool = ref(false);
    const startBool = ref(true);
    const spinBool = ref(true);
    const defaultNavBool = ref(false);

    const getProfile = (bool) =>  (bool) ? randArr.value[counter.value] : randArr.value[counter.value+1];
    const setProfile = () => {  
      oneProfile.value = getProfile(true);
      twoProfile.value = getProfile(false);
    };

    const startGame =(num) =>{
      scoreboard.value.total = num;
      startBool.value = !startBool.value;
      fetchOne();
    } 
    const displayStatic = (obj) =>{
      stype.value = obj.name;
      if(obj.name ==='home') defaultNavBool.value = true;
    }
    const setBodyType = (type) => {
      typeClass.value = type;
    }
    const playAgain =() =>{
      scoreboard.value.correct =0;
      scoreboard.value.total =0;
      displayBool.value = false;
      window.location.reload();
    }
   
    const checkResp = (bool) => {
          hidResult.value = !hidResult.value;
          //spinBool.value = !hidResult.value;
          //testing response
          //pass from neo
          //console.log('name='+getProfile().name+'law='+getProfile().bool+'response='+bool);

          isCorrect.value = (getProfile(true).bool == bool);

          if(isCorrect.value){
            scoreboard.value.correct++;
          }
    }
    
    const displayPlayerScore = () =>{
      hidResult.value = !hidResult.value;
      displayBool.value = !displayBool.value;
        //alert('you have '+scoreboard.value.correct+" profiles correct!");
    }
    const showNextProfile = () =>{
      if(counter.value === (scoreboard.value.total-1)){
    
        displayPlayerScore();
        return false;
      }
      counter.value++;
      hidResult.value = !hidResult.value;
      setProfile();
    }
    const getTotalNum = () =>{
      return scoreboard.value.total;
    }
    const fetchOne = () =>{
       
        proArr.value = fetch("http://localhost:3000/api/profiles")
        //proArr.value = fetch("http://www.sonnykoh.com/lawyerdropout/api/profiles.json")
          .then(response => response.json())
          .then((data) =>{
           // console.log(data);
            let $data = data.profiles;
            let $arr = $data.sort(() => Math.random() - 0.5);
              randArr.value = $arr.splice(0,getTotalNum());
              setProfile();
          });
    }

    return {
      oneProfile,
      twoProfile,
      typeClass,
      stype,
      proArr,
      randArr,
      scoreboard,
      counter,
      hidResult,
      isCorrect,
      displayBool,
      startBool,
      spinBool,
      defaultNavBool,
      playAgain,
      checkResp,
      setBodyType,
      showNextProfile,
      getProfile,
      startGame,
      displayStatic
    };
  },
  components: {
    Nav,
    TopHeader,
    HeadCircle,
    SectResult,
    BottomBtns,
    BlockSide,
    ScoreBoard,
    StartPage,
    StaticPage
  },
};
</script>
<style lang="scss">
$law: #cf1c5a;
$drop: #a6042d;
$container: #536e81;
$container:#204970;
.home.shadow{
  &:after{
    content:'';
    display:block;
    position: fixed;
    top:0px;right:0px;left:0px;bottom:0px;
    background:#000;
    opacity:.8;
    z-index: 99;
  }
}
#container {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  margin: 0px;
  width: 100%;
  max-width: 100vw;
  min-height: 95vh;
  height:auto;
  background:$container;
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 640px;
    width: 100%;
    height:100%;
    margin: 0px auto;
    bottom:0px;
    justify-content: flex-end;
   
  }
  .block__side {
    width: calc((100% - 640px) / 2.5);
    height: 90px;
    color: #fff;
    position: fixed;
    font-size: 20px;
    top: 45%;
    right: 0px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
     background: lighten($container,5%);
    align-items: flex-start;
    justify-content: center;
    z-index: 1;
    &:after {
      content: "";
      position: absolute;
      display: block;
      height: 100%;
      top: 0px;
      width: 100%;
      background:#cc266b;
      z-index: -1;
      transform: translateX(-95%);
      transition: transform 0.3s ease-in-out;
    }
    em {
      display: block;
      position: relative;
      padding-right: 20px;
      width: 100%;
      font-style: normal;
      font-size: 135%;
      letter-spacing: 0.03em;
      transition: transform 0.3s ease-in-out;
      &:before {
        content: "lawyer";
      }
    }
  }
  .block__side.side-dropout {
    &:after {
     
      left: auto;
      right: 0px;
      transform: translateX(95%);
    }
    em {
      text-align: left;
      padding-left: 20px;
      &:before {
        content: "dropout";
      }
    }
  }
  .block__side.side-lawyer {
    align-items: flex-end;
    right: auto;
    left: 0px;
    text-align: right;
  }
}

#container.law {
  .wrapper__full-head .full-head-outer .full-head-inner .head > em {
    transform: rotate(-60deg);
    transition: transform 0.3s ease-in-out;
  }
  .block__side.side-lawyer:after {
    transform: translateX(0%);
  }
}

#container.drop {
  .wrapper__full-head .full-head-outer .full-head-inner .head > em {
    transform: rotate(60deg);
    transition: transform 0.3s ease-in-out;
  }
  .block__side.side-dropout {
    &:after {
      background: #b4005a;
      transform: translateX(0%);
    }
  }
}
/* RESULTS */

body{
  background:lighten($drop,63%);
   section#result {
    width: 100%;
    
    color: #fff;
    position: fixed;
    background:#fff;
    left: 0px;
    right: 0px;
    padding: 20px 100px 10px 100px;
    text-align: center;
    font-size: 24px;
    overflow: hidden;
    bottom: 0px;
    z-index: 999;
  }
}


</style>