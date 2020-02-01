<template>
  <div>
    <div>
      <div class="cu-bar bg-white margin-top solid-bottom">
        <div class="action">
          <text class="cuIcon-titles text-orange"></text>学生报备系统
        </div>
      </div>
      <wuc-tab :tab-list="tabList" :tabCur.sync="TabCur" tab-class="text-center text-black bg-white" select-class="text-blue" />
      <swiper :current="TabCur" class="swiper" duration="300" :circular="true" indicator-color="rgba(255,255,255,0)" indicator-active-color="rgba(255,255,255,0)" @change="swiperChange5">
		  <!-- 老师 -->
        <swiper-item key="teacher">
          <div class="bg-white padding margin text-center text-black">
		  
		  <input type="text" value="" placeholder="用户名" v-model="userId" />
		  <input type="text" value="" placeholder="密码" password="true" v-model="password" />
		  <button type="primary" @click="signUp">登录</button>
		  </div>
		  
        </swiper-item>
		<!-- 学生 -->
		<swiper-item key="students">
		  <div class="bg-white padding margin text-center text-black">
		  <input type="text" value="" placeholder="用户名" v-model="userId" />
		  <input type="text" value="" placeholder="密码" password="true" v-model="password" />
		  <button type="primary" @click="signUp">登录</button>
		  </div>
		</swiper-item>
		
		<!-- 家长 -->
		<swiper-item key="parents">
		  <div class="bg-white padding margin text-center text-black">
		  <input type="text" value="" placeholder="用户名" v-model="userId" />
		  <input type="text" value="" placeholder="密码" password="true" v-model="password" />
		  <button type="primary" @click="signUp">登录</button>
		  </div>
		</swiper-item>
		
		
		
      </swiper>
    </div>
  </div>
</template>
<script>
import WucTab from '@/components/wuc-tab/wuc-tab.vue';
export default {
    data() {
        return {
            tabList: [
                { name: '老师', icon: 'cuIcon-comment' },
                { name: '学生', icon: 'cuIcon-dianhua' },
                { name: '家长', icon: 'cuIcon-wifi' }
            ],
            TabCur: 0,
        };
    },

    components: { WucTab },

    computed: {},

    methods: {
        tabChange(index) {
            this.TabCur = index;
        },
		signUp(){
			
		},
    },

    onReady() {}
};

</script>


<style>

div,
scroll-view,
swiper {
    box-sizing: border-box;
}
div {
  font-size: 28upx;
  background-color: #f1f1f1;
}
.swiper {
    height: 340upx;
}

.cu-bar {
    display: flex;
    position: relative;
    align-items: center;
    min-height: 100upx;
    justify-content: space-between;
}

.cu-bar .action {
    display: flex;
    align-items: center;
    height: 100%;
    justify-content: center;
    max-width: 100%;
  background-color: #ffffff;
}

.cu-bar .action:first-child {
    margin-left: 30upx;
    font-size: 30upx;
}

.solid,
.solid-bottom {
    position: relative;
}

.solid::after,
.solid-bottom::after{
    content: " ";
    width: 200%;
    height: 200%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: inherit;
    transform: scale(0.5);
    transform-origin: 0 0;
    pointer-events: none;
    box-sizing: border-box;
}

.solid::after {
    border: 1upx solid rgba(0, 0, 0, 0.1);
}

.solid-bottom::after {
    border-bottom: 1upx solid rgba(0, 0, 0, 0.1);
}

.text-orange{
  color:#f37b1d
}
.text-black{
  color:#333333;
}
.bg-white{
    background-color: #ffffff;
}

.padding {
    padding: 30upx;
}

.margin {
    margin: 30upx;
}

.margin-top {
    margin-top: 30upx;
}
.text-center {
    text-align: center;
}
</style>