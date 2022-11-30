<template>
  <div :class="['wrapper__static-page', { sho: staticBool }]">
    <h2>{{ type }}</h2>
    <div id="content">
      <div class="inner" :id="$id"></div>
      
      <button id="btn_submit" @click="sendEmail()">Submit</button>
    </div>

    <Footer />
  </div>
</template>
  
  <script>
import { toRef, ref, watch } from "vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "StaticPage",
  props: ["staticType"],
  setup(props) {
    const $ = (id) => document.getElementById(id);
    const type = toRef(props, "staticType");
    const $id = ref("home");
    const content = ref(null);
    const $ready = ref(false);
    const staticBool = ref(false);
    const bindBool = ref(true);

    const bindRequired = () => {
      if (!bindBool.value) return;

      const requiredItems = document.querySelectorAll(".li__req");
      requiredItems.forEach((el) => {
        var $inp = el.getElementsByClassName("inp-req")[0];
        $inp.addEventListener("keyup", () => {
          if (el.classList.contains("err")) {
            el.classList.remove("err");
          }
          if ($inp.value.indexOf("@") > 0 && $inp.value.indexOf(".") > 0) {
            el.classList.remove("err-email");
          }
        });
      });

      bindBool.value = false;
    };

    const validate = () => {
      let bool = true;
      const requiredItems = document.querySelectorAll(".li__req");

      requiredItems.forEach((itm) => {
        var inp = itm.getElementsByClassName("inp-req")[0];
        if (inp.value === "") {
          itm.classList.add("err");
          bool = false;
        }
        if (
          (inp.id === "email" && inp.value.indexOf("@") === -1) ||
          (inp.id === "email" && inp.value.indexOf(".") === -1)
        ) {
          itm.classList.add("err-email");
          bool = false;
        }
      });

      return bool;
    };

    const sendEmail = () => {
      // alert(validate());
      if (validate()) {
        var $name = document.getElementById("name").value.trim();
        var $email = document.getElementById("email").value.trim();
        var $subject = document.getElementById("subject").value.trim();
        var $message = document.getElementById("message").value.trim();
        const sendPost = async () => {
          await fetch("http://localhost:3000/emailMess", {
            method: "POST",
            body: JSON.stringify({
              name: $name,
              email: $email,
              subject: $subject,
              message: $message,
            }),
            headers: {
              "Content-Type": "application/json",
            },
            cache: "no-cache",
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.resp === "success") {
                var $flash = document.getElementById("message_flash");
                setTimeout(() => {
                  var $con =
                    document.getElementsByClassName("sect__contact")[0];
                  var $inps = Array.from($con.getElementsByTagName("input"));
                  $inps.forEach((inp) => {
                    inp.value = "";
                  });
                  document.getElementById("inp_message").value = "";
                  $flash.classList.add("success");
                }, 500);

                setTimeout(() => {
                  $flash.classList.remove("success");
                }, 1900);
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        };
        sendPost();
      }
    };

    watch(
      () => props.staticType,
      (newVal) => {
        if (newVal !== "" || newVal !== "undefined" || newVal !== "home") {
          staticBool.value = true;

          $id.value = newVal;
          
          const getContent = async () => {
            //const response = await fetch("http://www.sonnykoh.com/api/static/staticContent.json");
            const response = await fetch("http://localhost:3000/api/static/"+newVal);
            let $content = await response.json();
                $content = (newVal === "contact" || newVal === "about")
                ? $content.staticContent[1].content
                : $content.staticContent[0].content;

            $(newVal).innerHTML = $content;
            return true;
          };
          $ready.value = getContent();
        }

        if (newVal === "contact") {
          setTimeout(function () {
            bindRequired();
          }, 400);
        }
        if (newVal === "about") {
          bindBool.value = false;
          return;
        }
        if (newVal === "home") {
          staticBool.value = false;
          bindBool.value = false;
        }
      }
    );

    //alert(staticBool.value);
    return {
      $id,
      bindBool,
      sendEmail,
      type,
      content,
      staticBool,
    };
  },
  components: { Footer },
};
</script>
  <style lang="scss">
$header: #666;
$container: #204970;
$header: $container;
$label: darken($container, 10%);
$start: #dc1038;
$sendRed: #af033f;

#btn_submit {
  height: 55px;
  width: 90%;
  border: none;
  border-radius: 30px;
  position: absolute;
  right: 20px;
  font-size: 20px;
  color: #fff;
  margin: 30px auto;
  text-shadow: 1px 1px 1px #1a3c5c;
  background: linear-gradient(to bottom, #204970, #1a3c5c);
}

.wrapper__static-page {
  display: none;
  position: absolute;
  top: 40px;
  left: 0px;
  right: 0px;
  min-height: 110vh;
  z-index: 99;
  background: lighten($container, 68%);
  flex-direction: column;
  justify-content: flex-start;
  padding: 0px 0px 120px 0px;
  align-items: center;
  * {
    z-index: 100;
  }
  h2,
  h3,
  h4 {
    color: lighten($header, 5%);
  }
  h2 {
    font-size: 70px;
    font-weight: normal;
    text-transform: capitalize;
    font-family: times, "Times New Roman";
    margin: 0px;
    color: #fff;
    background: #152f48;
    height: 110px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h4 {
    margin: 10px 0px;
    font-weight: normal;
    clear: both;
    width: 100%;
    color: #666;
  }
  p {
    line-height: 140%;
    margin: 0px;
    font-size: 16px;
    margin-bottom: 20px;
    text-align: left;
  }
  p,
  label {
    color: darken($container, 5%);
  }
  strong {
    display: block;
  }
  .flex {
    display: flex;
    justify-content: center;
  }
  hr {
    border: 0px;
    height: 2px;
    background: none;
    border-top: solid 1px lighten($header, 40%);
    border-bottom: solid 2px #fff;
  }
}
.wrapper__static-page.sho {
  display: flex;
  hr {
    opacity: 0;
  }
  #rules,
  #about,
  #contact {
    section {
      max-width: 46vw;
      width: 100%;
      position: relative;
      overflow: visible;
      height: auto;
      min-height: 550px;
      text-align: left;
      background: #fff;
      border-top: solid 10px lighten($container, 65%);
      padding: 20px;
      em {
        display: block;
        width: 100%;
        height: 8px;
        top: -18px;
        left: 0px;
        background: lighten($container, 50%);
        position: absolute;
      }
      h3 {
        font-weight: bold;
        font-size: 30px;
        margin: 20px 0px 0px 0px;
        clear: both;
      }
    }
  }

  #about,
  #contact {
    section.sect__contact,
    section.sect__about {
      position: relative;
      transition: width 0.5s ease-in-out;
      &:before,
      &:after {
        content: "";
        display: none;
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        background: #fff;
        opacity: 0.8;
        z-index: 999;
      }
      &:after {
        mix-blend-mode: multiply;
      }
    }
  }

  #about {
    section.sect__about {
      border-color: #265684;
      width: 50vw;
      max-width: 50vw;
    }

    section.sect__contact {
      width: 35vw;
      h3,
      p,
      label,
      button {
        filter: blur(3px);
      }
      &:before,
      &:after {
        display: block;
      }
      &:after {
        z-index: 999;
        opacity: 0.5;
        border-left: solid 1px #444;

        background: linear-gradient(
          to right,
          #265684 0%,
          #eee 5%,
          #fff 7%,
          #fff 100%
        );
      }
    }
  }
  #contact {
    section.sect__contact {
      border-color: #265684;
      width: 50vw;
      max-width: 50vw;
    }

    section.sect__about {
      width: 35vw;
      h3,
      p {
        filter: blur(3px);
      }

      &:before,
      &:after {
        display: block;
      }
      &:after {
        z-index: 999;
        opacity: 0.5;
        border-left: solid 1px #444;

        background: linear-gradient(
          to left,
          #265684 0%,
          #eee 5%,
          #fff 7%,
          #fff 100%
        );
      }
    }
  }

  $headerBlue: #152f48;
  #rules {
    position: relative;
    display: block;
    height: 100%;
    width: 100%;
    overflow: hidden;
    overflow-y: auto;
    padding: 0px;
    min-height: 110vh;
    clear: both;
    header {
      height: 90px;
      margin: 0px 0px 40px 0px;
      color: #fff;
      background: $headerBlue;
      border-top: dashed 2px lighten($headerBlue, 10%);
      height: 130px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0px 7.5%;

      p {
        color: #fff;
        font-size: 19px;
      }
    }
    // display: none;
    .box__static-page {
      margin: auto;

      max-width: 90vw;
      position: relative;

      section {
        .block__header {
          min-height: 150px;
          padding-right: 40px;
        }
        article {
          width: 47.5%;
          padding: 20px;
          background: #eee;
          border: dashed 3px #ccc;
          min-height: 450px;
          float: left;
          overflow: hidden;
          position: relative;
          &:after {
            content: "";
            display: block;
            width: 50px;
            height: 50px;
            border-radius: 50px;
            background: #fff;
            opacity: 0.05;
            position: absolute;
            top: 13px;
            left: 19%;
            transform: scale(0.6);
          }
          h4{
            display: flex;
            overflow: hidden;
            font-weight:bold;
            color:#333;
            align-items: center;
            clear:both;

            >.head{
              display:block;
              width:65px;
              height:65px;
              border-radius:65px;
              background-image:url('http://www.sonnykoh.com/images/rulesHeads.png');
              background-repeat: no-repeat;
              background-size:257px 65px;
              outline:solid 5px #fff;
              position:relative;
              margin: 5px 20px 5px 5px;
              float:left;
              >em {
                display: block;
                width: 44px;
                height: 44px;
                border-radius: 44px; 
                background:#fff;
                position: absolute;
                top: 35px;
                left: 35px;
                transform: scale(0.5);
                background: #fff;
                outline: solid 1px #ccc;
                &:before,
                &:after {
                  content: "";
                  display: block;
                  position: absolute;
                  top: 18px;
                  width: 28px;
                  height: 8px;
                }
              }
            }
            >.head.head-av{
              background-position: 0px 0px;
            }
            >.head.head-fa{
              background-position: -65px 0px;
            }
            >.head.head-sw{
              background-position: -129px 0px;
            }
            >.head.head-ss{
              background-position: -194px 0px;
            }
          }
        
        }
        article.act-true {
         
          h4{
            em {
              &:before {
                left: 26px;
                top: 19px;
                background: #048313;
                transform: translateX(-50%) rotate(-48deg) scale(.85);
              }
              &:after {
                left: 15px;
                width: 18px;
                top: 23px;
                background: #048313;
                transform: translateX(-50%) rotate(44deg) scale(.85);
              }
            }
          }
        }
        article.act-false {
          h4{
            em {
              border-color:#cc0000;
              &:before {
                left: 50%;
                transform: translateX(-50%) rotate(44deg) scale(.85);
                background: #cc0000;
              }
              &:after {
                left: 50%;
                transform: translateX(-50%) rotate(-44deg) scale(.85);
                background: #cc0000;
              }
            }
          }
         
        }
        article.act-false {
          border-color: #d3c3c9;
          background: #f9f3f5;
          color: #331f26;
          p {
            color: #331f26;
          }
        }
        article.act-true {
          background: #f2f8f4;
          border-color: #bcd2c6;
          color: #192f23;
          p {
            color: #192f23;
          }
        }
      }
      section:nth-child(1) {
        margin-right: 30px;
      }

      article:nth-child(even) {
        margin-left: 5%;
      }
    }
  }
  #about,
  #contact {
    position: relative;
    width: 100%;
    margin-top: 40px;
    h3 {
      margin-bottom: 20px !important;
    }
    .sect__contact {
      padding-left: 5%;
      .contact__wrapper {
        z-index: 2;
        h2 {
          color: #fff;
          max-width: 440px;
          margin: 20px auto 0px auto;
        }
        .contact-response {
          height: 0px;
          background: lighten($start, 10%);
          width: 100%;
          max-width: 440px;
          position: relative;
          margin: 0px auto;
          overflow: hidden;
          > div {
            position: absolute;
            height: 100px;
            width: 100%;
            padding: 10px 20px;
            transform: translateY(-100px);

            &:after {
              content: "\263A";
              color: #fff;
              font-size: 54px;
              position: absolute;
              top: -10px;
              right: 10px;
              opacity: 0.6;
            }

            h3 {
              font-size: 24px;
              font-weight: normal;
              margin: 0px;
            }
            p {
              font-size: 20px;
            }
          }
        }
      }
      .contact__wrapper.success {
        .contact-response {
          transition: all 0.3s ease;
          height: 100px;
          margin: 20px auto;
          border: dashed 2px #ff0000;
          > div {
            transform: translateY(0px);
            transition: all 0.3s ease;
          }
        }
      }

      form {
        max-width: 440px;
        position: relative;
        margin: 10px auto;
        box-sizing: border-box;
        font-family: verdana;

        * {
          box-sizing: border-box;
        }

        input,
        label,
        textarea {
          display: block;
          width: 100%;
          max-width: 440px;
          padding-left: 4px;
        }
        input,
        textarea {
          border: solid 1px lighten($header, 40%);
          outline: none;
        }
        textarea {
          max-height: 120px;
        }

        li.err,
        li.err.err-email,
        li.err-email {
          input.inp-req,
          textarea.inp-req {
            background: #f8b4c6;
            outline: solid 2px #cc0000;
          }
          label {
            position: relative;
            &:after {
              content: "required!";
              position: absolute;
              right: 0px;
              text-align: right;
              bottom: 0px;
              color: #fff;
              font: normal 10pt arial;
            }
          }
        }

        li.err-email {
          label {
            &:after {
              content: "invalid email!";
            }
          }
        }

        label {
          margin: 10px 0px 3px 0px;
          color: $label;
          opacity: 0.9;
        }
        label.before-required-star {
          position: relative;
          &:before {
            content: "*";
            color: #ff0000;
            font-size: 14px;
            position: absolute;
            left: -8px;
            top: 0px;
          }
        }
        input {
          height: 35px;
        }
        li.err,
        li.err.err-email,
        li.err-email {
          input.inp-req,
          textarea.inp-req {
            background: #f8b4c6;
            outline: solid 2px #cc0000;
          }
          label {
            position: relative;
            &:after {
              content: "required!";
              position: absolute;
              right: 0px;
              text-align: right;
              bottom: 0px;
              color: #fff;
              font: normal 10pt arial;
            }
          }
        }

        li.err-email {
          label {
            &:after {
              content: "invalid email!";
            }
          }
        }
        button {
          height: 55px;
          width: 90%;
          border: none;
          border-radius: 30px;
          font-size: 20px;
          color: #fff;
          margin: 30px auto;
          text-shadow: 1px 1px 1px darken($header, 5%);
          background: linear-gradient(to bottom, $header, darken($header, 5%));
          &:hover {
            transform: scale(1.01);
            box-shadow: 1px 1px 10px lighten($header, 48%);
            cursor: pointer;
          }
        }
      }
    }
  }

  #about {
    .sect__contact {
      > em {
        display: none;
      }
    }
  }
  #contact {
    .sect__about {
      > em {
        display: none;
      }
    }
  }

  #btn__real-send {
    width: 0.001px;
    height: 0.001px;
    opacity: 0;
    display: inline;
  }
}
</style>
  